import type { InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export default function AuthInput({
  label,
  errorMessage,
  className = '',
  ...props
}: AuthInputProps) {
  const hasValue = props.value !== undefined && String(props.value).length > 0;

  return (
    <label className="flex w-full flex-col gap-2">
      {label && (
        <span className="text-subtitle font-semibold leading-[1.4] text-gray-100">
          {label}
        </span>
      )}
      <input
        aria-invalid={Boolean(errorMessage)}
        className={`h-[50px] w-full rounded-lg border px-4 py-3 text-body-01 font-regular text-gray-70 placeholder:text-gray-70 focus:border-primary-50 focus:bg-white focus:outline-none ${
          hasValue || errorMessage
            ? 'border-primary-50 bg-white'
            : 'border-transparent bg-gray-20'
        } ${className}`}
        {...props}
      />
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
