import LineBadge, { type SubwayLine} from "@/components/LineBadge";
import CardBG from '@/assets/card-default.svg?react';
import LikeCheckIcon from '@/assets/like/likeCheck.svg?react';
import LikeSelectIcon from '@/assets/like/likeSelect.svg?react';

interface LikeCardProps {
  courseId: number;
  courseName: string;
  stationName: string;
  lineId: SubwayLine;
  isSelectMode: boolean;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export default function LikeCard({
  courseName,
  stationName,
  lineId,
  isSelectMode,
  isSelected,
  onToggleSelect,
}: LikeCardProps) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-[20px]">
      <CardBG className="absolute inset-0 h-full w-full" />
      {/* <div className="absolute inset-0 bg-linear-to-b from-white/0 via-white/10 to-white/80" /> */}

      {isSelectMode ? (
        <button
          type="button"
          onClick={onToggleSelect}
          aria-label={isSelected ? '선택 해제' : '선택'}
          className="absolute top-3 right-3 z-20 flex size-8 items-center justify-center outline-none"
        >
          {isSelected ? (
            <LikeCheckIcon className="size-[22px]" />
          ) : (
            <LikeSelectIcon className="size-[22px]" />
          )}
        </button>
      ) : null}

      <div className="relative z-10 flex h-full flex-col items-start justify-end gap-2 px-3 pt-[54px] pb-4">
        <div className="flex items-center justify-center gap-1">
          <LineBadge line={lineId}/>
          <p className="text-body-02 text-gray-100 leading-[1.4] tracking-[-0.025em]">
            {stationName}
          </p>
        </div>
        <p className="text-body-01 font-semibold text-gray-100 leading-[1.4] tracking-[-0.025em]">
          {courseName}
        </p>
      </div>
    </div>
  )
}
