type SubwayLine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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

const LINE_STYLES: Record<SubwayLine, string> = {
  1: 'bg-subway-1-dark text-subway-1-light',
  2: 'bg-subway-2-dark text-subway-2-light',
  3: 'bg-subway-3-dark text-subway-3-light',
  4: 'bg-subway-4-dark text-subway-4-light',
  5: 'bg-subway-5-dark text-subway-5-light',
  6: 'bg-subway-6-dark text-subway-6-light',
  7: 'bg-subway-7-dark text-subway-7-light',
  8: 'bg-subway-8-dark text-subway-8-light',
  9: 'bg-subway-9-dark text-subway-9-light',
};

export default function StationLineList({
  items = DEFAULT_ITEMS,
  className = '',
}: StationLineListProps) {
  return (
    <div className={`flex flex-col gap-[13px] ${className}`}>
      {items.map(({ line, stationName }) => (
        <div key={`${line}-${stationName}`} className="flex items-center gap-1">
          <span
            className={`flex min-w-[20px] items-center justify-center rounded-full px-[6px] text-body-01 font-semibold leading-[1.4] ${LINE_STYLES[line]}`}
          >
            {line}
          </span>
          <span className="whitespace-nowrap text-body-02 font-regular leading-[1.4] text-gray-100">
            {stationName}
          </span>
        </div>
      ))}
    </div>
  );
}
