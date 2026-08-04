import { useState } from "react";
import LineBadge from "@/components/LineBadge";
import type { SubwayLine } from "@/types/subway";

type ExploreCourseItemProps = {
  filledImage?: boolean;
  imageSrc?: string;
  rank?: number;
  line?: SubwayLine;
  stationName?: string;
};

export default function ExploreCourseItem({
  filledImage = false,
  imageSrc,
  rank,
  line = 2,
  stationName = "신림역",
}: ExploreCourseItemProps) {
  const [isScrapped, setIsScrapped] = useState(false);

  return (
    <article className="flex min-h-[128px] w-full items-stretch gap-3 rounded-[20px] bg-white p-3">
      <div className={`relative basis-[90px] shrink-0 overflow-hidden rounded-lg bg-[#ffdcc5] ${filledImage ? "bg-[url('/explore/course-photo.png')] bg-cover bg-center" : ""}`}>
        {imageSrc && <img className="select-none" src={imageSrc} alt="" draggable={false} />}
        {rank && (
          <span className="absolute left-0 top-0.5 grid size-[42px] place-items-center leading-none" aria-label={`${rank}위`}>
            <img className="h-[39px] w-[35px] object-fill" src="/explore/rank-star-figma.png" alt="" />
            <b className="absolute left-1/2 top-[7px] -translate-x-1/2 text-xl font-semibold leading-[1.4] text-white">{rank}</b>
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
            className="inline-flex items-center gap-0.5 border-0 bg-transparent p-0 text-[10px] text-gray-70 outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
            aria-label={isScrapped ? "스크랩 취소" : "스크랩"}
            aria-pressed={isScrapped}
            onClick={() => setIsScrapped((current) => !current)}
          >
            <img
              src={isScrapped ? "/explore/heart-filled.svg" : "/explore/heart-outline.svg"}
              className="size-3 object-contain"
              alt=""
            />
            {isScrapped ? 1 : 0}
          </button>
        </div>
        <strong className="text-sm leading-[1.4]">민성이랑 떠나는 느좋투어<br />어쩌구</strong>
        <div className="flex gap-1"><span className="rounded-[20px] bg-gray-20 px-2 py-1 text-[10px] text-gray-80">#태그1</span><span className="rounded-[20px] bg-gray-20 px-2 py-1 text-[10px] text-gray-80">#태그2</span></div>
      </div>
    </article>
  );
}
