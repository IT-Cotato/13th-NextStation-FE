import ArrowPrev from '@/assets/arrow-prev.svg?react';

interface AuthTopBarProps {
  title: string;
  onBack?: () => void;
}

export default function AuthTopBar({ title, onBack }: AuthTopBarProps) {
  return (
    <header className="relative flex h-[50px] w-full items-center justify-center">
      <button
        type="button"
        onClick={onBack}
        className="absolute left-[13px] flex size-6 items-center justify-center"
        aria-label="뒤로가기"
      >
        <ArrowPrev className="size-6 [&_path]:stroke-gray-90" />
      </button>

      <h1 className="w-[320px] text-center text-title-02 font-semibold text-gray-90">
        {title}
      </h1>
    </header>
  );
}
