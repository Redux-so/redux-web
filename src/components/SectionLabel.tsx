import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: string;
  className?: string;
};

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-white/[0.1] bg-[#1a1a1a] px-3 py-1",
        "font-body text-[11px] font-medium uppercase tracking-[0.14em] text-white/55",
        className,
      )}
    >
      {children}
    </span>
  );
}
