import { useState } from "react";
import {
  likeExploreCourse,
  unlikeExploreCourse,
  type ExploreCourse,
} from "@/api/explore";
import Heart from "@/assets/heart.svg?react";
import coursePhoto from "@/assets/card-default.svg";
import HeartFilled from "@/assets/explore/heart-filled.svg?react";
import LineBadge, { type SubwayLine } from "@/components/LineBadge";
import CourseRankBadge from "./CourseRankBadge";

interface ExploreCourseCardProps {
  course: ExploreCourse;
  onClick?: () => void;
  rank: number;
}

function isSubwayLine(lineId: number): lineId is SubwayLine {
  return Number.isInteger(lineId) && lineId >= 1 && lineId <= 9;
}

export default function ExploreCourseCard({
  course,
  onClick,
  rank,
}: ExploreCourseCardProps) {
  const [liked, setLiked] = useState(course.isLiked);
  const [isLikePending, setIsLikePending] = useState(false);
  const originalLiked = course.isLiked;
  const likeCount =
    course.likeCount + (liked === originalLiked ? 0 : liked ? 1 : -1);
  const backgroundImage = `linear-gradient(to bottom, transparent 30%, rgb(255 255 255 / 60%) 66%, white), url(${course.imageUrl || coursePhoto})`;

  const handleLike = async () => {
    if (isLikePending) return;

    const nextLiked = !liked;
    setLiked(nextLiked);
    setIsLikePending(true);
    try {
      if (nextLiked) {
        await likeExploreCourse(course.courseId);
      } else {
        await unlikeExploreCourse(course.courseId);
      }
    } catch {
      setLiked(liked);
    } finally {
      setIsLikePending(false);
    }
  };

  return (
    <article
        className="flex h-[200px] w-36 shrink-0 flex-col justify-between overflow-hidden rounded-lg bg-cover bg-center px-4 pb-3 pt-[13px] shadow-[0_0_20px_rgb(118_118_118/20%)]"
        style={{ backgroundImage }}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (onClick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onClick();
          }
        }}
        role={onClick ? "link" : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
      <CourseRankBadge className="self-end" rank={rank} />
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-1 whitespace-nowrap text-body-02 text-gray-100">
          {course.line && isSubwayLine(course.line.id) && (
            <LineBadge line={course.line.id} />
          )}
          {course.stationName}
        </div>
        <p className="text-subtitle font-semibold leading-[1.4] tracking-[-0.025em] text-gray-100">
          {course.name}
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 self-start border-0 bg-transparent p-0 text-caption text-gray-70"
          aria-label={liked ? "좋아요 완료" : "좋아요"}
          aria-pressed={liked}
          disabled={isLikePending}
          onClick={(event) => {
            event.stopPropagation();
            void handleLike();
          }}
        >
          {liked ? (
            <HeartFilled className="size-3" aria-hidden="true" />
          ) : (
            <Heart className="size-3" aria-hidden="true" />
          )}
          {likeCount}
        </button>
      </div>
    </article>
  );
}
