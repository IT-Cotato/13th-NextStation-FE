import LineBadge, { type SubwayLine } from "@/components/LineBadge";
import CardBG from "@/assets/card-default.svg?react";
import LikeCheckIcon from "@/assets/like/likeCheck.svg?react";
import LikeSelectIcon from "@/assets/like/likeSelect.svg?react";

interface LikeCardProps {
  courseId: number;
  journalId: number;
  courseName: string;
  stationName: string;
  lineId: SubwayLine;
  imageUrl: string | null;
  isSelectMode: boolean;
  isSelected: boolean;
  onToggleSelect: () => void;
  onClick?: () => void;
}

export default function LikeCard({
  courseName,
  stationName,
  lineId,
  imageUrl,
  isSelectMode,
  isSelected,
  onToggleSelect,
  onClick,
}: LikeCardProps) {
  const isImageEmpty = !imageUrl || imageUrl.length < 1;
  const textColorClass = isImageEmpty ? "text-gray-100" : "text-white";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={isSelectMode ? onToggleSelect : onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (isSelectMode) {
            onToggleSelect();
            return;
          }
          onClick?.();
        }
      }}
      className="relative h-40 w-full overflow-hidden rounded-lg text-left"
    >
      {isImageEmpty ? (
        <CardBG className="absolute inset-0 h-full w-full" />
      ) : (
        <div
          role="img"
          aria-label={courseName}
          className="absolute inset-0 h-full w-full rounded-lg"
          style={{
            background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 50%, #555555 100%), url(${imageUrl}) lightgray 50% / cover no-repeat`,
          }}
        />
      )}

      {isSelectMode ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleSelect();
          }}
          aria-label={isSelected ? "선택 해제" : "선택"}
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
          <LineBadge line={lineId} />
          <p
            className={`text-body-02 ${textColorClass} leading-[1.4] tracking-[-0.025em] break-keep`}
          >
            {stationName}
          </p>
        </div>
        <p
          className={`text-body-01 font-semibold ${textColorClass} leading-[1.4] tracking-[-0.025em]`}
        >
          {courseName}
        </p>
      </div>
    </div>
  );
}
