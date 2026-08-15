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
      <div className="relative w-[144px] h-[200px] rounded-lg overflow-hidden">
        {isThumbnailEmpty ? (
          <CardBG className="absolute inset-0 h-full w-full" />
        ) : (
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 h-full w-full rounded-lg object-cover"
          />
        )}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent from-40% to-[#555555]" />

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
