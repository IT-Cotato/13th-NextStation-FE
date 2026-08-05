import type { ComponentPropsWithoutRef } from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "./CTAButton";
import Warning from "@/assets/warning.svg?react";
import CloseIcon from '@/assets/close.svg?react';

interface LeadToLoginModalProps extends ComponentPropsWithoutRef<"div"> {
  message: string;
  onClose: () => void;
}

export default function LeadToLoginModal({
  message,
  onClose,
}: LeadToLoginModalProps) {
  const navigate = useNavigate();
  return (
    // 모달 외부 영역
    <div
      role="presentation"
      className="fixed inset-0 z-99 flex w-full h-full items-center justify-center bg-black/30"
    >
      {/* 모달 영역 */}
      <section
        role="dialog"
        className="flex relative flex-col w-[340px] items-end bg-white px-4 pt-4 pb-6 rounded-lg"
      >
        <button
          type="button"
          onClick={onClose}
        >
          <CloseIcon className="size-6"/>
        </button>
        
        <div className="flex flex-col items-center gap-4">
          <Warning className="w-12 h-12" />
          <p className="text-title-02 font-semibold text-center whitespace-pre-line leading-[1.4] tracking-[-0.45px]">
            {message}
          </p>
          <CTAButton
            variant="primary"
            width={300}
            onClick={() => navigate("/auth")}
          >
            로그인하러 가기
          </CTAButton>
        </div>
        
      </section>
    </div>
  );
}
