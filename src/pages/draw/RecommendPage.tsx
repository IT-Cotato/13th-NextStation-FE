import Header from "@/components/Header"
import BackVector from '@/assets/BackVector.svg?react';
import StampGongneung from '@/assets/stamp/stamp-gongneung.svg?react';
import StampMajang from '@/assets/stamp/stamp-majang.svg?react';
import StampBomun from '@/assets/stamp/stamp-bomun.svg?react';
import { useNavigate } from "react-router-dom";
import CTAButton from "../../components/CTAButton";

function RecommendPage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-white items-center pt-[var(--safe-top)]">
      <Header showBack />
      <section className='flex flex-col h-full items-center pt-[100px] gap-6'>
        <h1 className="text-headline font-semibold text-gray-100 leading-[1.4] tracking-[-0.025em] text-center">
          00님에게 어울리는 역을 <br />
          추천해 드려요!
        </h1>
        <div className="relative size-[390px]">
          <BackVector className="absolute inset-0 size-full"/>

          <div className="absolute left-[35px] top-[20px] size-[206px] rotate-[-3.97deg]">
            <StampGongneung className="size-full" />
          </div>

          <div className="absolute right-[25px] top-[150px] size-[148px] rotate-[13.88deg]">
            <StampMajang className="size-full" />
          </div>

          <div className="absolute left-[80px] bottom-[20px] size-[137px] rotate-[-1.36deg]">
            <StampBomun className="size-full" />
          </div>
        </div>

      </section>

      <section className='absolute bottom-[calc(var(--safe-bottom)+50px)] z-10 flex w-full items-center justify-center'>
        <CTAButton onClick={() => navigate('/draw/condition')}>
          1분 만에 여행 준비 완료!
        </CTAButton>
      </section>
    </main>
  )
}

export default RecommendPage