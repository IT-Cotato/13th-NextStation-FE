import type { SubwayLine } from "@/types/subway";
import LineBadge from "@/components/LineBadge";

export interface StationLineItem {
  line: SubwayLine;
  stationName: string;
}

export interface StationLineListProps {
  items: StationLineItem[];
  className?: string;
}

export default function StationLineList({
  items,
  className = "",
}: StationLineListProps) {
  return (
    <div className={`flex flex-col gap-[13px] ${className}`}>
      {items.map(({ line, stationName }) => (
        <div
          key={`${line}-${stationName}`}
          className="flex items-center justify-center gap-1"
        >
          <LineBadge line={line} />
          <span className="whitespace-nowrap text-subtitle font-regular leading-[1.4] tracking-[-0.4px] text-gray-100">
            {stationName}
          </span>
        </div>
      ))}
    </div>
  );
}
