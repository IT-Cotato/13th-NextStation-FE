import CTAButton from "@/components/CTAButton";
import Header from "@/components/Header";
import CourseSaved from "@/assets/course-saved.svg?react";
import { useNavigate } from "react-router-dom";

export default function SavedPage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-white gap-8 pt-[calc(var(--safe-top)+12px)] items-center">
      <Header showClose onCloseClick={() => navigate("/")} />

      <section className="pt-[144px] flex flex-col items-center gap-[32.27px]">
        <CourseSaved className="w-[129.73px] h-[129.73px]" />
        <p className="text-gray-100 text-headline font-semibold text-center">
          보관함에
          <br />
          저장이 완료됐어요!
        </p>
      </section>

      <section className="pt-[200px] flex flex-col gap-[10px]">
        <CTAButton>공유하기</CTAButton>
        <CTAButton variant="secondary" onClick={() => navigate("/course")}>
          보관함으로 이동하기
        </CTAButton>
      </section>
    </main>
  );
}
