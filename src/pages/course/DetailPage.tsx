import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BackIcon from "@/assets/back.svg?react";
import HeartIcon from "@/assets/heart.svg?react";
import HeartFilledIcon from "@/assets/explore/heart-filled.svg?react";
import More from "@/assets/like/more.svg?react";
import ProfileDefault from "@/assets/profile-default.svg?react";
import StarOne from "@/assets/course-detail/star-1.svg?react";
import StarTwo from "@/assets/course-detail/star-2.svg?react";
import StarThree from "@/assets/course-detail/star-3.svg?react";
import { type CourseDetailData } from "@/api/courseDetail";
import { likeExploreCourse, unlikeExploreCourse } from "@/api/explore";
import {
  deleteJournal,
  getJournalDetail,
  patchJournal,
  type JournalDetail,
  type TravelDuration,
} from "@/api/journal";
import StationLineList from "@/components/StationLineList";
import type { SubwayLine } from "@/types/subway";
import CourseDetailPlace from "./components/CourseDetailPlace";
import { showToast } from "./components/ShowToast";
import {
  TRAVEL_STYLE_LABELS,
  type RecommendationTravelStyle,
} from "@/api/recommendation";
import JournalSetting from "./components/JournalSetting";
import ConfirmModal from "@/components/ConfirmModal";
import JournalEditForm from "./components/JournalEditForm";

const isSubwayLine = (value: number): value is SubwayLine =>
  Number.isInteger(value) && value >= 1 && value <= 9;

const isPositiveId = (value: number) =>
  Number.isSafeInteger(value) && value > 0;

const durationLabels: Record<TravelDuration, string> = {
  SHORT: "3~4시간",
  HALF_DAY: "반나절",
  FULL_DAY: "하루종일",
};

const timeOptions = Object.values(durationLabels);
const publicOptions = ["전체 공개", "나만 보기"];

const travelDurationByLabel: Record<string, TravelDuration> =
  Object.fromEntries(
    Object.entries(durationLabels).map(([duration, label]) => [
      label,
      duration as TravelDuration,
    ]),
  );

function formatVisitedAt(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value.replaceAll("-", ".")}`
    : value;
}

function toApiDate(date: string) {
  return date.replaceAll(".", "-");
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
    journalTitle: journal.journalTitle,
    viewCount: journal.viewCount,
    saveCount: journal.likeCount,
    writerId: journal.writerId,
    writerName: journal.writerName,
    writerProfileImageUrl: journal.writerProfileImageUrl,
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
    isPublic: journal.isPublic,
  };
}

export default function DetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId: journalIdParam } = useParams();
  const journalId = Number(journalIdParam);
  const hasValidJournalId = isPositiveId(journalId);
  const [course, setCourse] = useState<CourseDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isJournalSettingOpen, setIsJournalSettingOpen] = useState(false);
  const slideImages = course?.images;
  const isImageEmpty = (slideImages?.length ?? 0) < 1;
  const [, setIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editTime, setEditTime] = useState<string | null>(null);
  const [editDate, setEditDate] = useState<string | null>(null);
  const [editPublic, setEditPublic] = useState<string | null>(null);
  const [isSavingJournal, setIsSavingJournal] = useState(false);
  const [isLeaveConfirmModalOpen, setIsLeaveConfirmModalOpen] = useState(false);

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
            saveCount: Math.max(0, current.saveCount + (nextSaved ? 1 : -1)),
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
              saveCount: Math.max(0, current.saveCount + (nextSaved ? -1 : 1)),
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
      navigate(`/course/${course.id}/verify?from=copy`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "코스를 불러오지 못했습니다.",
      );
    } finally {
      setIsCopying(false);
    }
  };

  const handleSliderScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setIndex(Math.round(slider.scrollLeft / slider.clientWidth));
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
            : (errorMessage ?? "코스 상세 정보를 불러오는 중입니다.")}
        </p>
      </main>
    );
  }

  const handleEdit = () => {
    setEditTitle(course.journalTitle);
    setEditTime(course.duration);
    setEditDate(course.visitedAt);
    setEditPublic(course.isPublic ? "전체 공개" : "나만 보기");
    setIsJournalSettingOpen(false);
    setIsEditMode(true);
  };

  const handleDelete = () => {
    setIsJournalSettingOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteJournal(journalId);
      navigate("/mypage");
    } catch (e) {
      console.error(e);
      showToast({ message: "여행일지 삭제에 실패했습니다." });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleJournalSave = async () => {
    if (isSavingJournal) return;

    const travelDuration = editTime
      ? travelDurationByLabel[editTime]
      : travelDurationByLabel[course.duration];
    const traveledDate = editDate ?? course.visitedAt;
    const isPublic = editPublic !== "나만 보기";

    setIsSavingJournal(true);

    try {
      await patchJournal({
        journalId,
        body: {
          title: editTitle,
          overallReview: course.review,
          traveledAt: toApiDate(traveledDate),
          travelDuration,
          isPublic,
          placeReviews: course.places.map((place) => ({
            placeId: place.id,
            review: place.description,
            imageAction: "KEEP",
          })),
        },
      });

      setCourse((current) =>
        current
          ? {
              ...current,
              journalTitle: editTitle,
              duration: editTime ?? current.duration,
              visitedAt: traveledDate,
            }
          : current,
      );
      setIsJournalSettingOpen(false);
      setIsEditMode(false);
    } catch (e) {
      showToast({
        message:
          e instanceof Error ? e.message : "여행일지 수정에 실패했습니다.",
      });
    } finally {
      setIsSavingJournal(false);
    }
  };

  // 수정사항이 있는지 확인
  const hasUnsavedJournalChanges =
    isEditMode &&
    (editTitle !== course.journalTitle ||
      editTime !== course.duration ||
      editDate !== course.visitedAt ||
      editPublic !== (course.isPublic ? "전체 공개" : "나만 보기"));

  // 여행일지 목록에서 들어온 경우에 뒤로 가면 여행일지 탭이 보이도록 설정
  const navigateBack = () => {
    if (
      (location.state as { from?: string } | null)?.from === "mypage-journal"
    ) {
      navigate("/mypage", { state: { tab: "journal" } });
      return;
    }

    // 아닌 경우 그냥 뒤로 가기
    navigate(-1);
  };

  // 뒤로 가기 버튼 클릭 시 실행
  const handleBack = () => {
    if (hasUnsavedJournalChanges) {
      setIsLeaveConfirmModalOpen(true);
      return;
    }
    navigateBack();
  };

  // TODO : 경로 오류?
  const authorProfileContent = (
    <>
      <div className="flex gap-[14px] justify-center items-center">
        {course.writerProfileImageUrl ? (
          <img
            className="size-[49px] shrink-0 rounded-full object-cover"
            src={course.writerProfileImageUrl}
            alt={`${course.writerName} 프로필`}
          />
        ) : (
          <ProfileDefault className="size-[49px] shrink-0" aria-hidden="true" />
        )}
        <div className="flex flex-col">
          <span className="text-body-01 font-semibold text-gray-90 leading-[1.4] tracking-[-0.35px]">
            {course.writerName}
          </span>
          <span className="text-body-02 text-gray-60 leading-[1.4] tracking-[-0.3px]">
            {course.visitedAt} 방문
          </span>
        </div>
      </div>
    </>
  );

  return (
    <main className="flex h-dvh flex-col overflow-y-auto bg-gray-10 pt-[calc(var(--safe-top)+12px)] text-gray-100 bg-[linear-gradient(180deg,var(--color-secondary-20)_0%,var(--color-gray-10)_60%)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {isDeleteModalOpen && (
        <ConfirmModal
          message="여행일지를 삭제하시겠습니까?"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isLeaveConfirmModalOpen && (
        <ConfirmModal
          message={`해당 기록은 저장되지 않습니다.\n저장하지 않고 나가시겠습니까?`}
          onClose={() => setIsLeaveConfirmModalOpen(false)}
          onConfirm={() => {
            setIsLeaveConfirmModalOpen(false);
            setIsEditMode(false);
            navigateBack();
          }}
        />
      )}

      <header className="flex shrink-0 h-[50px] items-center px-[15px]">
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            aria-label="이전"
            className="grid size-6 place-items-center"
          >
            <BackIcon className="size-6" aria-hidden="true" />
          </button>
          {!course.isMine ? (
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
          ) : isEditMode ? (
            <button
              className="text-subtitle font-semibold leading-[1.4] tracking-[-0.4px] text-gray-90 disabled:opacity-50"
              onClick={handleJournalSave}
              disabled={isSavingJournal}
            >
              완료
            </button>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsJournalSettingOpen((prev) => !prev)}
                aria-label="더보기"
                className="flex items-center"
              >
                <More className="size-6" />
              </button>
              {isJournalSettingOpen && (
                <div className="absolute right-0 top-full z-10 mt-2">
                  <JournalSetting
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <section className="flex flex-col gap-2 px-[15px] text-center">
        <div className="flex items-center justify-center px-[14px] py-2">
          <StationLineList
            items={[{ line: course.line, stationName: course.stationName }]}
          />
        </div>
        {isEditMode ? (
          <JournalEditForm
            title={editTitle}
            onTitleChange={setEditTitle}
            timeOptions={timeOptions}
            selectedTime={editTime}
            onTimeChange={setEditTime}
            tags={course.tags}
            defaultDate={course.visitedAt}
            selectedDate={editDate}
            onDateChange={setEditDate}
            publicOptions={publicOptions}
            selectedPublic={editPublic}
            onPublicChange={setEditPublic}
          />
        ) : (
          <div className="flex flex-col">
            <h1 className="mt-0.5 px-[15px] py-2 text-title-01 font-semibold leading-[1.4] tracking-[-0.025em]">
              {course.journalTitle}
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex justify-center gap-2.5 px-[15px] py-2">
                <span className="text-body-02 leading-[1.4] tracking-[-0.3px] text-gray-80">
                  조회수 {course.viewCount}
                </span>
                <span className="text-body-02 leading-[1.4] tracking-[-0.3px] text-gray-80">
                  저장 {course.saveCount}
                </span>
              </div>
              <button
                type="button"
                className="flex h-[73px] w-full items-center gap-[14px] rounded-[20px] bg-secondary-10 px-[15px] py-3 text-left"
                onClick={() =>
                  course.isMine
                    ? navigate("/mypage", { state: { tab: "journal" } })
                    : navigate(`/profile/${course.writerId}`)
                }
                aria-label={`${course.writerName} 프로필 보기`}
              >
                {authorProfileContent}
              </button>
            </div>
          </div>
        )}
      </section>

      {!isImageEmpty && (
        <section
          className="h-[292px] w-full shrink-0 touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none]"
          aria-label="코스 사진"
          tabIndex={0}
        >
          <div className="flex p-4">
            <div
              ref={sliderRef}
              onScroll={handleSliderScroll}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {slideImages?.map((image, i) => (
                <div
                  className="relative shrink-0 snap-start w-[260px] h-[260px]"
                  key={i}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="flex items-start px-[15px] pb-7 pt-0">
        <StarOne className="size-[68px] shrink-0" aria-hidden="true" />
        <p className="-ml-[47px] mt-12 whitespace-pre-line px-[21px] text-body-01 leading-[1.8] tracking-[-0.025em] break-keep z-10">
          {course.review}
        </p>
      </section>

      <section className="relative isolate border-b-[6px] border-gray-20 pb-9">
        <h2 className="px-8 py-2 text-title-02 font-semibold leading-[1.4] tracking-[-0.025em]">
          다녀온 곳
        </h2>
        <div
          className="pointer-events-none absolute top-[42px] right-[13px] -z-10 flex size-[136px] items-center justify-center"
          aria-hidden="true"
        >
          <div className="relative size-[100px] rotate-[30deg]">
            <StarTwo className="absolute left-[7.6%] top-[1.35%] h-[97.3%] w-[84.8%]" />
          </div>
        </div>
        {course.places.map((place) => (
          <CourseDetailPlace key={place.id} place={place} />
        ))}
        <div
          className="pointer-events-none absolute bottom-[56px] left-[5px] -z-10 size-[60px]"
          aria-hidden="true"
        >
          <StarThree className="absolute left-[3.69%] top-[2.59%] h-[90.46%] w-[92.62%]" />
        </div>
      </section>

      <div className="flex min-h-[97px] flex-wrap gap-2 px-[15px] py-8">
        <span className="whitespace-nowrap rounded-lg bg-gray-30 px-3 py-2 text-body-02 leading-[1.4] tracking-[-0.3px] text-gray-70">
          여행시간 {course.duration}
        </span>
        {course.tags.map((tag) => (
          <span
            className="whitespace-nowrap rounded-lg bg-gray-30 px-3 py-2 text-body-02 leading-[1.4] tracking-[-0.3px] text-gray-70"
            key={tag}
          >
            #{TRAVEL_STYLE_LABELS[tag as RecommendationTravelStyle] ?? tag}
          </span>
        ))}
      </div>

      {!course.isMine && (
        <footer className="h-[125px] px-[15px] pb-[50px] pt-[15px]">
          {errorMessage && (
            <p
              className="pb-2 text-center text-caption text-primary-60"
              role="alert"
            >
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
