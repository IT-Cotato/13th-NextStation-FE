import LikeDefault from "@/assets/like-default.svg?react";
import LikeActive from "@/assets/like-active.svg?react";
import { useState } from "react";

export default function ReviewCard({
  writerNickname,
  writerProfileImageUrl,
  content,
  imageUrl,
  initialLikeCount,
  initialIsLike,
  createdAt,
}: {
  writerNickname: string;
  writerProfileImageUrl: string;
  content: string;
  imageUrl: string | null;
  initialLikeCount: number;
  initialIsLike: boolean;
  createdAt: string;
}) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLike, setIsLike] = useState(initialIsLike);
  const [now] = useState(() => Date.now());
  const diffDays = Math.floor(
    (now - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24),
  );
  const isImageEmpty = imageUrl === null;

  const toggleLike = () => {
    setIsLike((prev) => !prev);
    setLikeCount((prev) => (isLike ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex flex-col w-[360px] p-4 gap-4 rounded-lg bg-white items-center">
      {/* user info */}
      <section className="flex items-center w-full">
        <div className="flex gap-3 items-center">
          {/* 프로필 사진 */}
          <div className="flex w-11 h-11 shrink-0 rounded-full border border-primary-20 overflow-hidden">
            <img src={writerProfileImageUrl} className="object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="flex text-body-01 font-semibold">
              {writerNickname}
            </span>
            <span className="flex text-caption text-gray-70">
              {diffDays}일 전
            </span>
          </div>
        </div>
      </section>

      {/* place info */}
      <section className="flex w-full">
        <div className="flex flex-col gap-4">
          <p className="flex text-body-01 text-gray-70">{content}</p>
          {/* image */}
          {!isImageEmpty && (
            <div className="flex w-[90px] h-[67px] rounded-[8px] overflow-hidden">
              <img src={imageUrl} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* like */}
      <section className="flex gap-1 items-center w-full">
        <button
          onClick={toggleLike}
          className="items-center justify-center w-4 h-4"
        >
          {isLike ? <LikeActive /> : <LikeDefault />}
        </button>
        <span className="text-body-01 text-gray-60">{likeCount}</span>
      </section>
    </div>
  );
}
