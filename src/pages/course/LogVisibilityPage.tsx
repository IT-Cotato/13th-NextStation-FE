import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";
import LogConfirmModal from "./components/LogConfirmModal";

function LogVisibilityPage() {
  const navigate = useNavigate();
  const [isLogConfirmOpen, setIsLogConfirmOpen] = useState(false);

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 items-center pt-[var(--safe-top)]">
      <Header 
        showBack
        showClose
        onCloseClick={() => setIsLogConfirmOpen(true)}
      />
      {isLogConfirmOpen && (
        <LogConfirmModal onClose={() => setIsLogConfirmOpen(false)} />
      )}

      <section className="absolute bottom-[calc(var(--safe-bottom)+50px)] z-10 flex w-full items-center justify-center">
        <CTAButton onClick={() => navigate(`/course`)}>
          저장하기
        </CTAButton>
      </section>
    </main>
  )
}
export default LogVisibilityPage