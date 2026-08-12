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
      className="flex min-h-[72px] w-full shrink-0 touch-pan-x flex-nowrap items-center gap-2 overflow-x-auto overflow-y-hidden px-[15px] py-4 overscroll-x-contain [scrollbar-width:none] [-webkit-overflow-scrolling:touch] focus:outline-none"
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
          className={`shrink-0 whitespace-nowrap rounded-lg border px-4 py-2 text-body-01 leading-[1.4] tracking-[-0.025em] outline-none ${selectedLine === line.id ? "border-primary-50 bg-primary-50 font-semibold text-gray-10" : "border-gray-50 bg-transparent text-gray-90"}`}
          onClick={() => onSelect(line.id)}
          key={line.id}
        >
          {line.name}
        </button>
      ))}
    </div>
  );
}
