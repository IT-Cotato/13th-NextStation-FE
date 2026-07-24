import DeleteIcon from '@/assets/close.svg?react';
import LineBadge from './LineBadge';

interface RecentStationChipProps {
  name: string;
  lines: string[],
  onRemove?: () => void;
}

export default function RecentStationChip({
  name,
  lines,
  onRemove
}: RecentStationChipProps) {
  return (
    <div className="flex gap-0.5 px-2 py-1 border border-gray-40 rounded-lg items-center justify-center">
      <div className='flex items-center gap-0.5'>
        {lines.map((line) => (
          <LineBadge key={`${name}-${line}`} line={line} />
        ))}
      </div>
      <p className="text-body-02 text-gray-70 leading-[1.4] tracking-[-0.025em] text-center">
        {name}
      </p>
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