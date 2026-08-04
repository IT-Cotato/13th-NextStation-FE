import type { SubwayLine } from '@/types/subway';
import LineBadge from '@/components/LineBadge';

interface StationLineItem {
  line: SubwayLine;
  stationName: string;
}

interface StationLineListProps {
  items?: StationLineItem[];
  className?: string;
}

const DEFAULT_ITEMS: StationLineItem[] = [
  { line: 1, stationName: '신림역' },
  { line: 2, stationName: '신림역' },
  { line: 3, stationName: '신림역' },
  { line: 4, stationName: '신림역' },
  { line: 5, stationName: '신림역' },
  { line: 6, stationName: '신림역' },
  { line: 7, stationName: '신림역' },
  { line: 8, stationName: '신림역' },
  { line: 9, stationName: '신림역' },
];

export default function StationLineList({
  items = DEFAULT_ITEMS,
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
