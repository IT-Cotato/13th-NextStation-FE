import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CTAButton from "@/components/CTAButton";

function LogVisibilityPage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-white items-center pt-[var(--safe-top)]">
      {/* 수정사항이 있을경우 경고 모달이 떠야함 */}
      <Header showBack showClose onCloseClick={() => navigate('/course')} />

      <section className="absolute bottom-[calc(var(--safe-bottom)+50px)] z-10 flex w-full items-center justify-center">
        <CTAButton onClick={() => navigate(`/course`)}>
          저장하기
        </CTAButton>
      </section>
    </main>
  )
}
export default LogVisibilityPage