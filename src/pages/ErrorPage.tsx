import ErrorIcon from "@/assets/error.svg?react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className="flex h-dvh items-center justify-center bg-gray-10 px-6 pt-[var(--safe-top)] pb-[var(--safe-bottom)]">
      <div className="flex flex-col items-center text-center">
        <ErrorIcon className="h-auto w-50" />
        <div className="flex flex-col items-center gap-4">
          <p className="text-subtitle text-gray-80 text-center">
            일시적인 오류가 발생했습니다.<br />
            메인 홈으로 돌아가 다시 시도해주세요.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/main`)}
            className="inline-flex items-center justify-center rounded-lg bg-secondary-10 hover:bg-secondary-20 px-3 py-2 text-body-01 text-primary-60"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </main>
  );
}
