import Share from "@/assets/share.svg?react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type CTAButtonVariant = "primary" | "secondary";
type CTAButtonMode = "default" | "share";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: CTAButtonVariant;
  mode?: CTAButtonMode;
  width?: number;
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
  mode = "default",
  className = "",
  disabled = false,
  width = 360,
  ...props
}: CTAButtonProps) {
  if (mode === "share") {
    return (
      <button
        type="button"
        disabled={disabled}
        style={{ width }}
        className={`
        flex gap-[10px] h-[60px] items-center justify-center rounded-lg py-3
        ${variantStyles[variant]}
        ${className}
      `}
        {...props}
      >
        <Share />
        <span className="whitespace-nowrap text-title-02 font-semibold leading-none tracking-[-0.025em]">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      style={{ width: `min(100%, ${width}px)` }}
      className={`
        flex h-[60px] w-full items-center justify-center rounded-lg py-3
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      <span className="whitespace-nowrap text-title-02 font-semibold leading-none tracking-[-0.025em]">
        {children}
      </span>
    </button>
  );
}
