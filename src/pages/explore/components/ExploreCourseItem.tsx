import coursePhoto from "@/assets/explore/course-photo.svg";
import { useState } from "react";
import Heart from "@/assets/heart.svg?react";
import HeartFilled from "@/assets/explore/heart-filled.svg?react";
import RankStar from "@/assets/explore/rank-star.svg?react";
import LineBadge from "@/components/LineBadge";
import type { SubwayLine } from "@/types/subway";

type ExploreCourseItemProps = {
  filledImage?: boolean;
  rank?: number;
  line?: SubwayLine;
  stationName?: string;
};

export default function ExploreCourseItem({
  filledImage = false,
  rank,
  line = 2,
  stationName = "신림역",
}: ExploreCourseItemProps) {
  const [isScrapped, setIsScrapped] = useState(false);

  return (
    <article className="flex min-h-[120px] w-full items-center gap-3 rounded-lg bg-white p-3">
      <div className="relative h-24 w-[90px] shrink-0 overflow-hidden rounded-lg bg-primary-30">
        {filledImage && (
          <img className="size-full object-cover" src={coursePhoto} alt="" draggable={false} />
        )}
        {rank && (
          <span className="absolute left-0 top-0 size-[42px]" aria-label={`${rank}위`}>
            <RankStar className="absolute left-0 top-0.5 size-[42px]" aria-hidden="true" />
            <span className="absolute left-4 top-[9px] text-title-01 font-semibold leading-7 text-white">{rank}</span>
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <LineBadge line={line} />
            <span className="whitespace-nowrap text-body-02 font-regular leading-[1.4] text-gray-100">{stationName}</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-0.5 border-0 bg-transparent p-0 text-caption text-gray-70 outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
            aria-label={isScrapped ? "스크랩 취소" : "스크랩"}
            aria-pressed={isScrapped}
            onClick={() => setIsScrapped((current) => !current)}
          >
            {isScrapped ? <HeartFilled className="size-3" aria-hidden="true" /> : <Heart className="size-3" aria-hidden="true" />}
            {isScrapped ? 1 : 0}
          </button>
        </div>
        <p className="m-0 text-body-01 font-semibold leading-[1.4] text-gray-100">민성이랑 떠나는 느좋투어<br />어쩌구</p>
        <div className="flex gap-1"><span className="rounded-lg bg-gray-20 px-2 py-1 text-caption text-gray-80">#태그1</span><span className="rounded-lg bg-gray-20 px-2 py-1 text-caption text-gray-80">#태그2</span></div>
      </div>
    </article>
  );
}
