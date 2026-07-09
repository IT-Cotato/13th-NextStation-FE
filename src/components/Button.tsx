import ArrowPrev from '@/assets/arrow-prev.svg?react';
import ArrowNext from '@/assets/arrow-next.svg?react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSize = 's';
type ButtonDirection = 'left' | 'right';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  direction?: ButtonDirection;
  children: ReactNode
}

export default function Button({
  size = 's',
  direction = 'right',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isLeft = direction === 'left';

  const baseClassName=`
    flex items-center justify-center gap-2 rounded-full 
    border-[2px] border-secondary-30 shadow-[0_0_8px_var(--color-secondary-50)] 
    active:scale-[0.96] active:from-[#EF9E8C] active:to-[#E5989F] active:border-secondary-50
    `
  ;

  const sizeClassName = {
    s: 'px-6 py-4',
  }[size];

  const directionClassName = isLeft
    ? 'bg-linear-to-r from-primary-50 to-secondary-50'
    : 'bg-linear-to-r from-secondary-50 to-primary-50';
  
  const textClassName =
    'whitespace-nowrap text-title-01 font-semibold text-gray-10 leading-5 tracking-[-0.025em]';

  const Icon = isLeft ? ArrowPrev : ArrowNext;

  return (
    <button
      type="button"
      className={`${baseClassName} ${sizeClassName} ${directionClassName} ${className}`}
      {...props}
    >
      {isLeft && <Icon className="size-6" />}
      <span className={textClassName}>{children}</span>
      {!isLeft && <Icon className="size-6" />}
    </button>
  );
}