import type { Metadata } from "next";
import { ArchitecturePage } from "@/components/ArchitecturePage";
import { ainadArchitecture } from "@/data/architectures";

export const metadata: Metadata = {
  title: "AiNad Architecture — Sharhan",
  description: "Architecture of the AiNad voice-first desktop and browser-automation system.",
  alternates: { canonical: "/work/ainad/architecture" },
};

export default function AiNadArchitecturePage() {
  return <ArchitecturePage model={ainadArchitecture} />;
}
