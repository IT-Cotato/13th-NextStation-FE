import CTAButton from "@/components/CTAButton";
import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeCourse } from "@/api/savedCourse";
import { useLogDraft } from "../contexts/logDraft";
import { showToast } from "./ShowToast";

interface CompleteConfirmModalProps extends ComponentPropsWithoutRef<"div"> {
  onClose: () => void;
  courseId: number;
  onCompleted: (courseId: number) => void;
}

export default function CompleteConfirmModal({
  onClose,
  courseId,
  onCompleted,
}: CompleteConfirmModalProps) {
  const navigate = useNavigate();
  const { setMemberStampId } = useLogDraft();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await completeCourse(courseId);
      setMemberStampId(result.memberStampId);
      onCompleted(courseId);
      navigate(`/course/${courseId}/stamp`);
    } catch (e) {
      showToast({
        message:
          e instanceof Error ? e.message : "여행 완료 처리에 실패했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-99 flex w-full h-full items-center justify-center bg-black/30"
    >
      <section
        role="dialog"
        className="flex relative flex-col gap-8 w-[340px] items-center bg-white px-5 pt-10 pb-5 rounded-lg"
      >
        {/* text */}
        <div className="flex flex-col gap-2 items-center">
          <span className="text-center text-black text-headline font-semibold leading-[1.4] tracking-[-0.6px]">
            보문역 여행을 <br />
            마치셨나요?
          </span>
          <span className="text-gray-60 text-body-02 leading-[1.4] tracking-[-0.35px]">
            다녀온 역에는 스탬프를 찍을 수 있어요.
          </span>
        </div>

        {/* button */}
        <div className="flex w-[300px] flex-col gap-2">
          <CTAButton
            variant="primary"
            width={300}
            disabled={isSubmitting}
            onClick={handleComplete}
          >
            네, 다녀왔어요
          </CTAButton>
          <CTAButton variant="secondary" width={300} onClick={onClose}>
            아직이에요
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
