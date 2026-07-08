import BackIcon from '@/assets/back.svg?react';
import { useNavigate } from 'react-router-dom';

export default function BackHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-[50px] items-center px-3">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label='뒤로가기'
        className="flex size-6 items-center justify-center"
      >
        <BackIcon className='size-6' />
      </button>
      
    </div>
  )
}