import RankStar from "@/assets/explore/rank-star.svg?react";

interface CourseRankBadgeProps {
  rank: number;
  className?: string;
}

export default function CourseRankBadge({
  rank,
  className = "",
}: CourseRankBadgeProps) {
  return (
    <span
      className={`grid size-[42px] place-items-center ${className}`}
      aria-label={`${rank}위`}
    >
      <RankStar
        className="col-start-1 row-start-1 h-10 w-[35px]"
        aria-hidden="true"
      />
      <span className="col-start-1 row-start-1 pb-1 pl-1 text-title-01 font-semibold leading-[1.4] text-white">
        {rank}
      </span>
    </span>
  );
}
