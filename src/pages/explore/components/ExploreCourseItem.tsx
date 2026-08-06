import { useState } from "react";
import Heart from "@/assets/heart.svg?react";
import coursePhoto from "@/assets/explore/course-photo.svg";
import HeartFilled from "@/assets/explore/heart-filled.svg?react";
import rankStar from "@/assets/explore/rank-star.svg";
import LineBadge from "@/components/LineBadge";
import type { SubwayLine } from "@/types/subway";
import { likeExploreCourse } from "@/api/explore";

interface ExploreCourseItemProps {
  imageUrl?: string | null;
  isLiked?: boolean;
  likeCount?: number;
  courseId?: number;
  line?: SubwayLine;
  name?: string;
  onClick?: () => void;
  rank?: number;
  stationName?: string;
  tags?: string[];
}

export default function ExploreCourseItem({
  imageUrl,
  isLiked = false,
  likeCount = 0,
  courseId,
  line = 2,
  name = "민성이랑 떠나는 신림 느좋투어",
  onClick,
  rank,
  stationName = "신림역",
  tags = [],
}: ExploreCourseItemProps) {
  const [liked, setLiked] = useState(isLiked);
  const [isLikePending, setIsLikePending] = useState(false);
  const displayedLikeCount =
    likeCount + (liked === isLiked ? 0 : liked ? 1 : -1);

  const handleLike = async () => {
    if (!courseId || liked || isLikePending) return;

    setLiked(true);
    setIsLikePending(true);
    try {
      await likeExploreCourse(courseId);
    } catch {
      setLiked(false);
    } finally {
      setIsLikePending(false);
    }
  };

  return (
    <article
      className="flex min-h-[120px] w-full items-center gap-3 rounded-lg bg-white p-3"
      onClick={onClick}
    >
      <div
        className="flex h-24 w-[90px] shrink-0 items-start overflow-hidden rounded-lg bg-primary-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl || coursePhoto})` }}
      >
        {rank && (
          <span
            className="flex size-[42px] items-center justify-center bg-contain bg-center bg-no-repeat pb-1 pl-1 text-title-01 font-semibold leading-7 text-white"
            style={{ backgroundImage: `url(${rankStar})` }}
            aria-label={`${rank}위`}
          >
            {rank}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {line && <LineBadge line={line} />}
            <span className="whitespace-nowrap text-body-02 leading-[1.4] text-gray-100">
              {stationName}
            </span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-0.5 border-0 bg-transparent p-0 text-caption text-gray-70"
            aria-label={liked ? "좋아요 완료" : "좋아요"}
            aria-pressed={liked}
            disabled={liked || isLikePending}
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
        <p className="m-0 text-body-01 font-semibold leading-[1.4] text-gray-100">
          {name}
        </p>
        <div className="flex gap-1">
          {tags.slice(0, 2).map((tag) => (
            <span
              className="rounded-lg bg-gray-20 px-2 py-1 text-caption text-gray-80"
              key={tag}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
