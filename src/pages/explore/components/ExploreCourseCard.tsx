import { useState } from "react";
import coursePhoto from "@/assets/explore/course-photo.svg";
import Heart from "@/assets/heart.svg?react";
import HeartFilled from "@/assets/explore/heart-filled.svg?react";
import RankStar from "@/assets/explore/rank-star.svg?react";

type ExploreCourseCardProps = {
  rank: number;
};

const STATION_NAME = "\uC2E0\uB9BC\uC5ED";
const COURSE_TITLE = "\uBBFC\uC131\uC774\uB791 \uB5A0\uB098\uB294";
const COURSE_SUBTITLE = "\uC2E0\uB9BC \uB290\uC88B\uD22C\uC5B4";
const SCRAP_LABEL = "\uC2A4\uD06C\uB7A9";
const SCRAP_CANCEL_LABEL = "\uC2A4\uD06C\uB7A9 \uCDE8\uC18C";

export default function ExploreCourseCard({ rank }: ExploreCourseCardProps) {
  const [isScrapped, setIsScrapped] = useState(false);

  return (
    <article className="relative flex h-[200px] basis-36 shrink-0 flex-col justify-end overflow-hidden rounded-lg px-4 pb-3 shadow-[0_0_20px_rgb(118_118_118/20%)]">
      <img className="absolute inset-0 size-full select-none object-cover" src={coursePhoto} alt="" draggable={false} />
      <div className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-b from-transparent from-30% via-white/60 via-66% to-white" />
      <span className="absolute right-[7px] top-[13px] size-[42px]" aria-label={`${rank}\uC704`}>
        <RankStar className="absolute left-0 top-0.5 size-[42px]" aria-hidden="true" />
        <span className="absolute left-4 top-[9px] text-title-01 font-semibold leading-7 text-white">{rank}</span>
      </span>
      <div className="relative flex flex-col gap-2">
        <div className="inline-flex items-center gap-1 whitespace-nowrap text-body-02 text-gray-100">
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-subway-2-dark px-1.5 text-body-01 font-semibold text-subway-2-light">2</span>
          {STATION_NAME}
        </div>
        <p className="m-0 text-subtitle font-semibold leading-[1.4] tracking-[-0.025em] text-gray-100">{COURSE_TITLE}<br />{COURSE_SUBTITLE}</p>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 self-start border-0 bg-transparent p-0 text-caption text-gray-70 outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
          aria-label={isScrapped ? SCRAP_CANCEL_LABEL : SCRAP_LABEL}
          aria-pressed={isScrapped}
          onClick={() => setIsScrapped((current) => !current)}
        >
          {isScrapped ? <HeartFilled className="size-3" aria-hidden="true" /> : <Heart className="size-3" aria-hidden="true" />}
          {isScrapped ? 1 : 0}
        </button>
      </div>
    </article>
  );
}
