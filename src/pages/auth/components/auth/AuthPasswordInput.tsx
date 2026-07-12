import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import EyeClose from '@/assets/auth/eye-close.svg?react';

interface AuthPasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export default function AuthPasswordInput({
  label,
  errorMessage,
  className = '',
  ...props
}: AuthPasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const hasValue = props.value !== undefined && String(props.value).length > 0;

  return (
    <label className="flex w-full flex-col gap-2">
      {label && (
        <span className="text-subtitle font-semibold leading-[1.4] text-gray-100">
          {label}
        </span>
      )}
      <span className="relative block h-[50px] w-full">
        <input
          type={isVisible ? 'text' : 'password'}
          aria-invalid={Boolean(errorMessage)}
          className={`h-full w-full rounded-[20px] border px-4 py-3 pr-12 text-body-01 font-regular text-gray-70 placeholder:text-gray-70 focus:border-primary-50 focus:bg-white focus:outline-none ${
            hasValue || errorMessage
              ? 'border-primary-50 bg-white'
              : 'border-transparent bg-gray-20'
          } ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((value) => !value)}
          className="absolute right-4 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center"
          aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
        >
          <EyeClose className="size-5" aria-hidden="true" />
        </button>
      </span>
      {errorMessage && (
        <span className="flex items-start gap-[5px] text-body-01 font-regular leading-[1.4] text-primary-60">
          <span className="mt-[1px] flex size-4 shrink-0 items-center justify-center rounded-full border border-primary-60 text-caption font-regular leading-none">
            !
          </span>
          <span>{errorMessage}</span>
        </span>
      )}
    </label>
  );
}
