import { useState } from "react";
import {
  likeExploreCourse,
  unlikeExploreCourse,
  type ExploreCourse,
} from "@/api/explore";
import Heart from "@/assets/heart.svg?react";
import CardBG from "@/assets/card-default.svg?react";
import HeartFilled from "@/assets/explore/heart-filled.svg?react";
import LineBadge, { type SubwayLine } from "@/components/LineBadge";
import CourseRankBadge from "./CourseRankBadge";

interface ExploreCourseCardProps {
  course: ExploreCourse;
  onClick?: () => void;
  rank: number;
}

function getSubwayLine(code: string): SubwayLine | null {
  const matchedLine = /^LINE_([1-9])$/.exec(code);
  return matchedLine ? (Number(matchedLine[1]) as SubwayLine) : null;
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
  const hasBackgroundImage = Boolean(course.imageUrl);
  const backgroundImage = hasBackgroundImage
    ? `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.68) 100%),  url(${course.imageUrl})`
    : undefined;
  const subwayLine = course.line ? getSubwayLine(course.line.code) : null;

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
      className="relative flex h-[200px] w-36 shrink-0 flex-col justify-between overflow-hidden rounded-lg bg-secondary-20 pb-4 pl-4 pr-2 pt-4 shadow-[0_0_20px_rgb(118_118_118/20%)]"
      style={
        backgroundImage
          ? {
              backgroundImage,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          : undefined
      }
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
      {!hasBackgroundImage && (
        <>
          <CardBG className="absolute inset-0 h-full w-full" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.68)_100%)]"
            aria-hidden="true"
          />
        </>
      )}
      <CourseRankBadge className="relative z-10 self-end" rank={rank} />
      <div className="relative z-10 flex w-[112px] flex-col gap-[9px]">
        <div className="inline-flex items-center gap-1 whitespace-nowrap text-body-02 text-white">
          {subwayLine && <LineBadge line={subwayLine} />}
          {course.stationName}
        </div>
        <p className="text-subtitle font-semibold leading-[1.4] tracking-[-0.025em] text-white">
          {course.name}
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 self-start border-0 bg-transparent p-0 text-caption text-white"
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
