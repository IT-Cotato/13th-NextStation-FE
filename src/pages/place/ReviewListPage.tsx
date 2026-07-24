import Header from "@/components/Header";
import { mockPlaceReviews } from "@/mocks/mockPlaceReviews";
import ReviewCard from "./components/ReviewCard";
import { useState } from "react";
import Empty from "@/assets/empty.svg?react";
import Dropdown from "./components/Dropdown";

type Option = {
  label: string;
  value: string;
};

const sortOptions: Option[] = [
  { label: "최신순", value: "latest" },
  { label: "추천순", value: "recommendation" },
];

export default function ReviewListPage() {
  const [reviews, setReviews] = useState(mockPlaceReviews.reviews);
  const isEmpty = reviews.length === 0;
  const [selectedOption, setSelectedOption] = useState<Option>(sortOptions[0]);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (selectedOption.value === "latest") {
      // 최신순
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // 추천순
      return b.likeCount - a.likeCount;
    }
  });

  const toggleLike = (targetId: number) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.reviewId === targetId
          ? {
              ...r,
              isLike: !r.isLike,
              likeCount: r.isLike ? r.likeCount - 1 : r.likeCount + 1,
            }
          : r,
      ),
    );
  };

  return (
    <main className="flex flex-col h-dvh bg-gray-10 pt-[calc(var(--safe-top)+12px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-4">
      <Header showBack title={`리뷰 ${reviews.length}개`} />

      <section>
        {/* dropdown */}
        <section className="flex justify-center">
          <div className="flex justify-end w-[360px]">
            <Dropdown
              options={sortOptions}
              onSelect={(value) => {
                const option = sortOptions.find((opt) => opt.value === value);
                if (option) setSelectedOption(option);
              }}
            />
          </div>
        </section>

        {/* list */}
        <section className="flex flex-1 justify-center items-center pt-4">
          {isEmpty ? (
            <div className="flex flex-col items-center gap-[34px]">
              <Empty />
              <div className="flex flex-col gap-2">
                <span className="text-title-02 text-gray-70 font-semibold text-center leading-[1.4] tracking-[-0.45px]">
                  아직 등록된 리뷰가 없어요!
                </span>
                <p className="text-body-02 text-gray-60 text-center leading-[1.4] tracking-[-0.3px]">
                  혹시 이 장소에 다녀오셨나요?
                  <br />
                  다녀오셨다면 여행 기록을 작성해보시면 어때요?
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {sortedReviews.map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  writerNickname={review.writerNickname}
                  writerProfileImageUrl={review.writerProfileImageUrl}
                  content={review.content}
                  imageUrl={review.imageUrl}
                  likeCount={review.likeCount}
                  isLike={review.isLike}
                  onToggleLike={() => toggleLike(review.reviewId)}
                  createdAt={review.createdAt}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
