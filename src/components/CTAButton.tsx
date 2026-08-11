import Share from "@/assets/share.svg?react";
import { useEffect, useRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type CTAButtonVariant = "primary" | "secondary";
type CTAButtonMode = "default" | "share";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: CTAButtonVariant;
  mode?: CTAButtonMode;
  width?: number;
  submitOnEnter?: boolean;
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
  submitOnEnter = false,
  ...props
}: CTAButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!submitOnEnter) return;

    const handleEnter = (event: KeyboardEvent) => {
      if (
        event.key !== "Enter" ||
        event.repeat ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLButtonElement ||
        target instanceof HTMLAnchorElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      buttonRef.current?.click();
    };

    document.addEventListener("keydown", handleEnter);
    return () => document.removeEventListener("keydown", handleEnter);
  }, [submitOnEnter]);

  if (mode === "share") {
    return (
      <button
        ref={buttonRef}
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
      ref={buttonRef}
      type="button"
      disabled={disabled}
      style={{ width }}
      className={`
        flex h-[60px] items-center justify-center rounded-lg py-3
        outline-none focus:outline-none focus-visible:outline-none
        ring-0 focus:ring-0 focus-visible:ring-0
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
