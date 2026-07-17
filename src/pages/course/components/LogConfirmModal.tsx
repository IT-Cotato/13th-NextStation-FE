import Warning from "@/assets/warning.svg?react";
import OptionButton from "@/components/ModalButton";
import type { ComponentPropsWithoutRef } from "react";
import { useNavigate } from "react-router-dom";

interface ExitConfirmModalProps extends ComponentPropsWithoutRef<"div"> {
  onClose: () => void;
}

export default function ExitConfirmModal({ onClose }: ExitConfirmModalProps) {
  const navigate = useNavigate();

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-99 flex w-full h-full items-center justify-center bg-black/30"
    >
      <section
        role="dialog"
        className="flex relative flex-col gap-4 w-[340px] items-center bg-white px-4 pt-8 pb-6 rounded-lg"
      >
        <Warning className="w-12 h-12" />
        <p className="text-title-02 font-semibold">
          해당 기록은 저장되지 않습니다. <br />
          저장하지 않고 나가시겠습니까?
        </p>
        <div className="flex gap-2">
          <OptionButton variant="secondary" onClick={onClose}>
            아니오
          </OptionButton>
          <OptionButton variant="primary" onClick={() => navigate("/course")}>
            예
          </OptionButton>
        </div>
      </section>
    </div>
  );
}