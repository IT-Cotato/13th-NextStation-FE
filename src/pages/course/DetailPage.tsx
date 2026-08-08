import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackIcon from "@/assets/back.svg?react";
import CardDefault from "@/assets/card-default.svg?react";
import HeartIcon from "@/assets/heart.svg?react";
import HeartFilledIcon from "@/assets/explore/heart-filled.svg?react";
import ProfileDefault from "@/assets/profile-default.svg?react";
import StarOne from "@/assets/course-detail/star-1.svg?react";
import StarTwo from "@/assets/course-detail/star-2.svg?react";
import StarThree from "@/assets/course-detail/star-3.svg?react";
import {
  copyCourse,
  type CourseDetailData,
} from "@/api/courseDetail";
import { likeExploreCourse, unlikeExploreCourse } from "@/api/explore";
import {
  getJournalDetail,
  type JournalDetail,
  type TravelDuration,
} from "@/api/journal";
import StationLineList from "@/components/StationLineList";
import type { SubwayLine } from "@/types/subway";
import CourseDetailPlace from "./components/CourseDetailPlace";
import { showToast } from "./components/ShowToast";

const isSubwayLine = (value: number): value is SubwayLine =>
  Number.isInteger(value) && value >= 1 && value <= 9;

const isPositiveId = (value: number) => Number.isSafeInteger(value) && value > 0;

const durationLabels: Record<TravelDuration, string> = {
  SHORT: "3~4 시간",
  HALF_DAY: "반나절",
  FULL_DAY: "하루",
};

function formatVisitedAt(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value.replaceAll("-", ".")} 방문`
    : value;
}

function mapJournalToCourse(journal: JournalDetail): CourseDetailData {
  if (!isPositiveId(journal.courseId)) {
    throw new Error("코스 식별자가 올바르지 않습니다.");
  }
  if (!isSubwayLine(journal.line.id)) {
    throw new Error("지원하지 않는 지하철 노선입니다.");
  }

  return {
    id: journal.courseId,
    line: journal.line.id,
    stationName: journal.stationName,
    title: journal.courseName,
    subtitle: "",
    viewCount: journal.viewCount,
    saveCount: journal.likeCount,
    authorName: journal.writerName,
    authorProfileImageUrl: journal.writerProfileImageUrl,
    visitedAt: formatVisitedAt(journal.traveledAt),
    isMine: journal.isMine,
    isLiked: journal.isLiked,
    review: journal.overallReview,
    duration: durationLabels[journal.travelDuration],
    tags: journal.tags,
    images: (journal.imageUrls ?? []).map((src, index) => ({
      id: index + 1,
      src,
      alt: `${journal.courseName} 여행 사진 ${index + 1}`,
    })),
    places: [...journal.visitedPlaces]
      .sort((a, b) => a.orderNum - b.orderNum)
      .map((place, index) => ({
        id: place.placeId,
        name: place.placeName,
        description: place.review ?? "",
        imageUrl: place.imageUrl,
        imagePosition: index % 2 === 0 ? "left" : "right",
      })),
  };
}

export default function DetailPage() {
  const navigate = useNavigate();
  const { courseId: journalIdParam } = useParams();
  const journalId = Number(journalIdParam);
  const hasValidJournalId = isPositiveId(journalId);
  const [course, setCourse] = useState<CourseDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    if (!hasValidJournalId) return;

    let isActive = true;
    void getJournalDetail(journalId)
      .then((journal) => {
        if (!isActive) return;
        const nextCourse = mapJournalToCourse(journal);
        setCourse(nextCourse);
        setSaved(Boolean(nextCourse.isLiked));
        setErrorMessage(null);
      })
      .catch((error) => {
        if (!isActive) return;
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "코스 상세 정보를 불러오지 못했습니다.",
        );
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [hasValidJournalId, journalId]);

  const handleToggleSave = async () => {
    if (isSaving || !course) return;

    const nextSaved = !saved;
    setSaved(nextSaved);
    setCourse((current) =>
      current
        ? {
            ...current,
            saveCount: Math.max(
              0,
              current.saveCount + (nextSaved ? 1 : -1),
            ),
          }
        : current,
    );
    setIsSaving(true);

    try {
      if (nextSaved) await likeExploreCourse(course.id);
      else await unlikeExploreCourse(course.id);
    } catch {
      setSaved(!nextSaved);
      setCourse((current) =>
        current
          ? {
              ...current,
              saveCount: Math.max(
                0,
                current.saveCount + (nextSaved ? -1 : 1),
              ),
            }
          : current,
      );
      showToast({ message: "저장 상태를 변경하지 못했습니다." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyCourse = async () => {
    if (isCopying || !course) return;

    try {
      setIsCopying(true);
      setErrorMessage(null);
      const copyName = course.title.trim().slice(0, 20);
      if (!copyName) throw new Error("코스 이름이 비어 있습니다.");
      const copiedCourse = await copyCourse(course.id, copyName);
      navigate(`/course/${copiedCourse.courseId}/verify`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "코스를 복제하지 못했습니다.",
      );
    } finally {
      setIsCopying(false);
    }
  };

  if (!hasValidJournalId || isLoading || !course) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-[390px] bg-gray-10 text-gray-100">
        <header className="flex items-end px-[15px] pb-[10px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="이전"
            className="grid size-6 place-items-center"
          >
            <BackIcon className="size-6" aria-hidden="true" />
          </button>
        </header>
        <p
          className="mx-6 mt-[180px] text-center text-body-01 text-gray-80"
          role={!hasValidJournalId || errorMessage ? "alert" : "status"}
        >
          {!hasValidJournalId
            ? "올바르지 않은 여행일지 주소입니다."
            : errorMessage ?? "코스 상세 정보를 불러오는 중입니다."}
        </p>
      </main>
    );
  }

  return (
    <main className="flex h-dvh flex-col overflow-y-auto bg-gray-10 pt-[calc(var(--safe-top)+12px)] text-gray-100 bg-[linear-gradient(180deg,var(--color-secondary-20)_0%,var(--color-gray-10)_60%)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <header className="flex items-end justify-between px-[15px] pb-[10px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="이전"
          className="grid size-6 place-items-center"
        >
          <BackIcon className="size-6" aria-hidden="true" />
        </button>
        {!course.isMine && (
          <button
            type="button"
            onClick={handleToggleSave}
            aria-label={saved ? "저장 취소" : "저장"}
            aria-pressed={saved}
            disabled={isSaving}
            className="grid size-6 place-items-center disabled:opacity-50"
          >
            {saved ? (
              <HeartFilledIcon className="size-6" aria-hidden="true" />
            ) : (
              <HeartIcon className="size-6" aria-hidden="true" />
            )}
          </button>
        )}
      </header>

      <section className="flex flex-col gap-2 px-[15px] text-center">
        <div className="flex items-center justify-center px-[14px] py-2">
          <StationLineList
            items={[{ line: course.line, stationName: course.stationName }]}
          />
        </div>
        <h1 className="mt-0.5 h-[72px] px-[15px] py-2 text-title-01 font-semibold leading-[1.4] tracking-[-0.025em]">
          {course.title}
          {course.subtitle && (
            <>
              <br />
              {course.subtitle}
            </>
          )}
        </h1>
        <div className="flex h-[33px] justify-center gap-2.5 px-[15px] py-2 text-caption text-gray-80">
          <span>조회수 {course.viewCount}</span>
          <span>저장 {course.saveCount}</span>
        </div>
        <div className="flex h-[73px] w-full items-center gap-[14px] rounded-[20px] bg-secondary-10 px-[15px] py-3 text-left">
          {course.authorProfileImageUrl ? (
            <img
              className="size-[49px] shrink-0 rounded-full object-cover"
              src={course.authorProfileImageUrl}
              alt={`${course.authorName} 프로필`}
            />
          ) : (
            <ProfileDefault className="size-[49px] shrink-0" aria-hidden="true" />
          )}
          <div className="flex flex-col">
            <strong className="text-body-02 font-semibold text-gray-90">
              {course.authorName}
            </strong>
            <span className="text-caption text-gray-60">{course.visitedAt}</span>
          </div>
        </div>
      </section>

      <section
        className="h-[292px] w-full touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none]"
        aria-label="코스 사진"
        tabIndex={0}
      >
        <div className="flex h-[292px] w-max min-w-full gap-5 px-[15px] py-4">
          {course.images.length > 0 ? (
            course.images.map((image) => (
              <img
                key={image.id}
                className="size-[260px] shrink-0 rounded-[20px] bg-primary-10 object-cover"
                src={image.src}
                alt={image.alt}
              />
            ))
          ) : (
            <CardDefault className="size-[260px] shrink-0 rounded-[20px]" />
          )}
        </div>
      </section>

      <section className="flex items-start px-[15px] pb-7 pt-0">
        <StarOne className="size-[68px] shrink-0" aria-hidden="true" />
        <p className="-ml-[47px] mt-12 whitespace-pre-line px-[21px] text-body-02 leading-[1.8] tracking-[-0.025em]">
          {course.review}
        </p>
      </section>

      <section className="border-b-[6px] border-gray-20 pb-9">
        <h2 className="px-8 py-2 text-title-02 font-semibold leading-[1.4] tracking-[-0.025em]">
          다녀온 곳
        </h2>
        <div className="pointer-events-none -mb-[116px] ml-auto mr-[13px] flex size-[136px] items-center justify-center" aria-hidden="true">
          <StarTwo className="size-[100px] rotate-[30deg]" />
        </div>
        {course.places.map((place) => (
          <CourseDetailPlace key={place.id} place={place} />
        ))}
        <StarThree className="pointer-events-none ml-[5px] -mt-[116px] size-[60px]" aria-hidden="true" />
      </section>

      <div className="flex min-h-[97px] flex-wrap gap-2 px-[15px] py-8">
        <span className="whitespace-nowrap rounded-lg bg-gray-30 px-3 py-2 text-caption text-gray-70">
          여행시간 {course.duration}
        </span>
        {course.tags.map((tag) => (
          <span
            className="whitespace-nowrap rounded-lg bg-gray-30 px-3 py-2 text-caption text-gray-70"
            key={tag}
          >
            {tag.startsWith("#") ? tag : `#${tag}`}
          </span>
        ))}
      </div>

      {!course.isMine && (
        <footer className="h-[125px] px-[15px] pb-[50px] pt-[15px]">
          {errorMessage && (
            <p className="pb-2 text-center text-caption text-primary-60" role="alert">
              {errorMessage}
            </p>
          )}
          <button
            type="button"
            onClick={handleCopyCourse}
            disabled={isCopying}
            className="h-[60px] w-full rounded-[20px] bg-linear-to-r from-secondary-50 to-primary-50 text-title-02 font-semibold text-gray-10 shadow-[0_0_4px_var(--color-secondary-50)] disabled:opacity-50"
          >
            {isCopying ? "코스 만드는 중..." : "내 코스로 만들기"}
          </button>
        </footer>
      )}
    </main>
  );
}
