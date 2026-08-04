import { useState } from "react";

type ExploreCourseCardProps = {
  rank: number;
};

export default function ExploreCourseCard({ rank }: ExploreCourseCardProps) {
  const [isScrapped, setIsScrapped] = useState(false);

  return (
    <article className="relative h-[200px] basis-36 shrink-0 snap-start overflow-hidden rounded-[20px] shadow-[0_0_20px_rgb(118_118_118/20%)]">
      <img className="size-full object-cover" src="/explore/course-photo.png" alt="" />
      <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-linear-to-b from-transparent from-30% via-white/60 via-66% to-white" />
      <span className="absolute right-[7px] top-[13px] grid size-[43px] place-items-center" aria-label={`${rank}위`}>
        <img className="h-[39px] w-[35px] object-fill" src="/explore/rank-star-figma.png" alt="" />
        <b className="absolute left-1/2 top-[7px] -translate-x-1/2 text-xl font-semibold leading-[1.4] text-white">{rank}</b>
      </span>
      <div className="absolute left-4 right-2.5 top-[90px] flex flex-col gap-2">
        <div className="inline-flex items-center gap-1 whitespace-nowrap text-xs"><span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#73bf7d] px-1.5 text-sm font-semibold text-[#e6fce9]">2</span>신림역</div>
        <strong className="text-base leading-[1.4]">민성이랑 떠나는<br />신림 느좋투어</strong>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 self-start border-0 bg-transparent p-0 text-[10px] text-gray-70 outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
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
    </article>
  );
}
