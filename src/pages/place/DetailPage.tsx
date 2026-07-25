import Header from "@/components/Header";
import Marker from "@/assets/marker.svg?react";
import Phone from "@/assets/phone.svg?react";
import Link from "@/assets/link.svg?react";
import Arrow from "@/assets/arrow-next(gray).svg?react";
import EmptyCard from "./components/EmptyCard";
import CulturalSpace from "@/assets/category/cultural-space.svg?react";
import Cafe from "@/assets/category/cafe.svg?react";
import Restaurant from "@/assets/category/restaurant.svg?react";
import Walk from "@/assets/category/walk.svg?react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
import ReviewPreviewCard from "./components/ReviewPreviewCard";
import CoursePreviewCard from "./components/CoursePreviewCard";
import { showToast } from "../course/components/ShowToast";
import copyToClipboard from "@/utils/copyToClipBoard";
import { mockPlaceCourses } from "@/mocks/mockPlaceCourses";
// import { getPlaceDetail, type Place } from "@/api/place";
import { mockPlaceDetail } from "@/mocks/mockPlaceDetail";

export default function DetailPage() {
  // const { placeId } = useParams();
  const navigate = useNavigate();
  const place = mockPlaceDetail;
  // const [place, setPlace] = useState<Place | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!placeId) return;

  //   const fetchPlaceDetail = async () => {
  //     try {
  //       setIsLoading(true);
  //       const data = await getPlaceDetail(Number(placeId));
  //       setPlace(data);
  //     } catch (e) {
  //       console.error(e);
  //       setError("장소 정보를 불러오지 못했습니다.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchPlaceDetail();
  // }, [placeId]);

  // if (isLoading) return <p>로딩 중...</p>;
  // if (error) return <p>{error}</p>;
  // if (!place) return null;

  const slideImages = place.images;
  const isImageEmpty = slideImages.length < 1;
  const reviews = place.reviews;
  const isReviewEmpty = reviews.length < 1;
  const previewReviewCount = reviews.length < 3 ? reviews.length : 3;
  // 장소를 포함한 코스 API 나오면 수정
  const placeCourses = mockPlaceCourses.courses;
  const isCourseEmpty = placeCourses.length < 1;

  const handleDotClick = (idx: number) => {
    setIndex(idx);
    sliderRef.current?.scrollTo({
      left: idx * sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const handleSliderScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setIndex(Math.round(slider.scrollLeft / slider.clientWidth));
  };

  const handleNavigate = () => {
    // 링크 수정! --> 백엔드에서 장소별 링크 전체 넘겨줌 (kakaoPlaceUrl)
    window.open(`${place.kakaoPlaceUrl}`, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async (text: string) => {
    const succeeded = await copyToClipboard(text);
    if (succeeded) {
      showToast({ message: "클립보드에 복사되었습니다!" });
    } else {
      showToast({ message: "복사에 실패했습니다." });
    }
  };

  return (
    <main className="flex flex-col h-dvh overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-gray-10 pt-[calc(var(--safe-top)+12px)]">
      <Header showBack />

      {/* basic info */}
      <section className="flex justify-center pt-4">
        <div className="flex flex-col gap-2.5 w-[360px]">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-title-02 font-semibold leading-[1.4] tracking-[-0.5px]">
                {place.name}
              </span>
              <span className="text-body-02 text-gray-70 leading-[1.4] tracking-[-0.3px]">
                {place.description}
              </span>
            </div>
            <div className="flex self-start px-3 py-1.5 bg-primary-50 text-gray-10 text-caption rounded-lg leading-none tracking-[-0.25px]">
              {place.category}
            </div>
          </div>

          {/* image */}
          {isImageEmpty ? (
            // 기본 이미지
            <div className="flex justify-center w-[360px] rounded-lg bg-gray-30 h-[240px]">
              <div className="flex items-center">
                {place.category === "문화공간" ? (
                  <CulturalSpace />
                ) : place.category === "카페" ? (
                  <Cafe />
                ) : place.category === "식당" ? (
                  <Restaurant />
                ) : (
                  <Walk />
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div
                ref={sliderRef}
                onScroll={handleSliderScroll}
                className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {slideImages.map((image, i) => (
                  <div
                    className="relative shrink-0 snap-start h-[240px] w-full"
                    key={i}
                  >
                    <img
                      src={image}
                      alt={`${place.name} 사진 ${i + 1}`}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-center items-center">
                {slideImages.map((_, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className={`inline-block h-[6px] rounded-full transition-all duration-300 ${
                      index === idx
                        ? "bg-primary-50 w-[18px]"
                        : "bg-gray-40 w-[6px]"
                    }`}
                    onClick={() => handleDotClick(idx)}
                  ></button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* detail info */}
      <section className="flex justify-center pt-3">
        <div className="flex flex-col gap-3 w-[360px]">
          <div className="flex flex-col bg-white px-4 py-2 gap-1 rounded-lg">
            <div className="flex gap-2">
              <Marker className="w-6 h-6" />
              <div className="flex gap-1">
                <span className="text-body-01 leading-[1.4] tracking-[-0.35px]">
                  {place.address}
                </span>
                <button
                  className="flex text-body-01 text-primary-70 leading-[1.4] tracking-[-0.35px]"
                  onClick={() => handleCopy(place.address)}
                >
                  복사
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <Phone className="w-6 h-6" />
              <div className="flex gap-1">
                <span className="text-body-01 leading-[1.4] tracking-[-0.35px]">
                  {place.contactNumber}
                </span>
                <button
                  className="flex text-body-01 text-primary-70 leading-[1.4] tracking-[-0.35px]"
                  onClick={() => handleCopy(place.contactNumber)}
                >
                  복사
                </button>
              </div>
            </div>
          </div>
          <button
            className="flex justify-end gap-0.5 text-body-02 font-semibold text-gray-60 leading-none tracking-[-0.3px]"
            onClick={handleNavigate}
          >
            카카오맵에서 확인하기
            <Link className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* review */}
      <section className="flex justify-center pt-7">
        <div className="flex flex-col w-[360px] gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-0.5">
              <span className="flex font-semibold text-title-02 leading-[1.4] tracking-[-0.45px]">
                다른 사람들이 남긴 리뷰
              </span>
              <span className="flex text-subtitle text-gray-70 leading-[1.4] tracking-[-0.4px]">
                {isReviewEmpty ? "" : `(${reviews.length})`}
              </span>
            </div>

            <button
              className="flex gap-0.5 items-center text-gray-60 font-semibold text-body-02 leading-none tracking-[-0.3px]"
              onClick={() => navigate(`/place/${place.placeId}/reviews`)}
            >
              더보기
              <Arrow className="w-4 h-4" />
            </button>
          </div>
          {isReviewEmpty ? (
            <EmptyCard variant="review" />
          ) : (
            <div className="flex flex-col w-[360px] rounded-lg bg-white">
              {reviews.slice(0, previewReviewCount).map((review, index) => (
                <div key={review.reviewId}>
                  <ReviewPreviewCard
                    writerProfileImageUrl={review.writerProfileImageUrl}
                    writerNickname={review.writerNickname}
                    content={review.content}
                  />
                  {/* 구분선 */}
                  {index < previewReviewCount - 1 && (
                    <div className="border-b border-gray-20 mx-4" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* other courses */}
      <section className="flex justify-center pt-7">
        <div className="flex flex-col w-[360px]">
          <div className="flex pt-3">
            <span className="flex font-semibold text-title-02 leading-[1.4] tracking-[-0.45px]">
              이 장소를 포함한 코스
            </span>
          </div>
          {isCourseEmpty ? (
            <EmptyCard variant="course" />
          ) : (
            <div className="flex w-full overflow-x-auto overflow-y-hidden py-5 m-0 list-none font-semibold [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-3">
              {placeCourses.map((placeCourse) => (
                <button
                  key={placeCourse.courseId}
                  type="button"
                  className="flex shrink-0 border-0 bg-transparent p-0 text-left"
                  onClick={() => navigate(`/explore/${placeCourse.courseId}`)}
                >
                  <CoursePreviewCard
                    line={placeCourse.line}
                    name={placeCourse.name}
                    placeCount={placeCourse.placeCount}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
