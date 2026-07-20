import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function AuthButton({
  children,
  className = '',
  ...props
}: AuthButtonProps) {
  return (
    <button
      type="button"
      className={`
        flex h-[60px] w-full items-center justify-center rounded-[20px]
        bg-linear-to-r from-secondary-50 to-primary-50 px-4 py-3
        text-title-02 font-semibold text-gray-10 shadow-[0_0_4px_var(--color-secondary-50)]
        active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
