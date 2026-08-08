import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileDefault from "@/assets/profile-default.svg?react";
import heartFilledUrl from "@/assets/explore/heart-filled.svg";
import { getAccessToken } from "@/api/auth";
import { copyCourse } from "@/api/courseDetail";
import { likeExploreCourse, unlikeExploreCourse } from "@/api/explore";
import { getJournalDetail, type JournalDetail, type TravelDuration } from "@/api/journal";
import LeadToLoginModal from "@/components/LeadToLoginModal";
import StationLineList from "@/components/StationLineList";
import type { CourseDetailData } from "@/types/courseDetail";
import type { SubwayLine } from "@/types/subway";
import CourseDetailPlace from "./components/CourseDetailPlace";
import { showToast } from "./components/ShowToast";
import "./DetailPage.css";

const isSubwayLine = (value: number): value is SubwayLine =>
  Number.isInteger(value) && value >= 1 && value <= 9;

const isPositiveId = (value: number) => Number.isSafeInteger(value) && value > 0;

const durationLabels: Record<TravelDuration, string> = {
  SHORT: "1~2시간",
  HALF_DAY: "3~4시간",
  FULL_DAY: "하루",
};

function formatVisitedAt(value: string) {
  const matchedDate = /^\d{4}-\d{2}-\d{2}$/.test(value);
  return matchedDate ? `${value.replaceAll("-", ".")} 방문` : value;
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
    authorId: journal.writerId,
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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadedJournalId, setLoadedJournalId] = useState<number | null>(null);
  const [errorJournalId, setErrorJournalId] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isCourseLoaded, setIsCourseLoaded] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasValidJournalId) return;

    let isActive = true;
    getJournalDetail(journalId)
      .then((journal) => {
        if (!isActive) return;
        const nextCourse = mapJournalToCourse(journal);
        setCourse(nextCourse);
        setLoadedJournalId(journalId);
        setLoadError(null);
        setErrorJournalId(null);
        setSaved(Boolean(nextCourse.isLiked));
        setIsCourseLoaded(isPositiveId(nextCourse.id));
      })
      .catch((error) => {
        if (isActive) {
          setLoadError(error instanceof Error ? error.message : "코스 상세 정보를 불러오지 못했습니다.");
          setErrorJournalId(journalId);
        }
      });

    return () => {
      isActive = false;
    };
  }, [hasValidJournalId, journalId]);

  const handleToggleSave = async () => {
    if (isSaving || !course || !isCourseLoaded) return;
    if (!getAccessToken()) {
      setIsLoginModalOpen(true);
      return;
    }
    const nextSaved = !saved;
    setSaved(nextSaved);
    setCourse((current) => current ? ({
      ...current,
      saveCount: Math.max(0, current.saveCount + (nextSaved ? 1 : -1)),
    }) : current);
    setIsSaving(true);

    try {
      if (nextSaved) await likeExploreCourse(course.id);
      else await unlikeExploreCourse(course.id);
    } catch {
      setSaved(!nextSaved);
      setCourse((current) => current ? ({
        ...current,
        saveCount: Math.max(0, current.saveCount + (nextSaved ? -1 : 1)),
      }) : current);
      showToast({ message: "저장 상태를 변경하지 못했습니다." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyCourse = async () => {
    if (!getAccessToken()) {
      setIsLoginModalOpen(true);
      return;
    }
    if (isCopying || !course || !isCourseLoaded) return;

    try {
      setIsCopying(true);
      setCopyError(null);
      const copyName = course.title.trim().slice(0, 20);
      if (!copyName) throw new Error("코스 이름이 비어 있습니다.");
      const copiedCourse = await copyCourse(course.id, copyName);
      navigateToCopyPage(copiedCourse.courseId, copiedCourse.name);
    } catch (error) {
      setCopyError(error instanceof Error ? error.message : "코스를 복제하지 못했습니다.");
    } finally {
      setIsCopying(false);
    }
  };

  const navigateToCopyPage = (copiedCourseId: number, courseName: string) => {
      if (!course) return;
      navigate(`/course/${copiedCourseId}/copy`, {
        state: {
          courseName,
          stationName: course.stationName,
          lineId: course.line,
          places: [],
        },
      });
  };

  const isCurrentCourse = hasValidJournalId && loadedJournalId === journalId && course;
  const currentLoadError = errorJournalId === journalId ? loadError : null;

  if (!isCurrentCourse) {
    return (
      <main className="course-detail course-detail--status">
        <header className="course-detail__topbar">
          <button type="button" onClick={() => navigate(-1)} aria-label="이전">
            <img src="/course-detail/back.svg" alt="" />
          </button>
        </header>
        <p role={!hasValidJournalId || currentLoadError ? "alert" : "status"}>
          {!hasValidJournalId
            ? "올바르지 않은 여행일지 주소입니다."
            : currentLoadError ?? "코스 상세 정보를 불러오는 중입니다."}
        </p>
      </main>
    );
  }

  return (
    <main className="course-detail">
      {isLoginModalOpen && (
        <LeadToLoginModal
          message={"내 코스로 만들려면\n로그인이 필요해요!"}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      <header className="course-detail__topbar">
        <button type="button" onClick={() => navigate(-1)} aria-label="이전">
          <img src="/course-detail/back.svg" alt="" />
        </button>
        {!course.isMine && (
          <button
            type="button"
            onClick={handleToggleSave}
            aria-label={saved ? "저장 취소" : "저장"}
            aria-pressed={saved}
            disabled={isSaving}
          >
            <img src={saved ? heartFilledUrl : "/course-detail/heart.svg"} alt="" />
          </button>
        )}
      </header>

      <section className="course-detail__intro">
        <div className="course-detail__station">
          <StationLineList items={[{ line: course.line, stationName: course.stationName }]} />
        </div>
        <h1>{course.title}{course.subtitle && <><br />{course.subtitle}</>}</h1>
        <div className="course-detail__stats">
          <span>조회수 {course.viewCount}</span>
          <span>저장 {course.saveCount}</span>
        </div>
        <button
          type="button"
          className="course-detail__author"
          onClick={() => {
            if (!course.authorId) return;
            navigate(`/profile/${course.authorId}`, {
              state: {
                nickname: course.authorName,
                profileImageUrl: course.authorProfileImageUrl ?? null,
              },
            });
          }}
          aria-label={course.authorId ? `${course.authorName} 프로필 보기` : undefined}
          disabled={!course.authorId}
        >
          {course.authorProfileImageUrl ? (
            <img
              className="h-[49px] w-[49px] shrink-0 rounded-full object-cover"
              src={course.authorProfileImageUrl}
              alt={`${course.authorName} 프로필`}
            />
          ) : (
            <ProfileDefault className="h-[49px] w-[49px] shrink-0" aria-hidden="true" />
          )}
          <div><strong>{course.authorName}</strong><span>{course.visitedAt}</span></div>
        </button>
      </section>

      <section className="course-detail__gallery" aria-label="코스 사진" tabIndex={0}>
        <div>
          {course.images.map((image) => <img key={image.id} src={image.src} alt={image.alt} />)}
          <i aria-hidden="true" />
        </div>
      </section>

      <section className="course-detail__note">
        <img src="/course-detail/star-1.svg" alt="" />
        <p>{course.review.split("\n").map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)}</p>
      </section>

      <section className="course-detail__places">
        <h2>다녀온 곳</h2>
        <div className="course-detail__star-frame course-detail__star-frame--large" aria-hidden="true">
          <div className="course-detail__star-rotate">
            <img src="/course-detail/star-2.svg" alt="" />
          </div>
        </div>
        <div className="course-detail__star-frame course-detail__star-frame--small" aria-hidden="true">
          <img src="/course-detail/star-3.svg" alt="" />
        </div>
        {course.places.map((place) => <CourseDetailPlace key={place.id} place={place} />)}
      </section>

      <div className="course-detail__tags">
        <span>여행시간 {course.duration}</span>
        {course.tags.map((tag) => <span key={tag}>{tag.startsWith("#") ? tag : `#${tag}`}</span>)}
      </div>

      {!course.isMine && (
        <footer className="course-detail__footer">
          {copyError && <p role="alert">{copyError}</p>}
          <button type="button" onClick={handleCopyCourse} disabled={isCopying || !isCourseLoaded}>
            {isCopying ? "코스 만드는 중..." : "내 코스로 만들기"}
          </button>
        </footer>
      )}
    </main>
  );
}
