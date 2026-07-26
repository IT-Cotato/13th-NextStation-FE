import ProgressIcon from '@/assets/auth/progress.svg?react';

interface AuthProgressBarProps {
  step: 0 | 1 | 2 | 3 | 4;
  edgeToEdge?: boolean;
}

export default function AuthProgressBar({
  step,
  edgeToEdge = false,
}: AuthProgressBarProps) {
  const progressWidth = `${(step / 4) * 100}%`;
  const markerPosition = step === 0 ? '5px' : progressWidth;

  return (
    <div className="relative h-4 w-full" aria-hidden="true">
      <div
        className={`absolute top-1/2 h-4 -translate-y-1/2 ${
          edgeToEdge ? 'inset-x-0' : 'inset-x-5'
        }`}
      >
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-30" />
        <div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary-50"
          style={{ width: progressWidth }}
        />
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: markerPosition }}
        >
          <ProgressIcon className="block size-[14px]" />
        </div>
      </div>
    </div>
  );
}
