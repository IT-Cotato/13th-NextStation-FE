import { useNavigate, useParams } from "react-router-dom"
import CTAButton from "@/components/CTAButton"
import LogIcon from '@/assets/log.svg?react';
import { useLogDraft } from "./contexts/LogDraftContext";

function LogIntroPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { draft } = useLogDraft();
  const stationName = draft.stationName ?? "오늘의 환승역";

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
          <CTAButton onClick={() => navigate(`/course/${courseId}/log/info`)}>
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
