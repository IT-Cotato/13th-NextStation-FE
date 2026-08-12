import { useNavigate } from 'react-router-dom';
import finishBadge from '@/assets/auth/finish-badge.svg';
import CTAButton from '@/components/CTAButton';
import Header from '@/components/Header';
import AuthProgressBar from './components/AuthProgressBar';

export default function FinishPage() {
  const navigate = useNavigate();

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-white pt-[calc(var(--safe-top)+12px)] tracking-[-0.025em] text-gray-100">
      <Header showBack title="회원가입 완료" />

      <div className="-mt-[3px] px-[15px]">
        <AuthProgressBar step={3} />
      </div>

      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <img src={finishBadge} alt="" className="size-[130px]" aria-hidden="true" />
        <h1 className="mt-[21px] w-[168px] text-headline font-semibold leading-[1.4] tracking-[-0.025em] text-gray-90">
          환승여행 계정이 만들어졌어요!
        </h1>
      </section>

      <section className="flex justify-center px-[15px] pb-[calc(var(--safe-bottom)+50px)]">
        <CTAButton submitOnEnter onClick={() => navigate('/')}>
          환승여행 바로 시작하기
        </CTAButton>
      </section>
    </main>
  );
}
