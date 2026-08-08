import type { ExploreLine } from "@/api/explore";

interface ExploreLineTabsProps {
  lines: ExploreLine[];
  selectedLine: number | null;
  onSelect: (lineId: number) => void;
}

export default function ExploreLineTabs({
  lines,
  selectedLine,
  onSelect,
}: ExploreLineTabsProps) {
  return (
    <div
      className="flex w-full min-w-0 touch-pan-x flex-nowrap gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[15px] py-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] focus:outline-none"
      role="tablist"
      aria-label="지하철 노선 선택"
      tabIndex={0}
      onWheel={(event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          event.currentTarget.scrollLeft += event.deltaY;
        }
      }}
    >
      {lines.map((line) => (
        <button
          type="button"
          role="tab"
          aria-selected={selectedLine === line.id}
          className={`shrink-0 rounded-lg border px-4 py-[7px] text-body-01 leading-[1.4] tracking-[-0.025em] ${selectedLine === line.id ? "border-primary-50 bg-primary-50 font-semibold text-gray-10" : "border-gray-50 bg-transparent text-gray-90"}`}
          onClick={() => onSelect(line.id)}
          key={line.id}
        >
          {line.name}
        </button>
      ))}
    </div>
  );
}
