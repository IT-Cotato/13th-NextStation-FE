import { useNavigate } from 'react-router-dom';
import ArrowPrev from '@/assets/arrow-prev.svg?react';
import titleImage from '@/assets/auth/welcome-title.png';
import archesImage from '@/assets/auth/welcome-arches.png';
import trainCarImage from '@/assets/auth/welcome-train-car.png';
import cloudFront from '@/assets/auth/welcome-cloud-front.svg';
import cloudTop from '@/assets/auth/welcome-cloud-top.svg';
import cloudLeft from '@/assets/auth/welcome-cloud-left.svg';
import cloudMiddle from '@/assets/auth/welcome-cloud-middle.svg';
import cloudSmall from '@/assets/auth/welcome-cloud-small.svg';
import cloudRight from '@/assets/auth/welcome-cloud-right.svg';
import appleImage from '@/assets/auth/welcome-apple.svg';
import kakaoImage from '@/assets/auth/welcome-kakao.svg';
import AuthButton from './components/auth/AuthButton';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <main className="relative mx-auto h-[844px] w-[390px] max-w-full overflow-hidden bg-linear-to-b from-primary-10 to-secondary-20">
      <button
        type="button"
        className="absolute left-[13px] top-[52px] z-30 flex size-6 items-center justify-center"
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
      >
        <ArrowPrev className="size-6 [&_path]:stroke-gray-90" />
      </button>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img
          src={cloudFront}
          alt=""
          className="absolute left-[-5px] top-[109px] h-[71px] w-[209px] max-w-none"
        />
        <img
          src={titleImage}
          alt=""
          className="absolute left-[109px] top-[218px] z-10 h-[51px] w-[172px] max-w-none"
        />
        <img
          src={cloudTop}
          alt=""
          className="absolute left-[260px] top-[229px] z-0 h-[54px] w-[158px] max-w-none"
        />
        <img
          src={cloudLeft}
          alt=""
          className="absolute left-[-103px] top-[287px] h-[71px] w-[210px] max-w-none"
        />
        <img
          src={cloudMiddle}
          alt=""
          className="absolute left-[-53px] top-[330px] h-[124px] w-[246px] max-w-none"
        />
        <img
          src={cloudSmall}
          alt=""
          className="absolute left-[128px] top-[404px] h-[55px] w-[116px] max-w-none"
        />
        <img
          src={cloudRight}
          alt=""
          className="absolute left-[305px] top-[396px] h-[124px] w-[246px] max-w-none"
        />
        <img
          src={archesImage}
          alt=""
          className="absolute left-0 top-[534px] h-[310px] w-[390px] max-w-none"
        />
        <img
          src={trainCarImage}
          alt=""
          className="absolute left-0 top-[456px] h-[75px] w-[295px] max-w-none"
        />
      </div>

      <section className="relative z-10 h-full px-[15px] pb-[50px]">
        <h1 className="sr-only">환승여행</h1>

        <p className="absolute left-1/2 top-[292px] w-[164px] -translate-x-1/2 text-center text-title-02 font-semibold leading-[1.35] tracking-[-0.025em] text-gray-80">
          매일 지나치던 역이,
          <br />
          오늘의 여행지가 됩니다.
        </p>

        <div className="absolute left-[125px] top-[599px] flex gap-5">
          <button
            type="button"
            className="size-[60px] rounded-full focus:outline-none focus:ring-2 focus:ring-primary-60"
            aria-label="Apple로 로그인"
          >
            <img src={appleImage} alt="" className="size-[60px]" />
          </button>
          <button
            type="button"
            className="size-[60px] rounded-full focus:outline-none focus:ring-2 focus:ring-primary-60"
            aria-label="카카오로 로그인"
          >
            <img src={kakaoImage} alt="" className="size-[60px]" />
          </button>
        </div>

        <div className="absolute left-[78px] top-[683px] flex w-[234px] items-center gap-[23px]">
          <span className="h-px w-20 bg-gray-40" />
          <span className="text-subtitle font-regular tracking-[-0.025em] text-gray-50">
            또는
          </span>
          <span className="h-px w-20 bg-gray-40" />
        </div>

        <div className="absolute bottom-[50px] left-[15px] right-[15px]">
          <AuthButton onClick={() => navigate('/auth/login')}>
            이메일로 이어가기
          </AuthButton>
        </div>
      </section>
    </main>
  );
}
