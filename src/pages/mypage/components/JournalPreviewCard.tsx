import CardBG from "@/assets/card-default.svg?react";
import LineBadge from "@/components/LineBadge";
import Heart from "@/assets/heart-active.svg?react";
import type { SubwayLine } from "@/types/subway";

export default function JournalPreviewCard({
  lineId,
  stationName,
  journalTitle,
  thumbnailUrl,
  likeCount,
}: {
  lineId?: number;
  stationName: string;
  journalTitle: string;
  thumbnailUrl: string | null;
  likeCount?: number;
}) {
  const isThumbnailEmpty = thumbnailUrl === null;

  return (
    <div className="relative w-[116px] h-40 rounded-lg overflow-hidden">
      {isThumbnailEmpty ? (
        <CardBG className="absolute inset-0 h-full w-full" />
      ) : (
        <div
          role="img"
          aria-label={journalTitle}
          className="absolute inset-0 h-full w-full rounded-lg"
          style={{
            background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 50%, #FFF 100%), url(${thumbnailUrl}) lightgray 50% / cover no-repeat`,
          }}
        />
      )}

      <div className="relative z-10 flex h-full flex-col items-start justify-end gap-2 px-3 pt-[54px] pb-4">
        {/* station info */}
        <div className="flex gap-1 z-10 items-center">
          {lineId !== undefined && <LineBadge line={lineId as SubwayLine} />}
          <span className="text-body-02 justify-center leading-[1.4] tracking-[-0.3px]">
            {stationName}
          </span>
        </div>

        {/* journalName */}
        <div className="flex z-10">
          <p className="flex text-start text-body-01 font-semibold leading-[1.4] tracking-[-0.35px] line-clamp-2 break-keep">
            {journalTitle}
          </p>
        </div>

        {/* heart */}
        {likeCount !== undefined && (
          <div className="flex z-10 items-center">
            <Heart />
            <span className="text-caption leading-none tracking-[-0.25px] text-gray-70">
              {likeCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
