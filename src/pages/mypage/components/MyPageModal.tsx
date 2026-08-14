import CTAButton from "@/components/CTAButton";
import type { ComponentPropsWithoutRef } from "react";

interface MyPageModalProps extends ComponentPropsWithoutRef<"div"> {
  content: string;
  subtitle?: string;
  onClose: () => void;
  closeBtnText: string;
  onConfirm: () => void;
  confirmBtnText: string;
}

export default function MyPageModal({
  content,
  subtitle,
  onClose,
  closeBtnText,
  onConfirm,
  confirmBtnText,
}: MyPageModalProps) {
  return (
    <div
      role="presentation"
      className="fixed inset-0 z-99 flex w-full h-full items-center justify-center bg-black/30"
    >
      <section
        role="dialog"
        className="flex relative flex-col gap-8 w-[340px] items-center justify-center bg-white px-5 pt-10 pb-5 rounded-lg"
      >
        <div className="flex flex-col gap-2 justify-center">
          <p className="text-center text-gray-100 text-title-01 font-semibold leading-[1.4] tracking-[-0.6px] whitespace-pre-line">
            {content}
          </p>
          {subtitle && (
            <p className="text-center text-gray-60 text-body-01 leading-[1.4] tracking-[-0.35px]">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col w-[300px] gap-2">
          <CTAButton variant="primary" width={300} onClick={onConfirm}>
            {confirmBtnText}
          </CTAButton>
          <CTAButton variant="secondary" width={300} onClick={onClose}>
            {closeBtnText}
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
