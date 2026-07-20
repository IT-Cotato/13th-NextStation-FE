import type { ComponentPropsWithoutRef } from "react";
import Warning from "@/assets/warning.svg?react";
import ModalButton from "@/components/ModalButton";

interface DeleteConfirmModalProps extends ComponentPropsWithoutRef<"div"> {
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <div
      role="presentation"
      className="fixed inset-0 z-99 flex w-full h-full items-center justify-center bg-black/30"
    >
      <section
        role="dialog"
        className="flex relative flex-col gap-4 w-[340px] items-center bg-white px-4 pt-8 pb-6 rounded-lg"
      >
        <div>
          <Warning className="w-12 h-12" />
        </div>
        <span className="text-black text-title-02 font-semibold">
          저장한 코스를 삭제하시겠습니까?
        </span>
        <div className="flex gap-2">
          <ModalButton variant="secondary" onClick={onClose}>
            아니오
          </ModalButton>
          <ModalButton variant="primary" onClick={onConfirm}>
            예
          </ModalButton>
        </div>
      </section>
    </div>
  );
}
