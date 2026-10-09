"use client";

import { useEffect, useId, useRef, useState } from "react";

export function MermaidDiagram({
  chart,
  mobileChart,
  label,
}: {
  chart: string;
  mobileChart: string;
  label: string;
}) {
  const instanceId = useId().replaceAll(":", "");
  const diagramRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [compact, setCompact] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const activeChart = compact ? mobileChart : chart;

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      if (compact === null) {
        return;
      }

      try {
        setFailed(false);
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          flowchart: {
            curve: "linear",
            htmlLabels: true,
            nodeSpacing: 34,
            rankSpacing: 54,
            useMaxWidth: true,
          },
          themeVariables: {
            background: "#f2eee6",
            primaryColor: "#e4dfd5",
            primaryTextColor: "#101112",
            primaryBorderColor: "#5f5a52",
            secondaryColor: "#d5c9b8",
            tertiaryColor: "#f7f3eb",
            lineColor: "#5f5a52",
            clusterBkg: "#f7f3eb",
            clusterBorder: "#b8afa2",
            fontFamily: "Geist, sans-serif",
            fontSize: "14px",
          },
        });

        const mode = compact ? "compact" : "wide";
        const { svg } = await mermaid.render(`architecture-${instanceId}-${mode}`, activeChart);

        if (!cancelled && diagramRef.current) {
          diagramRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) {
          setFailed(true);
        }
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [activeChart, compact, instanceId]);

  if (failed) {
    return (
      <p role="alert" className="py-16 text-center text-sm text-ink/64">
        The architecture diagram could not be rendered.
      </p>
    );
  }

  return (
    <div role="img" aria-label={label}>
      <div
        ref={diagramRef}
        className="min-h-[34rem] min-w-0 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none"
      />
    </div>
  );
}
