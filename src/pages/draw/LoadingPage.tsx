import { getAccessToken } from "@/api/auth";
import {
  getCachedMyProfile,
  getMyProfile,
} from "@/api/member";
import { drawRandomStation, RandomDrawNotFoundError } from "@/api/random";
import loadingComplete from "@/assets/lottie/loading-complete.json";
import loadingSearch from "@/assets/lottie/loading-search.json";
import LottieModule, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, type ComponentType, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SEARCH_MIN_LOADING_MS = 4000;
const SEARCH_ANIMATION_SPEED = 1.5;
const COMPLETE_ANIMATION_SPEED = 1;
const Lottie = (
  "default" in LottieModule && typeof LottieModule.default === "function"
    ? LottieModule.default
    : LottieModule
) as ComponentType<Record<string, unknown>>;
type LoadingPhase = "search" | "complete";
type DrawResult = Awaited<ReturnType<typeof drawRandomStation>>;

function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const retryTimeoutRef = useRef<number | null>(null);
  const phaseTimeoutRef = useRef<number | null>(null);
  const searchLottieRef = useRef<LottieRefCurrentProps | null>(null);
  const completeLottieRef = useRef<LottieRefCurrentProps | null>(null);
  const pendingResultRef = useRef<DrawResult | null>(null);
  const searchStartedAtRef = useRef<number>(0);
  const [phase, setPhase] = useState<LoadingPhase>("search");
  const [displayName, setDisplayName] = useState<string | null>(() => {
    const cachedProfile = getCachedMyProfile();
    return cachedProfile?.nickname || null;
  });
  const [isProfileResolved, setIsProfileResolved] = useState(() =>
    Boolean(getCachedMyProfile()?.nickname),
  );
  const isLoggedIn = Boolean(getAccessToken());
  const source = (location.state as { source?: "random" | "recommend" } | null)
    ?.source ?? "random";

  useEffect(() => {
    let isMounted = true;
    searchStartedAtRef.current = Date.now();
    pendingResultRef.current = null;

    const fetchMyProfile = async () => {
      if (!isLoggedIn) {
        setDisplayName(null);
        setIsProfileResolved(true);
        return;
      }

      try {
        const profile = await getMyProfile();

        if (!isMounted) return;

        setDisplayName(profile.nickname || "유저");
      } catch {
        if (!isMounted) return;

        setDisplayName("유저");
      } finally {
        if (isMounted) {
          setIsProfileResolved(true);
        }
      }
    };

    const moveToCompletePhase = () => {
      if (!isMounted || !pendingResultRef.current) return;

      setPhase("complete");
    };

    const scheduleCompletePhase = () => {
      if (!isMounted || !pendingResultRef.current) return;

      const elapsed = Date.now() - searchStartedAtRef.current;
      const remaining = Math.max(0, SEARCH_MIN_LOADING_MS - elapsed);

      if (phaseTimeoutRef.current !== null) {
        window.clearTimeout(phaseTimeoutRef.current);
      }

      if (remaining === 0) {
        moveToCompletePhase();
        return;
      }

      phaseTimeoutRef.current = window.setTimeout(() => {
        moveToCompletePhase();
      }, remaining);
    };

    const requestRandomResult = async () => {
      try {
        const result = await drawRandomStation();
        if (!isMounted) return;

        pendingResultRef.current = result;
        scheduleCompletePhase();
      } catch (error) {
        if (!isMounted) return;

        if (error instanceof RandomDrawNotFoundError) {
          retryTimeoutRef.current = window.setTimeout(() => {
            void requestRandomResult();
          }, 1000);
          return;
        }
      }
    };

    void fetchMyProfile();
    void requestRandomResult();

    return () => {
      isMounted = false;

      if (retryTimeoutRef.current !== null) {
        window.clearTimeout(retryTimeoutRef.current);
      }

      if (phaseTimeoutRef.current !== null) {
        window.clearTimeout(phaseTimeoutRef.current);
      }
    };
  }, [isLoggedIn, navigate, source]);

  const handleCompleteAnimationEnd = () => {
    const result = pendingResultRef.current;
    if (!result) return;

    navigate(`/draw/result`, {
      state: {
        ...result,
        source,
      },
      replace: true,
    });
  };

  const isSearchPhase = phase === "search";

  return (
    <main className="relative flex h-dvh overflow-hidden bg-gray-10 px-8 pt-[var(--safe-top)]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[240px] -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-full">
          <div className="absolute bottom-full left-[-50px] mb-[100px] w-[262px]">
            <h1 className="text-title-01 font-semibold leading-[1.4] tracking-[-0.025em] text-gray-90 text-start">
              {isLoggedIn && isProfileResolved ? (
                <>
                  {displayName}님에게 어울리는 <br />
                  환승역을 지금 찾고 있어요!
                </>
              ) : (
                <>
                  어울리는 <br />
                  환승역을 지금 찾고 있어요!
                </>
              )}
            </h1>
          </div>

          <div className={isSearchPhase ? "w-full" : "mx-auto w-[184px]"}>
            <Lottie
              lottieRef={isSearchPhase ? searchLottieRef : completeLottieRef}
              animationData={isSearchPhase ? loadingSearch : loadingComplete}
              autoplay
              loop={isSearchPhase}
              className="h-auto w-full"
              onDOMLoaded={() => {
                if (isSearchPhase) {
                  searchLottieRef.current?.setSpeed(SEARCH_ANIMATION_SPEED);
                  return;
                }

                completeLottieRef.current?.setSpeed(COMPLETE_ANIMATION_SPEED);
              }}
              onComplete={isSearchPhase ? undefined : handleCompleteAnimationEnd}
              renderer="svg"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoadingPage;
