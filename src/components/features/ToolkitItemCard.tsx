import { Icon } from "@/components/shared/Icon";
import type { ToolkitItem } from "@/lib/toolkit-data";
import { cn } from "@/lib/utils";

type ToolkitItemCardProps = {
  item: ToolkitItem;
  className?: string;
};

export default function ToolkitItemCard({ item, className }: ToolkitItemCardProps) {
  return (
    <article
      className={cn(
        "flex w-[13rem] shrink-0 flex-col gap-2 sm:w-[14rem] lg:w-[15rem]",
        className,
      )}
    >
      <Icon
        name={item.icon}
        size={20}
        strokeWidth={1.75}
        className="shrink-0 text-white"
        aria-hidden
      />
      <h3 className="m-0 text-sm font-semibold leading-snug text-white sm:text-[15px]">
        {item.name}
      </h3>
      <p className="m-0 text-sm leading-snug text-white/55">{item.description}</p>
    </article>
  );
}
