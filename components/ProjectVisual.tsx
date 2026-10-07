import { cn } from "@/lib/utils";

export function ProjectVisual({ motif, number }: { motif: string; number: string }) {
  return (
    <div className={cn("project-visual", `motif-${motif}`)} aria-hidden="true">
      <span className="visual-index">{number}</span>
      <div className="visual-grid" />
      <div className="visual-orbit" />
      <div className="visual-axis" />
      <div className="visual-word">
        {motif === "vertex" && "VERIFY / RECOVER"}
        {motif === "route" && "SEARCH / ROUTE"}
        {motif === "ledger" && "GOVERN / GROUND"}
        {/* Enterprise E-commerce motif intentionally hidden until the project is revisited. */}
      </div>
    </div>
  );
}
