import type { ComponentType } from "react";
import LottieModule from "lottie-react";
import loadingAnimation from "@/assets/lottie/base-loading.json";

const Lottie = (
  "default" in LottieModule && typeof LottieModule.default === "function"
    ? LottieModule.default
    : LottieModule
) as ComponentType<Record<string, unknown>>;

export default function BaseLoading() {
  return (
    <main className="flex h-dvh items-center justify-center bg-gray-10 px-6 pt-[var(--safe-top)] pb-[var(--safe-bottom)]">
      <div className="w-[184px]">
        <Lottie
          animationData={loadingAnimation}
          autoplay
          loop
          renderer="svg"
          className="h-auto w-full"
        />
      </div>
    </main>
  );
}
