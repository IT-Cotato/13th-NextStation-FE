import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function CTAButton({
  children,
  className = '',
  ...props
}: CTAButtonProps) {
  return (
    <button
      type="button"
      className={`
        flex h-[60px] w-[360px] items-center justify-center rounded-lg py-3
        bg-linear-to-r from-secondary-50 to-primary-50
        shadow-[0_0_8px_var(--color-secondary-50)]
        active:from-[#EF9E8C] active:to-[#E5989F]
        ${className}
      `}
      {...props}
    >
      <span className="whitespace-nowrap text-title-02 font-semibold leading-none tracking-[-0.025em] text-gray-10">
        {children}
      </span>
    </button>
  );
}