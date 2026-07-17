import { useNavigate, useParams } from "react-router-dom"
import CTAButton from "@/components/CTAButton"
import LogIcon from '@/assets/log.svg?react';

function LogIntroPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-white items-center pt-[var(--safe-top)]">
      <section className="flex flex-col h-full items-center pt-[200px] gap-[60px]">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* 역이름 변경 필요 */}
          <h1 className="text-headline font-semibold text-gray-100 leading-[1.4] tracking-[-0.025em] text-center">
            오늘의 보문역을<br />
            조금 더 오래 기억해볼까요?
          </h1>
          <p className="text-body-01 text-gray-70 leading-[1.4] tracking-[-0.025em] text-center">
            사진과 한 줄 감상을 남기면<br />
            스탬프 뒷면에 오늘의 여행이 저장돼요.
          </p>
        </div>
        <LogIcon className="w-[197px]"/>

      </section>

      {/* CTA Button */}
      <section className="absolute bottom-[calc(var(--safe-bottom)+50px)] z-10 flex flex-col w-full items-center justify-center gap-[10px]">
        <CTAButton onClick={() => navigate(`/course/${courseId}/log/info`)}>
          환승여행 기록하기
        </CTAButton>
        <CTAButton variant="secondary" onClick={() => navigate('/course')}>
          다음에 할게요
        </CTAButton>
      </section>
    </main>
  )
}
export default LogIntroPage