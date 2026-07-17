import { useNavigate, useParams } from "react-router-dom";
import CTAButton from "@/components/CTAButton";
import Header from "@/components/Header"

function LogInfoPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <main className="flex flex-col bg-white items-center pt-[var(--safe-top)]">
      {/* 수정사항이 있을경우 경고 모달이 떠야함 */}
      <Header showClose onCloseClick={() => navigate('/course')} />

      <section className="absolute bottom-[calc(var(--safe-bottom)+50px)] z-10 flex w-full items-center justify-center">
        <CTAButton onClick={() => navigate(`/course/${courseId}/log/place`)}>
          다음
        </CTAButton>
      </section>
    </main>
  )
}
export default LogInfoPage