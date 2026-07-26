import type { InputHTMLAttributes } from 'react';

interface AuthCodeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  timer?: string;
  errorMessage?: string;
  showButton?: boolean;
  buttonLabel?: string;
  buttonTone?: 'default' | 'active';
  onButtonClick?: () => void;
}

export default function AuthCodeInput({
  timer = '3:00',
  errorMessage,
  showButton = false,
  buttonLabel = '확인',
  buttonTone = 'default',
  onButtonClick,
  className = '',
  ...props
}: AuthCodeInputProps) {
  const hasValue = props.value !== undefined && String(props.value).length > 0;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-start gap-[10px]">
        <div
          className={`flex h-[50px] min-w-0 flex-1 items-center rounded-lg border px-4 py-3 focus-within:border-primary-50 focus-within:bg-white ${
            hasValue || errorMessage
              ? 'border-primary-50 bg-white'
              : 'border-transparent bg-gray-20'
          } ${className}`}
        >
          <input
            aria-invalid={Boolean(errorMessage)}
            className="min-w-0 flex-1 bg-transparent text-body-01 font-regular leading-[1.4] text-gray-70 placeholder:text-gray-70 focus:outline-none"
            {...props}
          />
          <span className="ml-3 shrink-0 text-body-02 font-regular leading-none text-primary-60">
            {timer}
          </span>
        </div>
        {showButton && (
          <button
            type="button"
            onClick={onButtonClick}
            className={`flex h-[50px] w-[60px] shrink-0 items-center justify-center rounded-lg px-2 text-body-02 font-regular leading-[1.4] ${
              buttonTone === 'active'
                ? 'bg-primary-50 text-gray-10'
                : 'bg-gray-30 text-gray-70'
            }`}
          >
            {buttonLabel}
          </button>
        )}
      </div>
      {errorMessage && (
        <span className="flex items-start gap-[5px] text-body-01 font-regular leading-[1.4] text-primary-60">
          <span className="mt-[1px] flex size-4 shrink-0 items-center justify-center rounded-full border border-primary-60 text-caption font-regular leading-none">
            !
          </span>
          <span>{errorMessage}</span>
        </span>
      )}
    </div>
  );
}
