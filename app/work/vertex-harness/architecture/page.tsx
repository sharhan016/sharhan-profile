import type { Metadata } from "next";
import { ArchitecturePage } from "@/components/ArchitecturePage";
import { vertexArchitecture } from "@/data/architectures";

export const metadata: Metadata = {
  title: "Vertex Harness Architecture — Sharhan",
  description: "Architecture of the Vertex Harness repository-local verification and recovery toolkit.",
  alternates: { canonical: "/work/vertex-harness/architecture" },
};

export default function VertexHarnessArchitecturePage() {
  return <ArchitecturePage model={vertexArchitecture} />;
}
