import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

interface AuthCodeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  timer?: string;
  errorMessage?: string;
}

export default function AuthCodeInput({
  timer = '3:00',
  errorMessage,
  className = '',
  ...props
}: AuthCodeInputProps) {
  const generatedId = useId();
  const inputId = props.id ?? generatedId;
  const errorMessageId = `${inputId}-error`;
  const hasValue = props.value !== undefined && String(props.value).length > 0;

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className={`flex h-[50px] w-full items-center rounded-[20px] border px-4 py-3 focus-within:border-primary-50 focus-within:bg-white ${
          hasValue || errorMessage
            ? 'border-primary-50 bg-white'
            : 'border-transparent bg-gray-20'
        } ${className}`}
      >
        <input
          {...props}
          id={inputId}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={errorMessage ? errorMessageId : undefined}
          className="min-w-0 flex-1 bg-transparent text-body-01 font-regular leading-[1.4] text-gray-70 placeholder:text-gray-70 focus:outline-none"
        />
        <span className="ml-3 shrink-0 text-body-02 font-regular leading-none text-primary-60">
          {timer}
        </span>
      </div>
      {errorMessage && (
        <span
          id={errorMessageId}
          className="flex items-start gap-[5px] text-body-01 font-regular leading-[1.4] text-primary-60"
        >
          <span className="mt-[1px] flex size-4 shrink-0 items-center justify-center rounded-full border border-primary-60 text-caption font-regular leading-none">
            !
          </span>
          <span>{errorMessage}</span>
        </span>
      )}
    </div>
  );
}
