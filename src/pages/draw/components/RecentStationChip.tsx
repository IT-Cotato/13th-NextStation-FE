import DeleteIcon from '@/assets/close.svg?react';
import LineBadge from './LineBadge';
import type { StationLine } from '@/api/stations';

interface RecentStationChipProps {
  name: string;
  lines: StationLine[],
  onSelect?: () => void;
  onRemove?: () => void;
}

export default function RecentStationChip({
  name,
  lines,
  onSelect,
  onRemove
}: RecentStationChipProps) {

  const getLineBadgeValue = (lineName: string) => {
    const match = lineName.match(/^([1-9])호선$/);
    return match ? match[1] : null;
  };

  return (
    <div className="flex items-center justify-center gap-0.5 rounded-lg border border-gray-40 px-2 py-1">
      <button
        type="button"
        onClick={onSelect}
        className="flex items-center gap-0.5"
        aria-label={`${name} 최근 검색 선택`}
      >
        <div className='flex items-center gap-0.5'>
          {lines.map((line) => {
            const badgeLine = getLineBadgeValue(line.name);

            if (!badgeLine) return null;

            return (
              <LineBadge
                key={`${name}-${line.code}`}
                line={badgeLine}
              />
            );
          })}
        </div>
        <p className="text-center text-body-02 leading-[1.4] tracking-[-0.025em] text-gray-70">
          {name}
        </p>
      </button>
      <button
        type="button"
        onClick={onRemove}
        className='flex items-center justify-center'
        aria-label={`${name} 최근 검색 삭제`}
      >
        <DeleteIcon className='size-2' />
      </button>
    </div>
  )
}
