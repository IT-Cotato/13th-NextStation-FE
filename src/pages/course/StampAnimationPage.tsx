import { useEffect, useMemo, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { useLogDraft } from "./contexts/logDraft";
import {
  MOCK_STAMP_ACQUIRED_AT,
  getStationAcquiredDate,
} from "@/utils/logDate";
import { STATION_STAMP_MAP } from "@/constants/stationStampMap";

function StampAnimationPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { draft, setAcquiredDate } = useLogDraft();
  const acquiredDate = getStationAcquiredDate(MOCK_STAMP_ACQUIRED_AT);
  const stationName = "보문역";
  const StampIcon = STATION_STAMP_MAP[stationName] ?? null;
  const shouldReduceMotion = useReducedMotion();
  const stampControls = useAnimationControls();
  const echoControls = useAnimationControls();
  const textControls = useAnimationControls();
  const [showConfetti, setShowConfetti] = useState(false);

  const confettiPieces = useMemo(
    () => [
      { color: "#DB868D", shape: "ribbon", sx: -32, sy: -108, mx: -76, my: -132, dx: -124, dy: -154, drift: -12, driftY: -8, rotate: -18, spin: -110, delay: 0.00, duration: 1.24, fadeAt: 0.82, width: 8, height: 30, radius: 999 },
      { color: "#F1B24A", shape: "dot", sx: 2, sy: -120, mx: -10, my: -156, dx: -18, dy: -188, drift: 6, driftY: 12, rotate: 8, spin: 62, delay: 0.12, duration: 1.52, fadeAt: 0.9, width: 12, height: 12, radius: 999 },
      { color: "#7AB6A1", shape: "ribbon", sx: 40, sy: -108, mx: 76, my: -136, dx: 122, dy: -158, drift: 10, driftY: -6, rotate: -10, spin: 104, delay: 0.18, duration: 1.32, fadeAt: 0.84, width: 7, height: 28, radius: 999 },
      { color: "#58A6FF", shape: "ticket", sx: 104, sy: -32, mx: 138, my: -48, dx: 170, dy: -76, drift: 12, driftY: 18, rotate: 12, spin: 88, delay: 0.08, duration: 1.62, fadeAt: 0.92, width: 9, height: 26, radius: 3 },
      { color: "#A78BFA", shape: "diamond", sx: 108, sy: 24, mx: 146, my: 26, dx: 182, dy: 30, drift: 16, driftY: 24, rotate: -24, spin: 148, delay: 0.26, duration: 1.34, fadeAt: 0.8, width: 12, height: 12, radius: 3 },
      { color: "#FF7A59", shape: "ribbon", sx: 72, sy: 88, mx: 94, my: 116, dx: 128, dy: 150, drift: 12, driftY: 28, rotate: 18, spin: 112, delay: 0.22, duration: 1.46, fadeAt: 0.86, width: 8, height: 26, radius: 999 },
      { color: "#34D399", shape: "strip", sx: -72, sy: 90, mx: -96, my: 118, dx: -148, dy: 150, drift: -14, driftY: 26, rotate: 16, spin: 96, delay: 0.30, duration: 1.44, fadeAt: 0.88, width: 24, height: 9, radius: 999 },
      { color: "#FBBF24", shape: "dot", sx: -110, sy: 24, mx: -146, my: 28, dx: -182, dy: 38, drift: -12, driftY: 18, rotate: -18, spin: -72, delay: 0.14, duration: 1.22, fadeAt: 0.78, width: 11, height: 11, radius: 999 },
      { color: "#FB7185", shape: "ribbon", sx: -84, sy: -82, mx: -110, my: -102, dx: -142, dy: -126, drift: -12, driftY: -2, rotate: -6, spin: -92, delay: 0.10, duration: 1.5, fadeAt: 0.9, width: 7, height: 26, radius: 999 },
      { color: "#2DD4BF", shape: "ribbon", sx: 84, sy: -82, mx: 116, my: -106, dx: 150, dy: -130, drift: 12, driftY: 4, rotate: 8, spin: 98, delay: 0.24, duration: 1.56, fadeAt: 0.88, width: 7, height: 26, radius: 999 },
      { color: "#F97316", shape: "ticket", sx: -16, sy: -116, mx: -42, my: -166, dx: -76, dy: -212, drift: -8, driftY: 10, rotate: -20, spin: -132, delay: 0.04, duration: 1.68, fadeAt: 0.94, width: 7, height: 32, radius: 3 },
      { color: "#22C55E", shape: "ticket", sx: 24, sy: -112, mx: 52, my: -162, dx: 90, dy: -204, drift: 8, driftY: 8, rotate: 18, spin: 128, delay: 0.28, duration: 1.38, fadeAt: 0.82, width: 7, height: 32, radius: 3 },
      { color: "#E879F9", shape: "strip", sx: 114, sy: -4, mx: 154, my: -8, dx: 202, dy: -14, drift: 18, driftY: 14, rotate: 26, spin: 86, delay: 0.36, duration: 1.3, fadeAt: 0.76, width: 22, height: 8, radius: 999 },
      { color: "#38BDF8", shape: "strip", sx: -116, sy: -6, mx: -154, my: -12, dx: -202, dy: -18, drift: -18, driftY: 20, rotate: -24, spin: -84, delay: 0.20, duration: 1.58, fadeAt: 0.9, width: 22, height: 8, radius: 999 },
    ],
    [],
  );

  const getConfettiPieceStyle = (piece: (typeof confettiPieces)[number]) => {
    const base = {
      width: `${piece.width}px`,
      height: `${piece.height}px`,
      boxShadow: `0 0 0 1px ${piece.color}22`,
    } as const;

    if (piece.shape === "diamond") {
      return {
        ...base,
        background: `linear-gradient(135deg, rgba(255,255,255,0.92) 0%, ${piece.color} 40%, color-mix(in srgb, ${piece.color} 74%, black) 100%)`,
        borderRadius: "2px",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      };
    }

    if (piece.shape === "ticket") {
      return {
        ...base,
        background: `linear-gradient(180deg, rgba(255,255,255,0.9) 0%, ${piece.color} 22%, color-mix(in srgb, ${piece.color} 76%, black) 100%)`,
        borderRadius: `${piece.radius}px`,
        clipPath: "polygon(18% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%, 0% 18%)",
      };
    }

    if (piece.shape === "strip") {
      return {
        ...base,
        background: `linear-gradient(90deg, rgba(255,255,255,0.82) 0%, ${piece.color} 28%, color-mix(in srgb, ${piece.color} 78%, black) 100%)`,
        borderRadius: `${piece.radius}px`,
      };
    }

    if (piece.shape === "ribbon") {
      return {
        ...base,
        background: `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, ${piece.color} 18%, color-mix(in srgb, ${piece.color} 84%, black) 100%)`,
        borderRadius: `${piece.radius}px`,
      };
    }

    return {
      ...base,
      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95) 0%, ${piece.color} 52%, color-mix(in srgb, ${piece.color} 78%, black) 100%)`,
      borderRadius: `${piece.radius}px`,
    };
  };

  useEffect(() => {
    if (draft.acquiredDate !== acquiredDate) {
      setAcquiredDate(acquiredDate);
    }
  }, [acquiredDate, courseId, draft.acquiredDate, navigate, setAcquiredDate]);

  useEffect(() => {
    let isCancelled = false;
    let navigationTimer: number | null = null;
    let confettiTimer: number | null = null;

    const runAnimation = async () => {
      if (shouldReduceMotion) {
        setShowConfetti(true);
        navigationTimer = window.setTimeout(() => {
          if (!isCancelled) {
            navigate(`/course/${courseId ?? ""}/log`);
          }
        }, 1200);
        return;
      }

      confettiTimer = window.setTimeout(() => {
        if (!isCancelled) {
          setShowConfetti(true);
        }
      }, 140);

      await Promise.all([
        textControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: "easeOut" },
        }),
        stampControls.start({
          scale: [0.48, 1.16, 0.92, 1.03, 1],
          rotate: [-10, 6, -4, 2, 0],
          opacity: [0, 1, 1, 1, 1],
          filter: [
            "drop-shadow(0 0 0 rgba(219, 134, 141, 0))",
            "drop-shadow(0 22px 26px rgba(219, 134, 141, 0.24))",
            "drop-shadow(0 14px 18px rgba(219, 134, 141, 0.18))",
            "drop-shadow(0 12px 14px rgba(219, 134, 141, 0.14))",
            "drop-shadow(0 10px 12px rgba(219, 134, 141, 0.10))",
          ],
          transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
        }),
        echoControls.start({
          scale: [0.56, 1.3, 1.56],
          opacity: [0.38, 0.22, 0],
          transition: { duration: 0.72, times: [0, 0.45, 1], ease: "easeOut" },
        }),
      ]);

      if (isCancelled) {
        return;
      }

      navigationTimer = window.setTimeout(() => {
        if (!isCancelled) {
          navigate(`/course/${courseId ?? ""}/log`);
        }
      }, 1800);
    };

    runAnimation();

    return () => {
      isCancelled = true;
      if (confettiTimer !== null) {
        window.clearTimeout(confettiTimer);
      }
      if (navigationTimer !== null) {
        window.clearTimeout(navigationTimer);
      }
    };
  }, [courseId, navigate, shouldReduceMotion, stampControls, echoControls, textControls]);


  return (
     <main className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-primary-10 via-white to-secondary-20 pt-[var(--safe-top)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_42%),radial-gradient(circle_at_bottom,_rgba(219,134,141,0.14),_transparent_38%)]" />

      <motion.div
        className="z-10 flex flex-col items-center justify-center gap-2"
        initial={{ opacity: 0, y: 12 }}
        animate={textControls}
      >
        <h1 className="text-center text-headline font-semibold leading-[1.4] tracking-[-0.025em] text-gray-90">
          {stationName} 스탬프 획득!
        </h1>
        <p className="text-center text-body-01 leading-[1.4] tracking-[-0.025em] text-gray-70">
          오늘의 환승여행이 내 기록에 저장되었어요
        </p>
      </motion.div>
      
      <div className="relative z-10 mt-20 flex h-[250px] w-[250px] items-center justify-center">
        {showConfetti ? (
          <div className="pointer-events-none absolute -inset-20 overflow-visible">
            {confettiPieces.map((piece, index) => (
              <motion.span
                key={`${piece.color}-${index}`}
                className="absolute left-1/2 top-1/2 block"
                style={getConfettiPieceStyle(piece)}
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  x: `calc(-50% + ${piece.sx}px)`,
                  y: `calc(-50% + ${piece.sy}px)`,
                  rotate: piece.rotate,
                }}
                animate={{
                  opacity: [0, 0.9, 0.76, 0.44, 0.12, 0],
                  scale: [0.22, 1, 0.96, 0.9, 0.82, 0.72],
                  x: [
                    `calc(-50% + ${piece.sx}px)`,
                    `calc(-50% + ${piece.mx * 0.84}px)`,
                    `calc(-50% + ${piece.mx}px)`,
                    `calc(-50% + ${piece.dx + piece.drift * 0.4}px)`,
                    `calc(-50% + ${piece.dx + piece.drift}px)`,
                  ],
                  y: [
                    `calc(-50% + ${piece.sy}px)`,
                    `calc(-50% + ${piece.my * 0.86}px)`,
                    `calc(-50% + ${piece.my}px)`,
                    `calc(-50% + ${piece.dy - piece.driftY}px)`,
                    `calc(-50% + ${piece.dy}px)`,
                  ],
                  rotate: [
                    piece.rotate,
                    piece.rotate + piece.spin * 0.24,
                    piece.rotate + piece.spin * 0.56,
                    piece.rotate + piece.spin * 0.84,
                    piece.rotate + piece.spin,
                  ],
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  times: [0, 0.14, 0.38, piece.fadeAt - 0.12, piece.fadeAt, 1],
                  ease: "easeOut",
                }}
              >
                {piece.shape === "ribbon" ? (
                  <>
                    <span
                      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-85"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.18) 44%, rgba(255,255,255,0) 100%)",
                        transform: "skewY(-10deg)",
                        transformOrigin: "top center",
                      }}
                    />
                    <span
                      className="pointer-events-none absolute left-1/2 top-[10%] h-[38%] w-[70%] -translate-x-1/2 rounded-full opacity-45"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.18) 62%, transparent 100%)",
                        transform: "rotate(18deg)",
                      }}
                    />
                  </>
                ) : null}
                {piece.shape === "ticket" ? (
                  <span
                    className="pointer-events-none absolute inset-[14%] opacity-60"
                    style={{
                      border: "1px dashed rgba(255,255,255,0.42)",
                      clipPath: "polygon(18% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%, 0% 18%)",
                    }}
                  />
                ) : null}
              </motion.span>
            ))}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-30/25 blur-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.85, 0], scale: [0.5, 1.04, 1.18] }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        ) : null}
        <motion.div
          className="absolute inset-0 rounded-full bg-secondary-30/30 blur-2xl"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={echoControls}
        />
        <motion.div
          className="absolute inset-5 rounded-full border border-white/70 bg-white/35 blur-sm"
          initial={{ opacity: 0, scale: 0.82 }}
          animate={echoControls}
          transition={{ delay: 0.06 }}
        />
        <motion.div
          className="relative flex h-full w-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.48, rotate: -10 }}
          animate={stampControls}
        >
          {StampIcon ? <StampIcon className="h-full w-full" /> : null}
        </motion.div>
      </div>

    </main>
  )
}

export default StampAnimationPage
