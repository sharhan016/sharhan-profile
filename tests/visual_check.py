import os
from pathlib import Path
from playwright.sync_api import sync_playwright

OUTPUT = Path("/tmp/sharhan-portfolio-check")
OUTPUT.mkdir(parents=True, exist_ok=True)
BASE_URL = os.environ.get("PORTFOLIO_BASE_URL", "http://localhost:3000")


def inspect(page, name, width, height):
    errors = []
    page.on("console", lambda message: errors.append(f"console:{message.type}:{message.text}") if message.type == "error" else None)
    page.on("pageerror", lambda error: errors.append(f"page:{error}"))
    page.set_viewport_size({"width": width, "height": height})
    page.goto(BASE_URL, wait_until="networkidle")
    page.emulate_media(reduced_motion="no-preference")
    page.wait_for_timeout(1300)
    page.screenshot(path=str(OUTPUT / f"{name}-top.png"), full_page=False)
    page.locator("#work").scroll_into_view_if_needed()
    page.wait_for_timeout(700)
    page.locator("header").screenshot(path=str(OUTPUT / f"{name}-navbar-scrolled.png"))
    page.screenshot(path=str(OUTPUT / f"{name}-work.png"), full_page=False)
    page.screenshot(path=str(OUTPUT / f"{name}-full.png"), full_page=True)

    metrics = page.evaluate("""
        () => ({
          viewport: window.innerWidth,
          bodyWidth: document.body.scrollWidth,
          htmlWidth: document.documentElement.scrollWidth,
          headingCount: document.querySelectorAll('h1,h2,h3').length,
          sectionCount: document.querySelectorAll('main section').length,
          imageStates: Array.from(document.images).map(i => ({src: i.currentSrc, complete: i.complete, width: i.naturalWidth})),
          topHeading: document.querySelector('h1')?.textContent?.trim(),
          hasAiNad: document.body.innerText.includes('AiNad'),
          hasLedgerLens: document.body.innerText.includes('LedgerLens'),
          hasVertex: document.body.innerText.includes('Vertex Harness'),
          hasWriting: Boolean(document.querySelector('#writing')),
          hasEnterprise: document.body.innerText.includes('Enterprise E-commerce'),
          projectTitles: Array.from(document.querySelectorAll('.project h3')).map(node => node.textContent?.trim()),
          vertexText: Array.from(document.querySelectorAll('.project')).find(node => node.querySelector('h3')?.textContent?.trim() === 'Vertex Harness')?.textContent || '',
          hasLegacySvelr: document.body.innerText.includes('SVELR'),
          hasLegacyFlutterFlow: document.body.innerText.includes('FlutterFlow'),
          hasPlaceholderEmail: document.body.innerText.includes('hello@example.com'),
          placeholderLinks: document.querySelectorAll('a[href="#"]').length,
          hasContactEmail: Boolean(document.querySelector('a[href="mailto:sharhan.sathar@gmail.com"]')),
          hasLinkedIn: Boolean(document.querySelector('a[href="https://www.linkedin.com/in/sharhan-sathar/"]')),
          nav: (() => {
            const header = document.querySelector('header').getBoundingClientRect();
            const brand = document.querySelector('header a').getBoundingClientRect();
            const trigger = document.querySelector('header button')?.getBoundingClientRect();
            return {
              headerTop: header.top,
              headerBottom: header.bottom,
              brandTop: brand.top,
              brandBottom: brand.bottom,
              triggerTop: trigger?.top,
              triggerBottom: trigger?.bottom,
              background: getComputedStyle(document.querySelector('header')).backgroundColor,
            };
          })(),
        })
    """)
    print(name, metrics, "errors", errors)
    assert metrics["bodyWidth"] <= metrics["viewport"], f"Horizontal overflow at {name}"
    assert metrics["htmlWidth"] <= metrics["viewport"], f"HTML overflow at {name}"
    assert metrics["sectionCount"] == 6, f"Unexpected section count at {name}"
    assert metrics["hasAiNad"], f"AiNad is missing at {name}"
    assert metrics["hasLedgerLens"], f"LedgerLens is missing at {name}"
    assert metrics["hasVertex"], f"Vertex Harness is missing at {name}"
    assert not metrics["hasWriting"], f"Writing section is still rendered at {name}"
    assert not metrics["hasEnterprise"], f"Enterprise E-commerce is still rendered at {name}"
    assert metrics["projectTitles"] == ["LedgerLens", "Vertex Harness", "AiNad"], f"Incorrect project order at {name}"
    assert "PYTHON 3.11+" in metrics["vertexText"].upper(), f"Vertex Python technology is missing at {name}"
    assert "PYTEST" in metrics["vertexText"].upper(), f"Vertex Pytest technology is missing at {name}"
    assert "RUFF" in metrics["vertexText"].upper(), f"Vertex Ruff technology is missing at {name}"
    assert not metrics["hasLegacySvelr"], f"Legacy SVELR content remains at {name}"
    assert not metrics["hasLegacyFlutterFlow"], f"Legacy FlutterFlow content remains at {name}"
    assert not metrics["hasPlaceholderEmail"], f"Placeholder email remains at {name}"
    assert metrics["placeholderLinks"] == 0, f"Placeholder links remain at {name}"
    assert metrics["hasContactEmail"], f"Contact email is missing at {name}"
    assert metrics["hasLinkedIn"], f"LinkedIn link is missing at {name}"
    assert abs(metrics["nav"]["headerTop"]) < 1, f"Scrolled navbar is displaced at {name}"
    assert metrics["nav"]["brandTop"] >= metrics["nav"]["headerTop"], f"Navbar brand is clipped at {name}"
    assert metrics["nav"]["brandBottom"] <= metrics["nav"]["headerBottom"], f"Navbar brand overflows at {name}"
    if width < 768:
        assert metrics["nav"]["triggerTop"] >= metrics["nav"]["headerTop"], f"Menu trigger is clipped at {name}"
        assert metrics["nav"]["triggerBottom"] <= metrics["nav"]["headerBottom"], f"Menu trigger overflows at {name}"
    assert metrics["nav"]["background"] != "rgba(0, 0, 0, 0)", f"Scrolled navbar has no surface at {name}"
    assert all(item["complete"] and item["width"] > 0 for item in metrics["imageStates"]), f"Broken image at {name}"
    assert not errors, f"Browser errors at {name}: {errors}"

    if width < 768:
        menu_button = page.get_by_role("button", name="Open menu")
        menu_button.click()
        page.get_by_role("link", name="Work", exact=True).wait_for(state="visible")
        assert page.locator("#mobile-menu a").count() == 3, f"Incomplete mobile menu at {name}"
        page.get_by_role("button", name="Close menu").click()

    for selector in ["#about", "#experience", "#work", "#capabilities", "#contact"]:
        page.locator(selector).scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        visible_text = page.locator(selector).locator("h2,h3,p").first
        assert visible_text.is_visible(), f"Hidden section content in {selector} at {name}"

    full_height = page.evaluate("document.documentElement.scrollHeight")
    for y in range(0, full_height, max(height - 100, 400)):
        page.evaluate("position => window.scrollTo(0, position)", y)
        page.wait_for_timeout(120)
    page.wait_for_timeout(300)
    page.screenshot(path=str(OUTPUT / f"{name}-revealed-full.png"), full_page=True)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    for test in [
        ("desktop-1440", 1440, 1000),
        ("desktop-1280", 1280, 900),
        ("laptop-1024", 1024, 768),
        ("tablet-768", 768, 1024),
        ("mobile-390", 390, 844),
        ("mobile-375", 375, 812),
    ]:
        context = browser.new_context(device_scale_factor=1)
        page = context.new_page()
        inspect(page, *test)
        context.close()
    browser.close()
