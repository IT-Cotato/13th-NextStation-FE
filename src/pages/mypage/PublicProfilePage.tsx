import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as motion from "motion/react-client";
import type { PanInfo } from "motion/react";
import BackIcon from "@/assets/back.svg?react";
import CardDefault from "@/assets/card-default.svg?react";
import ProfileDefault from "@/assets/profile-default.svg?react";
import StampEmpty from "@/assets/stamp-empty.svg?react";
import {
  getPublicMemberCourses,
  getPublicMemberProfile,
  getPublicMemberStamps,
  type PublicMemberCourse,
  type PublicMemberProfile,
  type PublicMemberStamp,
} from "@/api/member";
import LineBadge, { type SubwayLine } from "@/components/LineBadge";
import { STATION_STAMP_MAP } from "@/constants/stationStampMap";

type ProfileTab = "stamps" | "journals";

const STAMPS_PER_PAGE = 12;
const STAMP_PAGE_WIDTH = 300;
const SWIPE_THRESHOLD = 50;

function getSubwayLine(code: string): SubwayLine | null {
  const match = /^LINE_([1-9])$/.exec(code);
  return match ? (Number(match[1]) as SubwayLine) : null;
}

export default function PublicProfilePage() {
  const navigate = useNavigate();
  const { memberId: memberIdParam } = useParams();
  const memberId = Number(memberIdParam);
  const hasValidMemberId = Number.isSafeInteger(memberId) && memberId > 0;
  const [tab, setTab] = useState<ProfileTab>("stamps");
  const [profile, setProfile] = useState<PublicMemberProfile | null>(null);
  const [stamps, setStamps] = useState<PublicMemberStamp[]>([]);
  const [stampPage, setStampPage] = useState(0);
  const [journals, setJournals] = useState<PublicMemberCourse[]>([]);
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
        setStamps(stampResponse);
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

  const stampPages = useMemo(() => {
    const resolvedStamps = stamps.flatMap((stamp) => {
      const StampIcon = STATION_STAMP_MAP[stamp.stationName];
      return StampIcon ? [{ ...stamp, StampIcon }] : [];
    });

    return Array.from(
      { length: Math.ceil(resolvedStamps.length / STAMPS_PER_PAGE) },
      (_, pageIndex) =>
        resolvedStamps.slice(
          pageIndex * STAMPS_PER_PAGE,
          (pageIndex + 1) * STAMPS_PER_PAGE,
        ),
    );
  }, [stamps]);

  const loadMoreJournals = async () => {
    if (!hasNext || !nextCursor || isLoadingMore) return;

    setIsLoadingMore(true);
    setLoadMoreError(null);
    try {
      const response = await getPublicMemberCourses(memberId, nextCursor);
      setJournals((current) => [...current, ...response.courses]);
      setNextCursor(response.nextCursor);
      setHasNext(response.hasNext);
    } catch (error: unknown) {
      setLoadMoreError(
        error instanceof Error
          ? error.message
          : "여행일지를 더 불러오지 못했습니다.",
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleStampDragEnd = (_: unknown, info: PanInfo) => {
    if (
      info.offset.x < -SWIPE_THRESHOLD &&
      stampPage < stampPages.length - 1
    ) {
      setStampPage((page) => page + 1);
    } else if (info.offset.x > SWIPE_THRESHOLD && stampPage > 0) {
      setStampPage((page) => page - 1);
    }
  };

  if (!hasValidMemberId) {
    return <p className="p-6 text-center">올바르지 않은 프로필입니다.</p>;
  }
  if (isLoading) return <p className="p-6 text-center">로딩 중...</p>;
  if (errorMessage) {
    return <p className="p-6 text-center text-primary-60">{errorMessage}</p>;
  }
  if (!profile) return null;

  return (
    <main className="flex h-dvh flex-col overflow-y-auto bg-gray-10 pb-10 pt-[calc(var(--safe-top)+12px)] text-gray-100 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <header className="flex px-[15px] pb-2.5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="이전"
          className="grid size-6 place-items-center"
        >
          <BackIcon className="size-6" aria-hidden="true" />
        </button>
      </header>

      <section className="flex flex-col items-center gap-4">
        {profile.profileImageUrl ? (
          <img
            src={profile.profileImageUrl}
            alt={`${profile.nickname} 프로필`}
            className="size-[70px] rounded-full object-cover"
          />
        ) : (
          <ProfileDefault className="size-[70px]" aria-hidden="true" />
        )}
        <h1 className="text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">
          {profile.nickname}
        </h1>
      </section>

      <section className="flex justify-center pt-4">
        <div className="flex w-[358px] rounded-[36px] bg-gray-30 p-1">
          <button
            type="button"
            onClick={() => setTab("stamps")}
            className={`flex-1 rounded-[28px] py-2 text-subtitle font-semibold ${tab === "stamps" ? "bg-white text-gray-100" : "text-gray-60"}`}
          >
            스탬프
          </button>
          <button
            type="button"
            onClick={() => setTab("journals")}
            className={`flex-1 rounded-[28px] py-2 text-subtitle font-semibold ${tab === "journals" ? "bg-white text-gray-100" : "text-gray-60"}`}
          >
            여행일지
          </button>
        </div>
      </section>

      <section className="mt-[14px] flex justify-center">
        {tab === "stamps" ? (
          stampPages.length === 0 ? (
            <div className="flex h-[484px] w-[348px] flex-col items-center justify-center gap-4 rounded-[36px] bg-white">
              <StampEmpty className="h-[180px] w-[200px]" aria-hidden="true" />
              <p className="text-body-01 text-gray-80">아직 스탬프가 없어요</p>
            </div>
          ) : (
            <div className="flex h-[484px] w-[348px] flex-col items-center gap-4 rounded-[36px] bg-white px-6 pb-3 pt-6">
              <div className="w-[300px] overflow-hidden">
                <motion.div
                  className="flex touch-pan-y"
                  drag="x"
                  dragConstraints={{
                    left: -(stampPages.length - 1) * STAMP_PAGE_WIDTH,
                    right: 0,
                  }}
                  dragElastic={0.2}
                  animate={{ x: -stampPage * STAMP_PAGE_WIDTH }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onDragEnd={handleStampDragEnd}
                >
                  {stampPages.map((page) => (
                    <div
                      key={page[0]?.stationId}
                      className="grid shrink-0 grid-cols-3 grid-rows-4 items-center justify-center gap-3"
                      style={{ width: STAMP_PAGE_WIDTH }}
                    >
                      {page.map(({ stationId, stationName, StampIcon }) => (
                        <StampIcon
                          key={stationId}
                          className="size-[92px]"
                          aria-label={`${stationName} 스탬프`}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="mt-auto flex items-center gap-[7px] p-1 text-body-01 font-semibold">
                <p>
                  <span className="text-gray-70">
                    {String(stampPage + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-[7px] text-gray-50">/</span>
                  <span className="text-gray-50">
                    {String(stampPages.length).padStart(2, "0")}
                  </span>
                </p>
              </div>
            </div>
          )
        ) : journals.length === 0 ? (
          <div className="flex h-[160px] w-[358px] items-center justify-center rounded-lg bg-white">
            <p className="text-body-01 text-gray-70">공개된 여행일지가 없어요</p>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4 px-4">
            <div className="grid grid-cols-3 gap-[5px]">
              {journals.map((journal) => {
                const subwayLine = getSubwayLine(journal.line.code);
                return (
                  <article
                    key={journal.courseId}
                    className="grid h-[160px] overflow-hidden rounded-lg bg-secondary-20 text-left"
                  >
                    <CardDefault
                      className="col-start-1 row-start-1 size-full"
                      aria-hidden="true"
                    />
                    <div className="col-start-1 row-start-1 bg-linear-to-b from-transparent from-50% to-white" />
                    <div className="col-start-1 row-start-1 flex flex-col gap-[9px] self-end px-3 pb-4">
                      <div className="flex items-center gap-1 text-body-02">
                        {subwayLine && <LineBadge line={subwayLine} />}
                        <span>{journal.stationName}</span>
                      </div>
                      <strong className="line-clamp-2 text-body-01 font-semibold leading-[1.4]">
                        {journal.name}
                      </strong>
                    </div>
                  </article>
                );
              })}
            </div>
            {hasNext && (
              <button
                type="button"
                onClick={loadMoreJournals}
                disabled={isLoadingMore}
                className="self-center rounded-lg bg-gray-30 px-4 py-2 text-body-02 disabled:text-gray-60"
              >
                {isLoadingMore ? "불러오는 중..." : "더 보기"}
              </button>
            )}
            {loadMoreError && (
              <p className="text-center text-body-02 text-primary-60">
                {loadMoreError}
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
