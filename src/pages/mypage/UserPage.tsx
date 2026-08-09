import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import * as motion from "motion/react-client";
import BackIcon from "@/assets/back.svg?react";
import ProfileDefault from "@/assets/profile-default.svg?react";
import {
  getPublicMemberCourses,
  getPublicMemberProfile,
  getPublicMemberStamps,
  type PublicMemberCourse,
  type PublicMemberProfile,
} from "@/api/member";
import type { Stamp } from "@/api/stamp";
import JournalPreviewCard from "./components/JournalPreviewCard";
import StampListView from "./components/StampListView";

export default function UserPage() {
  const navigate = useNavigate();
  const { memberId: memberIdParam } = useParams();
  const memberId = Number(memberIdParam);
  const hasValidMemberId = Number.isSafeInteger(memberId) && memberId > 0;
  const [profile, setProfile] = useState<PublicMemberProfile | null>(null);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [journals, setJournals] = useState<PublicMemberCourse[]>([]);
  const [isStampMode, setIsStampMode] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasValidMemberId) return;

    let isActive = true;
    void Promise.all([
      getPublicMemberProfile(memberId),
      getPublicMemberStamps(memberId),
      getPublicMemberCourses(memberId),
    ])
      .then(([profileResponse, stampResponse, courseResponse]) => {
        if (!isActive) return;

        setProfile(profileResponse);
        setStamps(
          stampResponse.flatMap((stamp) => {
            const line = stamp.lines[0];
            return line ? [{ ...stamp, line }] : [];
          }),
        );
        setJournals(courseResponse.courses);
        setNextCursor(courseResponse.nextCursor);
        setHasNext(courseResponse.hasNext);
      })
      .catch((error: unknown) => {
        if (!isActive) return;
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "프로필 정보를 불러오지 못했습니다.",
        );
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [hasValidMemberId, memberId]);

  const loadMoreJournals = async () => {
    if (!nextCursor || isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      setLoadMoreError(null);
      const data = await getPublicMemberCourses(memberId, nextCursor);
      setJournals((current) => [...current, ...data.courses]);
      setNextCursor(data.nextCursor);
      setHasNext(data.hasNext);
    } catch {
      setLoadMoreError("추가 여행 일지를 불러오지 못했습니다.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView && hasNext && !isLoadingMore) {
        void loadMoreJournals();
      }
    },
  });

  if (!hasValidMemberId) {
    return <p>올바르지 않은 프로필입니다.</p>;
  }
  if (isLoading) return <p>로딩 중...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  if (!profile) return null;

  return (
    <main className="flex h-dvh flex-col gap-2.5 overflow-y-auto bg-gray-10 pt-[calc(var(--safe-top)+12px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <section className="flex justify-center">
        <div className="flex w-[390px] justify-start px-[15px]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="이전"
          >
            <BackIcon className="size-6" aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="flex justify-center">
        <div className="flex flex-col gap-4">
          {profile.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              alt={profile.nickname}
              className="size-[70px] rounded-full object-cover"
            />
          ) : (
            <ProfileDefault className="size-[70px]" aria-hidden="true" />
          )}
          <div className="flex justify-center gap-[5px]">
            <span className="text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">
              {profile.nickname}
            </span>
          </div>
        </div>
      </section>

      <section className="flex justify-center">
        <div className="flex w-[358px] items-center rounded-[36px] bg-gray-30 p-1">
          <button
            type="button"
            onClick={() => setIsStampMode(true)}
            className="relative z-10 flex-1 rounded-[28px] py-2 text-center"
          >
            {isStampMode && (
              <motion.div
                layoutId="user-page-pill"
                className="absolute inset-0 rounded-[28px] bg-white"
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            )}
            <span
              className={`relative z-10 text-subtitle font-semibold ${isStampMode ? "text-gray-100" : "text-gray-60"}`}
            >
              스탬프
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsStampMode(false)}
            className="relative z-10 flex-1 rounded-[28px] py-2 text-center"
          >
            {!isStampMode && (
              <motion.div
                layoutId="user-page-pill"
                className="absolute inset-0 rounded-[28px] bg-white"
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            )}
            <span
              className={`relative z-10 text-subtitle font-semibold ${!isStampMode ? "text-gray-100" : "text-gray-60"}`}
            >
              여행일지
            </span>
          </button>
        </div>
      </section>

      <section className="flex justify-center">
        {isStampMode ? (
          <StampListView isMyProfile={false} stamps={stamps} />
        ) : journals.length === 0 ? (
          <div className="flex h-[160px] w-[358px] items-center justify-center rounded-lg bg-white">
            <p className="text-body-01 text-gray-70">공개된 여행일지가 없어요</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="grid grid-cols-3 gap-[5px]">
              {journals.map((journal) => (
                <button
                  key={journal.courseId}
                  type="button"
                  onClick={() => navigate(`/course/${journal.journalId}`)}
                  className="text-left"
                  aria-label={`${journal.name} 상세 보기`}
                >
                  <JournalPreviewCard
                    lineId={journal.line?.id}
                    stationName={journal.stationName}
                    journalTitle={journal.name}
                    thumbnailUrl={journal.imageUrl}
                    likeCount={journal.likeCount}
                  />
                </button>
              ))}
            </div>
            {loadMoreError && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-body-02 text-gray-70">{loadMoreError}</p>
                <button
                  type="button"
                  onClick={() => void loadMoreJournals()}
                  className="text-body-02 text-primary-60 underline"
                >
                  다시 시도
                </button>
              </div>
            )}
          </div>
        )}
      </section>
      <div ref={ref} className="h-1 w-full" />
    </main>
  );
}
