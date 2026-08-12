import LineBadge, { type SubwayLine } from "@/components/LineBadge";
import CardBG from "@/assets/card-default.svg?react";
import type { TravelDuration } from "@/api/journal";

export default function CoursePreviewCard({
  line,
  name,
  placeCount,
  travelDuration,

  imageUrl,
}: {
  line: number;
  name: string;
  placeCount: number;
  travelDuration: string;
  imageUrl: string | null;
}) {
  const isThumbnailEmpty = imageUrl === null;
  const titleColorClass = isThumbnailEmpty ? "text-gray-100" : "text-white";
  const textColorClass = isThumbnailEmpty ? "text-gray-80" : "text-white";
  const durationLabels: Record<TravelDuration, string> = {
    SHORT: "3~4시간",
    HALF_DAY: "반나절",
    FULL_DAY: "하루종일",
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-[144px] h-[200px] rounded-lg overflow-hidden shadow-[0_0_20px_0_rgba(118,118,118,0.2)]">
        {isThumbnailEmpty ? (
          <CardBG className="absolute inset-0 h-full w-full" />
        ) : (
          <div
            role="img"
            aria-label={name}
            className="absolute inset-0 h-full w-full rounded-lg text-gray-100"
            style={{
              background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 50%, #555555 100%), url(${imageUrl}) lightgray 50% / cover no-repeat`,
            }}
          />
        )}

        <div className="absolute rounded-lg inset-0 bg-gradient-to-b from-transparent from-40% to-white to-100%" />

        <div className="relative flex flex-col h-full pt-[15px] pl-[16px] pb-[18px] pr-[25px] justify-between">
          {/* 호선 뱃지 */}
          <LineBadge line={line as SubwayLine} />

          {/* course info */}
          <div className="flex flex-col gap-0.5">
            <p
              className={`${titleColorClass} text-subtitle font-semibold line-clamp-2 break-keep leading-[1.4] tracking-[-0.4px]`}
            >
              {name}
            </p>
            <span
              className={`text-caption ${textColorClass} leading-none tracking-[-0.25px]`}
            >
              장소 {placeCount}곳 ∙{" "}
              {durationLabels[travelDuration as TravelDuration]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
