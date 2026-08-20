import CardBG from "@/assets/card-default.svg?react";
import type { SubwayLine } from "@/types/subway";
import LineBadge from "@/components/LineBadge";

export default function JournalPreviewCard({
  lineId,
  stationName,
  journalTitle,
  thumbnailUrl,
}: {
  lineId?: number;
  stationName: string;
  journalTitle: string;
  thumbnailUrl: string | null;
  likeCount?: number;
}) {
  const isThumbnailEmpty = thumbnailUrl === null;
  const textColorClass = isThumbnailEmpty ? "text-gray-100" : "text-white";

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
            background: `linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, #000 100%), url(${thumbnailUrl}) lightgray 50% / cover no-repeat`,
          }}
        />
      )}

      <div className="relative z-10 flex h-full flex-col items-start justify-end gap-1 px-3 pt-[95px] pb-4">
        {/* station info */}
        <div className="flex gap-1 z-10 items-center">
          {lineId !== undefined && (
            <LineBadge line={lineId as SubwayLine} size="small" />
          )}
          <span
            className={`text-caption justify-center ${textColorClass} leading-[1.4] tracking-[-0.25px] break-keep`}
          >
            {stationName}
          </span>
        </div>

        {/* journalName */}
        <div className="flex z-10">
          <p
            className={`min-h-[33.6px] text-start text-body-02 font-semibold ${textColorClass} leading-[1.4] tracking-[-0.3px] line-clamp-2 break-keep`}
          >
            {journalTitle}
          </p>
        </div>
      </div>
    </div>
  );
}
