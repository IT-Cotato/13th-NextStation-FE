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
          className="absolute top-1/2 size-[14px] -translate-x-1/2 -translate-y-1/2 text-primary-50"
          style={{ left: progressWidth }}
        >
          <svg
            viewBox="0 0 14 14"
            className="block size-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0.5C7.86 0.5 8.25 1.9 8.93 2.18C9.64 2.47 10.9 1.76 11.44 2.3C11.99 2.84 11.28 4.11 11.57 4.81C11.85 5.5 13.25 5.89 13.25 6.75C13.25 7.61 11.85 8 11.57 8.69C11.28 9.39 11.99 10.66 11.44 11.2C10.9 11.74 9.64 11.03 8.93 11.32C8.25 11.6 7.86 13 7 13C6.14 13 5.75 11.6 5.07 11.32C4.36 11.03 3.1 11.74 2.56 11.2C2.01 10.66 2.72 9.39 2.43 8.69C2.15 8 0.75 7.61 0.75 6.75C0.75 5.89 2.15 5.5 2.43 4.81C2.72 4.11 2.01 2.84 2.56 2.3C3.1 1.76 4.36 2.47 5.07 2.18C5.75 1.9 6.14 0.5 7 0.5Z"
              fill="currentColor"
              stroke="var(--color-primary-10)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
