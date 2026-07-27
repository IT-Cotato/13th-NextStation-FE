import { useEffect, useRef, type ComponentType } from "react";
import LottieModule, { type LottieRefCurrentProps } from "lottie-react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { useLogDraft } from "./contexts/logDraft";
import {
  MOCK_STAMP_ACQUIRED_AT,
  getStationAcquiredDate,
} from "@/utils/logDate";
import { STATION_STAMP_MAP } from "@/constants/stationStampMap";
import confettiLess from "@/assets/lottie/confetti-less.json";

const Lottie = (
  "default" in LottieModule && typeof LottieModule.default === "function"
    ? LottieModule.default
    : LottieModule
) as ComponentType<Record<string, unknown>>;

function StampLessPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { draft, setAcquiredDate } = useLogDraft();
  const acquiredDate = getStationAcquiredDate(MOCK_STAMP_ACQUIRED_AT);
  const stationName = "보문역";
  const StampIcon = STATION_STAMP_MAP[stationName] ?? null;
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (draft.acquiredDate !== acquiredDate) {
      setAcquiredDate(acquiredDate);
    }
  }, [acquiredDate, draft.acquiredDate, setAcquiredDate]);

  const handleComplete = () => {
    navigate(`/course/${courseId ?? ""}/log`);
  };

  return (
    <main className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-primary-10 via-white to-secondary-20 pt-[var(--safe-top)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.88),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(219,134,141,0.16),_transparent_42%)]" />

      <div className="z-10 flex flex-col items-center justify-center gap-2">
        <h1 className="text-center text-headline font-semibold leading-[1.4] tracking-[-0.025em] text-gray-90">
          {stationName} 스탬프 획득!
        </h1>
        <p className="text-center text-body-01 leading-[1.4] tracking-[-0.025em] text-gray-70">
          오늘의 환승여행이 내 기록에 저장되었어요
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <Lottie
          lottieRef={lottieRef}
          animationData={confettiLess}
          loop={false}
          autoplay
          onDOMLoaded={() => lottieRef.current?.setSpeed(1.1)}
          onComplete={handleComplete}
          className="h-full w-full scale-[1.12]"
          renderer="svg"
        />
      </div>

      <div className="relative z-20 mt-14 flex h-[300px] w-[300px] items-center justify-center">
        <motion.div
          className="absolute inset-[42px] rounded-full bg-secondary-30/20 blur-2xl"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: [0, 0.36, 0.16], scale: [0.72, 1.01, 0.96] }}
          transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="relative flex h-[250px] w-[250px] items-center justify-center"
          initial={{ scale: 0.46, rotate: -8, opacity: 0 }}
          animate={{
            scale: [0.46, 1.14, 0.93, 1.02, 1],
            rotate: [-8, 5, -3, 1, 0],
            opacity: 1,
          }}
          transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
        >
          {StampIcon ? <StampIcon className="h-full w-full" /> : null}
        </motion.div>
      </div>
    </main>
  );
}

export default StampLessPage;
