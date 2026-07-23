import ProgressIcon from '@/assets/auth/progress.svg?react';

interface AuthProgressBarProps {
  step: 1 | 2 | 3 | 4;
}

export default function AuthProgressBar({ step }: AuthProgressBarProps) {
  const progressWidth = `${(step / 4) * 100}%`;

  return (
    <div className="relative h-4 w-full" aria-hidden="true">
      <div className="absolute inset-x-5 top-1/2 h-4 -translate-y-1/2">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-30" />
        <div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary-50"
          style={{ width: progressWidth }}
        />
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: progressWidth }}
        >
          <ProgressIcon className="block size-[14px]" />
        </div>
      </div>
    </div>
  );
}
