import BackIcon from '@/assets/back.svg?react';
import CloseIcon from '@/assets/close.svg?react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  className?: string;
  title?: string;
  showBack?: boolean;
  showClose?: boolean;
  onBackClick?: () => void;
  onCloseClick?: () => void;
}

export default function Header({
  className = '',
  title,
  showBack = false,
  showClose = false,
  onBackClick,
  onCloseClick,
}: HeaderProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  return (
    <header className={`grid h-[50px] w-full shrink-0 grid-cols-[40px_1fr_40px] items-center px-3 ${className}`}>
      <div className="flex items-center justify-start">
        {showBack && (
          <button
            type="button"
            onClick={handleBackClick}
            aria-label="뒤로가기"
            className="flex size-6 items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-50 focus-visible:ring-offset-2"
          >
            <BackIcon className="size-6" />
          </button>
        )}
      </div>

      <div className="flex min-w-0 items-center justify-center">
        {title && (
          <h3 className="text-center text-title-02 font-semibold leading-none tracking-[-0.025em] text-gray-90">
            {title}
          </h3>
        )}
      </div>

      <div className="flex items-center justify-end">
        {showClose && (
          <button
            type="button"
            onClick={onCloseClick}
            aria-label="닫기"
            className="flex size-6 items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-50 focus-visible:ring-offset-2"
          >
            <CloseIcon className="size-6" />
          </button>
        )}
      </div>
    </header>
  );
}
