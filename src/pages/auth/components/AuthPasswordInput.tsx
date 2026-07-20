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
          {isVisible ? (
            <svg
              viewBox="0 0 20 20"
              className="size-5 text-gray-60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2.25 10C3.92 6.92 6.73 5 10 5s6.08 1.92 7.75 5c-1.67 3.08-4.48 5-7.75 5s-6.08-1.92-7.75-5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="10" r="2.35" fill="currentColor" />
            </svg>
          ) : (
            <EyeClose
              className="size-5 [--fill-0:var(--color-gray-60)]"
              aria-hidden="true"
            />
          )}
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
