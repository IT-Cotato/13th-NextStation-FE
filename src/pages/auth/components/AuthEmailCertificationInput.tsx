import type { InputHTMLAttributes } from 'react';

interface AuthEmailCertificationInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  buttonLabel?: string;
  buttonTone?: 'default' | 'active';
  errorMessage?: string;
  onCertificationClick?: () => void;
}

export default function AuthEmailCertificationInput({
  buttonLabel = '인증하기',
  buttonTone = 'default',
  errorMessage,
  onCertificationClick,
  className = '',
  ...props
}: AuthEmailCertificationInputProps) {
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
        </div>
        <button
          type="button"
          onClick={onCertificationClick}
          className={`flex h-[50px] w-[60px] shrink-0 items-center justify-center rounded-lg px-2 text-body-02 font-regular leading-[1.4] ${
            buttonTone === 'active'
              ? 'bg-primary-50 text-gray-10'
              : 'bg-gray-30 text-gray-70'
          }`}
        >
          {buttonLabel}
        </button>
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
