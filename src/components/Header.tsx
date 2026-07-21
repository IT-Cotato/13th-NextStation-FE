import BackIcon from '@/assets/back.svg?react';
import CloseIcon from '@/assets/close.svg?react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showClose?: boolean;
  onBackClick?: () => void;
  onCloseClick?: () => void;
}

export default function Header({
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

    navigate(-1);
  };

  return (
    <header className="grid w-full h-[50px] grid-cols-[40px_1fr_40px] items-center px-3">
      <div className='flex items-center justify-start'>
        {showBack && (
          <button
          type="button"
          onClick={handleBackClick}
          aria-label='뒤로가기'
          className="flex size-6 items-center justify-center outline-none"
        >
          <BackIcon className='size-6' />
        </button>
        )}
      </div>

      <div className='flex min-w-0 items-center justify-center'>
        {title && (
          <h3 className='text-title-02 font-semibold leading-none tracking-[-0.025em] text-center'>
            {title}
          </h3>
        )}
      </div>

      <div className='flex items-center justify-end'>
        {showClose && (
          <button
          type="button"
          onClick={onCloseClick}
          aria-label='닫기'
          className="flex size-6 items-center justify-center outline-none"
        >
          <CloseIcon className='size-6' />
        </button>
        )}
      </div>
    </header>
  )
}