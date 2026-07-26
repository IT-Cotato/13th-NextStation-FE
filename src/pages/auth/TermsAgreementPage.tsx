import { type ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import termsAgreementImage from '@/assets/auth/terms-agreement.svg';
import CTAButton from '@/components/CTAButton';
import Header from '@/components/Header';
import AuthProgressBar from './components/AuthProgressBar';

interface CheckItemProps {
  checked: boolean;
  children: ReactNode;
  onChange: () => void;
}

function CheckItem({ checked, children, onChange }: CheckItemProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className="flex items-center gap-[10px] text-left"
    >
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] border ${
          checked ? 'border-primary-50 bg-primary-50' : 'border-primary-50 bg-white'
        }`}
      >
        {checked && (
          <span className="text-body-02 font-semibold leading-none text-white">✓</span>
        )}
      </span>
      {children}
    </button>
  );
}

export default function TermsAgreementPage() {
  const navigate = useNavigate();
  const [serviceAgreed, setServiceAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isAllAgreed = serviceAgreed && privacyAgreed && marketingAgreed;
  const isRequiredAgreed = serviceAgreed && privacyAgreed;
  const showServiceError = hasInteracted && !serviceAgreed;
  const showPrivacyError = hasInteracted && !privacyAgreed;

  const handleAllAgree = () => {
    const nextValue = !isAllAgreed;
    setServiceAgreed(nextValue);
    setPrivacyAgreed(nextValue);
    setMarketingAgreed(nextValue);
    setHasInteracted(true);
  };

  return (
    <main className="relative h-dvh overflow-y-auto bg-white text-gray-100">
      <div className="absolute left-0 top-[40px] z-20 w-full">
        <Header showBack title="약관동의" />
      </div>

      <div className="absolute left-[15px] right-[15px] top-[87px]">
        <AuthProgressBar step={0} edgeToEdge />
      </div>

      <section className="px-[15px] pb-[150px] pt-[130px]">
        <h2 className="text-headline font-semibold leading-[1.4] text-gray-100">
          환승여행을 떠나기 전
          <br />
          약관에 동의해주세요!
        </h2>

        <img
          src={termsAgreementImage}
          alt=""
          className="ml-auto mt-[36px] block h-[225.44px] w-[244px] -scale-x-100"
        />

        <section className="mt-[41px]">
          <div className="py-4">
            <CheckItem checked={isAllAgreed} onChange={handleAllAgree}>
              <span className="text-body-01 font-semibold leading-[1.4] text-gray-100">
                전체 동의
              </span>
            </CheckItem>
          </div>

          <div className="mx-[15px] h-px bg-gray-30" />

          <div className="flex flex-col gap-3 pb-10 pt-4">
            <div>
              <CheckItem
                checked={serviceAgreed}
                onChange={() => {
                  setServiceAgreed((value) => !value);
                  setHasInteracted(true);
                }}
              >
                <span className="text-body-01 font-regular leading-[1.4] text-gray-80">
                  <span className="underline underline-offset-2">서비스 이용약관</span>
                  {' 동의 (필수)'}
                </span>
              </CheckItem>
              {showServiceError && (
                <p className="mt-1 flex items-center gap-1 pl-[30px] text-body-02 font-regular leading-[1.4] text-primary-60">
                  <span
                    className="flex size-3 items-center justify-center rounded-full border border-primary-60 text-[9px] leading-none"
                    aria-hidden="true"
                  >
                    !
                  </span>
                  필수 이용약관에 동의해주세요.
                </p>
              )}
            </div>

            <div>
              <CheckItem
                checked={privacyAgreed}
                onChange={() => {
                  setPrivacyAgreed((value) => !value);
                  setHasInteracted(true);
                }}
              >
                <span className="text-body-01 font-regular leading-[1.4] text-gray-80 underline underline-offset-2">
                  개인정보 취급 방침 동의 (필수)
                </span>
              </CheckItem>
              {showPrivacyError && (
                <p className="mt-1 flex items-center gap-1 pl-[30px] text-body-02 font-regular leading-[1.4] text-primary-60">
                  <span
                    className="flex size-3 items-center justify-center rounded-full border border-primary-60 text-[9px] leading-none"
                    aria-hidden="true"
                  >
                    !
                  </span>
                  필수 이용약관에 동의해주세요.
                </p>
              )}
            </div>

            <CheckItem
              checked={marketingAgreed}
              onChange={() => {
                setMarketingAgreed((value) => !value);
                setHasInteracted(true);
              }}
            >
              <span className="text-body-01 font-regular leading-[1.4] text-gray-80 underline underline-offset-2">
                마케팅 정보 수신 동의 (선택)
              </span>
            </CheckItem>
          </div>
        </section>
      </section>

      <section className="fixed bottom-[calc(var(--safe-bottom)+50px)] left-1/2 z-30 w-full max-w-[var(--app-max-width)] -translate-x-1/2 px-[15px]">
        <CTAButton
          disabled={!isRequiredAgreed}
          className="disabled:!bg-gray-40 disabled:!text-gray-10"
          onClick={() => navigate('/auth/sign-up')}
        >
          다음
        </CTAButton>
      </section>
    </main>
  );
}
