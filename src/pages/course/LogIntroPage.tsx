import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import CTAButton from "@/components/CTAButton"
import LogIcon from '@/assets/log.svg?react';
import { getJournalWriteInfo } from "@/api/journal";
import type { CourseCompletionResult } from "@/api/savedCourse";
import { formatAcquiredAtToDisplayDate } from "@/utils/logDate";
import { showToast } from "./components/ShowToast";
import { useLogDraft } from "./contexts/LogDraftContext";

function LogIntroPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams();
  const { draft, initializeFromStamp } = useLogDraft();
  const [isInitializing, setIsInitializing] = useState(false);
  const completionResult = location.state as CourseCompletionResult | null;
  const stationName =
    draft.stationName ?? completionResult?.stationName ?? "오늘의 환승역";

  const initializeJournalWriteInfo = async () => {
    if (!completionResult) return false;

    setIsInitializing(true);

    try {
      const writeInfo = await getJournalWriteInfo(completionResult.memberStampId);
      const placeReviews = writeInfo.places
        .slice()
        .sort((a, b) => a.orderNum - b.orderNum)
        .map((place) => ({
          id: place.placeId,
          label: place.placeName,
          review: "",
          photo: null,
        }));

      initializeFromStamp({
        memberStampId: completionResult.memberStampId,
        stationId: completionResult.stationId,
        stationName: writeInfo.stationName,
        acquiredDate: formatAcquiredAtToDisplayDate(completionResult.acquiredAt),
        logName: writeInfo.courseName,
        tags: writeInfo.tags,
        placeReviews,
      });

      return true;
    } catch (error) {
      showToast({
        message:
          error instanceof Error
            ? error.message
            : "여행일지 초기 정보를 불러오지 못했습니다.",
      });
      return false;
    } finally {
      setIsInitializing(false);
    }
  };

  const handleStartLog = async () => {
    const isInitialized =
      !completionResult ||
      (draft.memberStampId === completionResult.memberStampId &&
        draft.placeReviews.length > 0) ||
      (await initializeJournalWriteInfo());

    if (!isInitialized) return;

    navigate(`/course/${courseId}/log/info`);
  };

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-white items-center pt-[var(--safe-top)]">
      <section className="flex h-full flex-col items-center justify-between pt-[100px] pb-[calc(var(--safe-bottom)+10px)]">
        <div className="flex flex-col items-center gap-[60px]">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-headline font-semibold text-gray-100 leading-[1.4] tracking-[-0.025em] text-center">
              오늘의 {stationName}을<br />
              조금 더 오래 기억해볼까요?
            </h1>
            <p className="text-body-01 text-gray-70 leading-[1.4] tracking-[-0.025em] text-center">
              사진과 한 줄 감상을 남기면<br />
              스탬프 뒷면에 오늘의 여행이 저장돼요.
            </p>
          </div>
          <LogIcon className="w-[197px]"/>
        </div>

        {/* CTA Button */}
        <section className="flex flex-col w-full items-center justify-center gap-[10px]">
          <CTAButton
            disabled={isInitializing}
            onClick={() => void handleStartLog()}
          >
            환승여행 기록하기
          </CTAButton>
          <CTAButton variant="secondary" onClick={() => navigate('/course')}>
            다음에 할게요
          </CTAButton>
        </section>
      </section>
    </main>
  )
}
export default LogIntroPage
