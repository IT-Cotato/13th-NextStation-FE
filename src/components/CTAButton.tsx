import type { ButtonHTMLAttributes, ReactNode } from 'react';

type CTAButtonVariant = "primary" | "secondary";
interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: CTAButtonVariant;
}

const variantStyles: Record<CTAButtonVariant, string> = {
  primary: `
    bg-linear-to-r from-secondary-50 to-primary-50
    shadow-[0_0_8px_var(--color-secondary-50)]
    active:from-[#EF9E8C] active:to-[#E5989F]
    text-gray-10
    disabled:cursor-not-allowed
    disabled:bg-none disabled:bg-gray-20
    disabled:text-gray-70
    disabled:shadow-none`,
  secondary: `
    bg-white border border-gray-40
    text-gray-60
    active:bg-gray-20`,
};

export default function CTAButton({
  children,
  variant = "primary",
  className = '',
  disabled = false,
  ...props
}: CTAButtonProps) {

  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        flex h-[60px] w-[360px] items-center justify-center rounded-lg py-3
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      <span className="whitespace-nowrap text-title-02 font-semibold leading-none tracking-[-0.025em]"
      >
        {children}
      </span>
    </button>
  );
}