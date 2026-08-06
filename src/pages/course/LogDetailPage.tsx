import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileDefault from "@/assets/profile-default.svg?react";
import coursePhoto from "@/assets/explore/course-photo.svg";
import Header from "@/components/Header";
import LineBadge from "@/components/LineBadge";
import { getJournalDetail, type JournalDetail } from "@/api/journal";
import type { SubwayLine } from "@/types/subway";

const durationLabels = {
  SHORT: "3~4시간",
  HALF_DAY: "반나절",
  FULL_DAY: "하루",
} as const;

export default function LogDetailPage() {
  const navigate = useNavigate();
  const { journalId = "" } = useParams();
  const numericJournalId = Number(journalId);
  const isValidJournalId =
    Number.isInteger(numericJournalId) && numericJournalId > 0;
  const [journal, setJournal] = useState<JournalDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isValidJournalId) return;

    void getJournalDetail(numericJournalId)
      .then(setJournal)
      .catch((cause: unknown) => {
        setError(
          cause instanceof Error
            ? cause.message
            : "여행일지를 불러오지 못했습니다.",
        );
      });
  }, [isValidJournalId, numericJournalId]);

  const displayedError = isValidJournalId
    ? error
    : "올바르지 않은 여행일지입니다.";

  if (displayedError) {
    return (
      <main className="min-h-dvh bg-gray-10 px-[15px] pt-[57px] text-gray-100">
        <Header showBack />
        <p className="pt-20 text-center text-body-01 text-gray-70">
          {displayedError}
        </p>
      </main>
    );
  }

  if (!journal) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-gray-10 text-body-01 text-gray-70">
        여행일지를 불러오는 중...
      </main>
    );
  }

  const images = journal.imageUrls?.length ? journal.imageUrls : [coursePhoto];

  return (
    <main className="min-h-dvh overflow-x-hidden bg-gray-10 pb-10 text-gray-100">
      <header className="flex flex-col gap-6 px-[15px] pt-[57px]">
        <Header showBack />
        <div className="flex items-center gap-3">
          {journal.writerProfileImageUrl ? (
            <img
              className="size-10 rounded-full object-cover"
              src={journal.writerProfileImageUrl}
              alt={`${journal.writerName} 프로필`}
            />
          ) : (
            <ProfileDefault
              className="size-10 rounded-full"
              aria-hidden="true"
            />
          )}
          <div className="flex flex-col gap-1">
            <p className="text-body-01 font-semibold tracking-[-0.025em]">
              {journal.writerName}
            </p>
            <span className="text-caption text-gray-60">
              {journal.traveledAt} · {durationLabels[journal.travelDuration]}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <LineBadge line={journal.line.id as SubwayLine} />
            <span className="text-body-02">{journal.stationName}</span>
          </div>
          <h1 className="text-title-01 font-semibold leading-[1.4]">
            {journal.courseName}
          </h1>
          <div className="flex flex-wrap gap-1">
            {journal.tags.map((tag) => (
              <span
                className="rounded-lg bg-gray-20 px-2 py-1 text-caption text-gray-80"
                key={tag}
              >
                {tag.startsWith("#") ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section
        className="mt-6 flex snap-x gap-3 overflow-x-auto px-[15px] [scrollbar-width:none]"
        aria-label="여행 사진"
      >
        {images.map((imageUrl, index) => (
          <img
            className="h-[240px] w-[88%] shrink-0 snap-center rounded-lg object-cover"
            src={imageUrl}
            alt={journal.imageUrls?.length ? `여행 사진 ${index + 1}` : ""}
            key={`${imageUrl}-${index}`}
          />
        ))}
      </section>

      <section className="flex flex-col gap-3 px-[15px] py-6">
        <div className="flex gap-4 text-caption text-gray-60">
          <span>조회 {journal.viewCount}</span>
          <span>좋아요 {journal.likeCount}</span>
        </div>
        <p className="whitespace-pre-line text-body-01 leading-[1.6]">
          {journal.overallReview}
        </p>
      </section>

      <section className="flex flex-col gap-3 px-[15px]">
        <h2 className="text-title-02 font-semibold">방문한 장소</h2>
        {journal.visitedPlaces
          .slice()
          .sort((a, b) => a.orderNum - b.orderNum)
          .map((place) => (
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg bg-white p-3 text-left"
              onClick={() => navigate(`/place/${place.placeId}`)}
              key={`${place.orderNum}-${place.placeId}`}
            >
              {place.imageUrl ? (
                <img
                  className="size-20 shrink-0 rounded-lg object-cover"
                  src={place.imageUrl}
                  alt=""
                />
              ) : (
                <span className="size-20 shrink-0 rounded-lg bg-primary-20" />
              )}
              <span className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="text-body-01 font-semibold tracking-[-0.025em]">
                  {place.orderNum}. {place.placeName}
                </span>
                {place.review && (
                  <span className="line-clamp-2 text-body-02 text-gray-70">
                    {place.review}
                  </span>
                )}
              </span>
            </button>
          ))}
      </section>
    </main>
  );
}
