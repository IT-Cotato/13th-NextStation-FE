import BackHeader from "@/components/BackHeader"
import ChoiceChip from "./components/ChoiceChip"
import { useState } from "react";

const timeOptions = ['30분 이내', '1시간 이내', '상관 없음'];
const companionOptions = ['혼자', '친구와', '연인과', '부모님과', '아이와'];

function ConditionPage() {
  const [selectedTime, setSelectedTime] = useState<string |null>(null);
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null);

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-white items-center pt-[var(--safe-top)]">
      <BackHeader/>

      <section className="flex flex-col h-full items-center justify-center gap-8">
        <h1 className="text-headline font-semibold text-gray-100 leading-[1.4] tracking-[-0.025em] text-center">
          어디서, 얼마나, 누구와 <br />
          갈 계획인가요?
        </h1>
        <div className="flex flex-col w-[360px] items-center justify-center gap-10">
          
          {/* 출발역 */}
          <div className="flex flex-col w-full gap-4 items-start">
            <p className="text-subtitle text-gray-100 leading-[1.4] tracking-[-0.025em]">
              출발역은 어디인가요?
            </p>
          </div>

          {/* 시간 */}
          <div className="flex flex-col w-full gap-4 items-start">
            <p className="text-subtitle text-gray-100 leading-[1.4] tracking-[-0.025em]">
              얼마나 걸렸으면 좋겠나요?
            </p>
            <div className="flex w-full items-center gap-[15px]">
              {timeOptions.map((option) => (
                <ChoiceChip
                  key={option}
                  label={option}
                  selected={selectedTime === option}
                  onClick={() => setSelectedTime(option)}
                />
              ))}
            </div>
          </div>

          {/* 누구와 */}
          <div className="flex flex-col w-full gap-4 items-start">
            <p className="text-subtitle text-gray-100 leading-[1.4] tracking-[-0.025em]">
              누구와 가나요?
            </p>
            <div className="flex flex-wrap w-full items-center justify-center gap-[15px]">
              {companionOptions.map((option) => (
                <ChoiceChip
                  key={option}
                  label={option}
                  selected={selectedCompanion === option}
                  onClick={() => setSelectedCompanion(option)}
                />
              ))}
            </div>
          </div>

        </div>


      </section>

      {/* CTA 버튼 */}
      <section className='absolute bottom-[calc(var(--safe-bottom)+50px)] z-10 flex w-full items-center justify-center'>
        <button
          type="button"
          className='flex items-center justify-center w-[360px] h-[60px] py-3 rounded-lg
              bg-linear-to-r from-secondary-50 to-primary-50
              shadow-[0_0_8px_var(--color-secondary-50)]
              active:from-[#EF9E8C] active:to-[#E5989F]
            '
        >
          <h2 className='whitespace-nowrap text-title-02 font-semibold text-gray-10 leading-none tracking-[-0.025em]'>다음</h2>
        </button>
      </section>

    </main>
  )
}
export default ConditionPage