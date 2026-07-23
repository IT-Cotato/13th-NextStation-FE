import Header from "@/components/Header"
import ChoiceChip from "@/pages/draw/components/ChoiceChip"
import CTAButton from "@/components/CTAButton"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar, { type Station} from "./components/SearchBar";

const timeOptions = ['30분 이내', '1시간 이내', '상관 없음'];
const companionOptions = ['혼자', '친구와', '연인과', '부모님과', '아이와'];

function ConditionPage() {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedTime, setSelectedTime] = useState<string |null>(null);
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(null);

  const isFormValid =
  selectedStation !== null &&
  selectedTime !== null &&
  selectedCompanion !== null;

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-white items-center pt-[var(--safe-top)]">
      <Header showBack/>

      <section className="flex h-full flex-col items-center justify-between pt-10 pb-[calc(var(--safe-bottom)+10px)]">
        <div className="flex flex-col items-center gap-8">
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
              <SearchBar
                selectedStation={selectedStation}
                onSelectStation={setSelectedStation}
              />
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
        </div>

        <section className='flex w-full items-center justify-center'>
          <CTAButton 
            disabled={!isFormValid}
            onClick={() => navigate('/draw/preference')}
          >
            다음
          </CTAButton>
        </section>
      </section>
    </main>
  )
}
export default ConditionPage
