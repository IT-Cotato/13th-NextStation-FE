import { useState } from "react";
import Heart from "@/assets/heart.svg?react";
import CoursePhoto from "@/assets/card-default.svg?react";
import HeartFilled from "@/assets/explore/heart-filled.svg?react";
import LineBadge, { type SubwayLine } from "@/components/LineBadge";
import CourseRankBadge from "./CourseRankBadge";
import { likeExploreCourse, unlikeExploreCourse } from "@/api/explore";
import type { ExploreCourseLine } from "@/api/explore";
import { formatExploreTag } from "../data/tagLabels";

interface ExploreCourseItemProps {
  imageUrl?: string | null;
  isLiked?: boolean;
  likeCount?: number;
  courseId: number;
  line?: ExploreCourseLine | null;
  name: string;
  onClick?: () => void;
  rank?: number;
  stationName: string;
  tags?: string[];
}

function isSubwayLine(lineId: number): lineId is SubwayLine {
  return Number.isInteger(lineId) && lineId >= 1 && lineId <= 9;
}

export default function ExploreCourseItem({
  imageUrl,
  isLiked = false,
  likeCount = 0,
  courseId,
  line,
  name,
  onClick,
  rank,
  stationName,
  tags = [],
}: ExploreCourseItemProps) {
  const [liked, setLiked] = useState(isLiked);
  const [isLikePending, setIsLikePending] = useState(false);
  const displayedLikeCount =
    likeCount + (liked === isLiked ? 0 : liked ? 1 : -1);

  const handleLike = async () => {
    if (isLikePending) return;

    const nextLiked = !liked;
    setLiked(nextLiked);
    setIsLikePending(true);
    try {
      if (nextLiked) {
        await likeExploreCourse(courseId);
      } else {
        await unlikeExploreCourse(courseId);
      }
    } catch {
      setLiked(liked);
    } finally {
      setIsLikePending(false);
    }
  };

  return (
    <article
        className="flex min-h-[120px] w-full items-center gap-3 rounded-lg bg-white p-3"
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
      <div className="grid h-24 w-[90px] shrink-0 overflow-hidden rounded-lg bg-primary-30">
        {imageUrl ? (
          <img
            className="col-start-1 row-start-1 size-full object-cover"
            src={imageUrl}
            alt=""
            draggable={false}
          />
        ) : (
          <CoursePhoto
            className="col-start-1 row-start-1 size-full"
            aria-hidden="true"
          />
        )}
        {rank && (
          <CourseRankBadge className="col-start-1 row-start-1" rank={rank} />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {line && isSubwayLine(line.id) && <LineBadge line={line.id} />}
            <span className="whitespace-nowrap text-body-02 leading-[1.4] tracking-[-0.025em] text-gray-100">
              {stationName}
            </span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-0.5 border-0 bg-transparent p-0 text-caption text-gray-70"
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
            {displayedLikeCount}
          </button>
        </div>
        <p className="text-body-01 font-semibold leading-[1.4] tracking-[-0.025em] text-gray-100">
          {name}
        </p>
        <div className="flex gap-1">
          {tags.slice(0, 2).map((tag) => (
            <span
              className="rounded-lg bg-gray-20 px-2 py-1 text-caption text-gray-80"
              key={tag}
            >
              {formatExploreTag(tag)}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
