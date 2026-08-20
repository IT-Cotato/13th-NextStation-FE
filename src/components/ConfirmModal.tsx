import Warning from "@/assets/warning.svg?react";
import type { ComponentPropsWithoutRef } from "react";
import ModalButton from "./ModalButton";

interface ConfirmModalProps extends ComponentPropsWithoutRef<"div"> {
  message: string;
  subtitle?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  message,
  subtitle,
  leftButtonText,
  rightButtonText,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    // 모달 외부 영역
    <div
      role="presentation"
      className="fixed inset-0 z-99 flex w-full h-full items-center justify-center bg-black/30"
    >
      {/* 모달 영역 */}
      <section
        role="dialog"
        className="flex relative flex-col gap-4 w-[340px] items-center bg-white px-4 pt-8 pb-6 rounded-lg"
      >
        <Warning className="w-12 h-12" />
        <div className="flex flex-col gap-4 justify-center">
          <p className="text-title-02 font-semibold text-center whitespace-pre-line leading-[1.4] tracking-[-0.45px]">
            {message}
          </p>
          {subtitle && (
            <p className="whitespace-pre-line text-center text-body-02 leading-[1.4] tracking-[-0.3px] text-gray-60">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <ModalButton variant="secondary" onClick={onClose}>
            {leftButtonText ? leftButtonText : "아니오"}
          </ModalButton>
          <ModalButton variant="primary" onClick={onConfirm}>
            {rightButtonText ? rightButtonText : "예"}
          </ModalButton>
        </div>
      </section>
    </div>
  );
}
