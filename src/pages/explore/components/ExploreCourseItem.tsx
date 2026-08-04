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
    <article className="explore-course-item">
      <div className={`explore-course-item__image${filledImage ? " is-photo" : ""}`}>
        {imageSrc && <img src={imageSrc} alt="" />}
        {rank && (
          <span className="explore-list-rank" aria-label={`${rank}위`}>
            <img src="/explore/rank-star-figma.png" alt="" />
            <b>{rank}</b>
          </span>
        )}
      </div>
      <div className="explore-course-item__body">
        <div className="explore-course-item__meta">
          <div className="explore-card-station flex items-center gap-1">
            <LineBadge line={line} />
            <span className="whitespace-nowrap text-body-02 font-regular leading-[1.4] text-gray-100">
              {stationName}
            </span>
          </div>
          <button
            type="button"
            className="explore-scrap-count"
            aria-label={isScrapped ? "스크랩 취소" : "스크랩"}
            aria-pressed={isScrapped}
            onClick={() => setIsScrapped((current) => !current)}
          >
            <img
              src={isScrapped ? "/explore/heart-filled.svg" : "/explore/heart-outline.svg"}
              alt=""
            />
            {isScrapped ? 1 : 0}
          </button>
        </div>
        <strong>민성이랑 떠나는 느좋투어<br />어쩌구</strong>
        <div className="explore-tag-row"><span>#태그1</span><span>#태그2</span></div>
      </div>
    </article>
  );
}
