import { useNavigate } from 'react-router-dom';
import finishBadge from '@/assets/auth/finish-badge.svg';
import AuthButton from './components/AuthButton';
import AuthProgressBar from './components/AuthProgressBar';
import AuthTopBar from './components/AuthTopBar';

export default function FinishPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/auth/profile');
  };

  return (
    <main className="relative h-dvh overflow-hidden bg-white text-gray-100">
      <div className="absolute left-0 top-[40px] w-full">
        <AuthTopBar title="회원가입 완료" onBack={handleBack} />
      </div>

      <div className="absolute left-[15px] right-[15px] top-[87px]">
        <AuthProgressBar step={4} />
      </div>

      <section className="absolute inset-x-0 bottom-[calc(var(--safe-bottom)+130px)] top-[130px] flex flex-col items-center justify-center text-center">
        <img src={finishBadge} alt="" className="size-[130px]" aria-hidden="true" />
        <h2 className="mt-[21px] w-[168px] text-headline font-semibold leading-[1.4] text-gray-90">
          환승여행 계정이 만들어졌어요!
        </h2>
      </section>

      <section className="absolute bottom-[calc(var(--safe-bottom)+50px)] left-[15px] right-[15px] z-10">
        <AuthButton onClick={() => navigate('/')}>환승여행 바로 시작하기</AuthButton>
      </section>
    </main>
  );
}
