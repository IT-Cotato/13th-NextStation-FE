import type { SubwayLine } from '@/types/subway';
import LineBadge from '@/components/LineBadge';

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
  className = '',
}: StationLineListProps) {
  return (
    <div className={`flex flex-col gap-[13px] ${className}`}>
      {items.map(({ line, stationName }) => (
        <div key={`${line}-${stationName}`} className="flex items-center gap-1">
          <LineBadge line={line} />
          <span className="whitespace-nowrap text-body-02 font-regular leading-[1.4] text-gray-100">
            {stationName}
          </span>
        </div>
      ))}
    </div>
  );
}
