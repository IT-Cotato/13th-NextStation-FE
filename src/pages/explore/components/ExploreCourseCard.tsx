import { useState } from "react";

type ExploreCourseCardProps = {
  rank: number;
};

export default function ExploreCourseCard({ rank }: ExploreCourseCardProps) {
  const [isScrapped, setIsScrapped] = useState(false);

  return (
    <article className="explore-popular-card">
      <img src="/explore/course-photo.png" alt="" />
      <div className="explore-popular-card__veil" />
      <span className="explore-rank-badge" aria-label={`${rank}위`}>
        <img src="/explore/rank-star-figma.png" alt="" />
        <b>{rank}</b>
      </span>
      <div className="explore-popular-card__content">
        <div className="explore-station-label"><span>2</span>신림역</div>
        <strong>민성이랑 떠나는<br />신림 느좋투어</strong>
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
    </article>
  );
}
