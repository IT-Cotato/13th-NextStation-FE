import type { InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function AuthInput({ label, className = '', ...props }: AuthInputProps) {
  const hasValue = props.value !== undefined && String(props.value).length > 0;

  return (
    <label className="flex w-full flex-col gap-2">
      {label && (
        <span className="text-subtitle font-semibold leading-[1.4] text-gray-100">
          {label}
        </span>
      )}
      <input
        className={`h-[50px] w-full rounded-[20px] border px-4 py-3 text-body-01 font-regular text-gray-70 placeholder:text-gray-70 focus:border-primary-50 focus:bg-white focus:outline-none ${
          hasValue ? 'border-primary-50 bg-white' : 'border-transparent bg-gray-20'
        } ${className}`}
        {...props}
      />
    </label>
  );
}
