from pathlib import Path
from playwright.sync_api import sync_playwright

OUTPUT = Path("/tmp/sharhan-portfolio-check")
OUTPUT.mkdir(parents=True, exist_ok=True)


def inspect(page, name, width, height):
    errors = []
    page.on("console", lambda message: errors.append(f"console:{message.type}:{message.text}") if message.type == "error" else None)
    page.on("pageerror", lambda error: errors.append(f"page:{error}"))
    page.set_viewport_size({"width": width, "height": height})
    page.goto("http://127.0.0.1:3000", wait_until="networkidle")
    page.emulate_media(reduced_motion="no-preference")
    page.wait_for_timeout(1300)
    page.screenshot(path=str(OUTPUT / f"{name}-top.png"), full_page=False)
    page.locator("#work").scroll_into_view_if_needed()
    page.wait_for_timeout(700)
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
          hasLegacySvelr: document.body.innerText.includes('SVELR'),
          hasLegacyFlutterFlow: document.body.innerText.includes('FlutterFlow'),
        })
    """)
    print(name, metrics, "errors", errors)
    assert metrics["bodyWidth"] <= metrics["viewport"], f"Horizontal overflow at {name}"
    assert metrics["htmlWidth"] <= metrics["viewport"], f"HTML overflow at {name}"
    assert metrics["sectionCount"] == 7, f"Missing sections at {name}"
    assert metrics["hasAiNad"], f"AiNad is missing at {name}"
    assert metrics["hasLedgerLens"], f"LedgerLens is missing at {name}"
    assert not metrics["hasLegacySvelr"], f"Legacy SVELR content remains at {name}"
    assert not metrics["hasLegacyFlutterFlow"], f"Legacy FlutterFlow content remains at {name}"
    assert all(item["complete"] and item["width"] > 0 for item in metrics["imageStates"]), f"Broken image at {name}"
    assert not errors, f"Browser errors at {name}: {errors}"

    if width < 768:
        menu_button = page.get_by_role("button", name="Open menu")
        menu_button.click()
        page.get_by_role("link", name="Work", exact=True).wait_for(state="visible")
        assert page.locator("#mobile-menu a").count() == 4, f"Incomplete mobile menu at {name}"
        page.get_by_role("button", name="Close menu").click()

    for selector in ["#about", "#experience", "#work", "#capabilities", "#writing", "#contact"]:
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
