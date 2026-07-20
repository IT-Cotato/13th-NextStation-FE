import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLogDraft } from "./contexts/logDraft";
import {
  MOCK_STAMP_ACQUIRED_AT,
  getStationAcquiredDate,
} from "@/utils/logDate";
import { STATION_STAMP_MAP } from "@/constants/stationStampMap";

function StampAcquiredPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { draft, setAcquiredDate } = useLogDraft();
  const acquiredDate = getStationAcquiredDate(MOCK_STAMP_ACQUIRED_AT);
  const stationName = "보문역";
  const StampIcon = STATION_STAMP_MAP[stationName] ?? null;

  useEffect(() => {
    if (draft.acquiredDate !== acquiredDate) {
      setAcquiredDate(acquiredDate);
    }

    const timer = window.setTimeout(() => {
      navigate(`/course/${courseId}/log`);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [acquiredDate, courseId, draft.acquiredDate, navigate, setAcquiredDate]);


  return (
     <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 items-center justify-center pt-[var(--safe-top)] gap-20">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-headline font-semibold text-gray-90 leading-[1.4] tracking-[-0.025em] text-center">
          {stationName} 스탬프 획득!
        </h1>
        <p className="text-body-01 text-gray-70 leading-[1.4] tracking-[-0.025em] text center">
          오늘의 환승여행이 내 기록에 저장되었어요
        </p>
      </div>
      
      <div className="flex h-[250px] w-[250px] items-center justify-center">
        {StampIcon ? <StampIcon className="h-full w-full" /> : null}
      </div>

    </main>
  )
}

export default StampAcquiredPage
