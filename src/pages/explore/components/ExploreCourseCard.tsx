import { useState } from "react";
import { likeExploreCourse, type ExploreCourse } from "@/api/explore";
import Heart from "@/assets/heart.svg?react";
import coursePhoto from "@/assets/explore/course-photo.svg";
import HeartFilled from "@/assets/explore/heart-filled.svg?react";
import rankStar from "@/assets/explore/rank-star.svg";

interface ExploreCourseCardProps {
  course?: ExploreCourse;
  rank: number;
}

export default function ExploreCourseCard({
  course,
  rank,
}: ExploreCourseCardProps) {
  const [liked, setLiked] = useState(course?.isLiked ?? false);
  const [isLikePending, setIsLikePending] = useState(false);
  const originalLiked = course?.isLiked ?? false;
  const likeCount =
    (course?.likeCount ?? 0) +
    (liked === originalLiked ? 0 : liked ? 1 : -1);
  const backgroundImage = `linear-gradient(to bottom, transparent 30%, rgb(255 255 255 / 60%) 66%, white), url(${course?.imageUrl || coursePhoto})`;

  const handleLike = async () => {
    if (!course || liked || isLikePending) return;

    setLiked(true);
    setIsLikePending(true);
    try {
      await likeExploreCourse(course.courseId);
    } catch {
      setLiked(false);
    } finally {
      setIsLikePending(false);
    }
  };

  return (
    <article
      className="flex h-[200px] basis-36 shrink-0 flex-col justify-between overflow-hidden rounded-lg bg-cover bg-center px-4 pb-3 pt-[13px] shadow-[0_0_20px_rgb(118_118_118/20%)]"
      style={{ backgroundImage }}
    >
      <span
        className="flex size-[42px] self-end items-center justify-center bg-contain bg-center bg-no-repeat pb-1 pl-1 text-title-01 font-semibold leading-7 text-white"
        style={{ backgroundImage: `url(${rankStar})` }}
        aria-label={`${rank}위`}
      >
        {rank}
      </span>
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-1 whitespace-nowrap text-body-02 text-gray-100">
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-subway-2-dark px-1.5 text-body-01 font-semibold text-subway-2-light">
            {course?.line?.id ?? 2}
          </span>
          {course?.stationName ?? "신림역"}
        </div>
        <p className="m-0 text-subtitle font-semibold leading-[1.4] tracking-[-0.025em] text-gray-100">
          {course?.name ?? "민성이랑 떠나는 신림 느좋투어"}
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 self-start border-0 bg-transparent p-0 text-caption text-gray-70"
          aria-label={liked ? "좋아요 완료" : "좋아요"}
          aria-pressed={liked}
          disabled={liked || isLikePending}
          onClick={() => void handleLike()}
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
