import { cn } from "@/lib/utils";

export function SectionLabel({
  number,
  children,
  light = false,
  className,
}: {
  number: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "section-label flex items-center gap-3",
        light ? "text-white/58" : "text-ink/48",
        className,
      )}
    >
      <span>{number}</span>
      <span className={cn("h-px w-8", light ? "bg-white/35" : "bg-ink/30")} />
      <span>{children}</span>
    </div>
  );
}
