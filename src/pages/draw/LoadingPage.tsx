import { drawRandomStation, RandomDrawNotFoundError } from "@/api/random";
import { getMyProfile } from "@/api/member";
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const MIN_LOADING_MS = 1500;

function LoadingPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const [displayName, setDisplayName] = useState("유저");

  useEffect(() => {
    let isMounted = true;

    const fetchMyProfile = async () => {
      try {
        const profile = await getMyProfile();

        if (!isMounted) return;

        setDisplayName(profile.nickname || "유저");
      } catch {
        if (!isMounted) return;

        setDisplayName("유저");
      }
    };

    const requestRandomResult = async () => {
      const startedAt = Date.now();

      try {
        setError(null);

        const result = await drawRandomStation();

        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed);

        if (remaining > 0) {
          await new Promise((resolve) => window.setTimeout(resolve, remaining));
        }

        if (!isMounted) return;

        navigate(`/draw/result`, {
          state: result,
          replace: true,
        });
      } catch (error) {
        if (!isMounted) return;

        if (error instanceof RandomDrawNotFoundError) {
          retryTimeoutRef.current = window.setTimeout(() => {
            void requestRandomResult();
          }, 1000);
          return;
        }

        setError("랜덤 뽑기에 실패했어요. 잠시 후 다시 시도해주세요.");
      }
    };

    void fetchMyProfile();
    void requestRandomResult();

    return () => {
      isMounted = false;

      if (retryTimeoutRef.current !== null) {
        window.clearTimeout(retryTimeoutRef.current);
      }
    }
  }, [navigate]);

    return(
    <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 items-center justify-center pt-[var(--safe-top)]">
      <h1 className="text-headline font-semibold text-gray-90 leading-[1.4] tracking-[-0.025em] text-center">
        {displayName}님에게 어울리는 <br />
        환승역을 지금 찾고 있어요!
      </h1>
      {error && (
        <p className="mt-4 text-body-02 text-red-500 text-center">
          {error}
        </p>
      )}
    </main>
  )
}
export default LoadingPage