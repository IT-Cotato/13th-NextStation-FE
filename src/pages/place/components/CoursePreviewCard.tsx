import LineBadge, { type SubwayLine } from "@/components/LineBadge";
import CardBG from "@/assets/card-default.svg?react";

export default function CoursePreviewCard({
  line,
  name,

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

  return (
    <div className="flex justify-center">
      <div className="relative w-[144px] h-[200px] rounded-lg overflow-hidden">
        {isThumbnailEmpty ? (
          <CardBG className="absolute inset-0 h-full w-full" />
        ) : (
          <div
            role="img"
            aria-label={name}
            className="absolute inset-0 h-full w-full rounded-lg object-cover"
            style={{
              background: `linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, #000 100%), url(${imageUrl}) lightgray 50% / cover no-repeat`,
            }}
          />
        )}

        <div className="relative flex flex-col h-full pt-[15px] pl-[16px] pb-[16px] pr-[25px] justify-between">
          {/* 호선 뱃지 */}
          <LineBadge line={line as SubwayLine} />

          {/* course info */}
          <p
            className={`min-h-[39.2px] ${titleColorClass} text-body-01 font-semibold line-clamp-2 break-keep leading-[1.4] tracking-[-0.35px]`}
          >
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}
