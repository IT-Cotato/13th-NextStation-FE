import CTAButton from "@/components/CTAButton";
import Header from "@/components/Header";
import CourseSaved from "@/assets/course-saved.svg?react";
import { useNavigate } from "react-router-dom";
import share from "@/utils/share";
import { showToast } from "./components/ShowToast";

export default function SavedPage() {
  const navigate = useNavigate();

  const handleShareClikc = async () => {
    const result = await share({
      title: "환승여행",
      text: "보문역 환승여행 코스를 확인해보세요!",
      url: "http://172.30.1.48:5173/course/verify",
    });

    if (result === "copiedToClipboard") {
      showToast({ message: "클립보드에 복사되었습니다!" });
    } else if (result === "failed") {
      // 링크 복사 실패 토스트
      showToast({ message: "링크 복사에 실패했습니다." });
    }
  };

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-white gap-8 pt-[calc(var(--safe-top)+12px)] items-center">
      <Header showClose onCloseClick={() => navigate("/")} />

      <section className="flex flex-1 items-center">
        <div className="flex flex-col items-center justify-center gap-[32.27px]">
          <CourseSaved className="w-[129.73px] h-[129.73px]" />
          <p className="text-gray-100 text-headline font-semibold text-center">
            보관함에
            <br />
            저장이 완료됐어요!
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 pb-[10px]">
        <span className="text-gray-70 text-body-01 text-center">
          같이 떠날 친구에게 코스를 공유해 보세요!
        </span>
        <div className="flex flex-col gap-[10px]">
          <CTAButton onClick={handleShareClikc}>공유하기</CTAButton>
          <CTAButton variant="secondary" onClick={() => navigate("/course")}>
            보관함으로 이동하기
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
