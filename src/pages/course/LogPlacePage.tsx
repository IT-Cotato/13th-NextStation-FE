import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import LogConfirmModal from "./components/LogConfirmModal";
import NameEditInput from "./components/NameEditInput";

function LogPlacePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [isLogConfirmOpen, setIsLogConfirmOpen] = useState(false);
  
  const [logName, setLogName] = useState("보문역 환승여행 코스");

  const isDirty =logName !== "보문역 환승여행 코스";

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 items-center pt-[var(--safe-top)]">
      <Header 
        showBack
        showClose
        onCloseClick={() => {
          if (isDirty) {
            setIsLogConfirmOpen(true);
            return;
          }

          navigate("/course");
        }}
      />
      {isLogConfirmOpen && (
        <LogConfirmModal onClose={() => setIsLogConfirmOpen(false)} />
      )}

      <section className="flex flex-col w-[390px] p-5">
        <NameEditInput value={logName} onChange={setLogName} className="border-none"/>
      </section>

      <section className="absolute bottom-[calc(var(--safe-bottom)+50px)] z-10 flex w-full items-center justify-center">
        <CTAButton onClick={() => navigate(`/course/${courseId}/log/visibility`)}>
          다음
        </CTAButton>
      </section>
    </main>
  )
}
export default LogPlacePage