import { type ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CTAButton from '@/components/CTAButton';
import Header from '@/components/Header';
import AuthInput from './components/AuthInput';
import AuthProgressBar from './components/AuthProgressBar';

type Gender = 'male' | 'female' | 'none';

const genderOptions: Array<{ label: string; value: Gender }> = [
  { label: '남성', value: 'male' },
  { label: '여성', value: 'female' },
  { label: '선택 안함', value: 'none' },
];

const birthdayPattern = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;

const validateNickname = (value: string, shouldRequire = false) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return shouldRequire ? '닉네임은 2자 이상 입력해주세요.' : '';
  }

  if (trimmedValue.length < 2) {
    return '닉네임은 2자 이상 입력해주세요.';
  }

  if (trimmedValue.length > 10) {
    return '닉네임은 최대 10자까지 입력할 수 있어요.';
  }

  if (!/^[가-힣A-Za-z0-9]+$/.test(trimmedValue)) {
    return '한글, 영문, 숫자만 사용할 수 있어요.';
  }

  if (/admin|관리자|운영자/i.test(trimmedValue)) {
    return '사용할 수 없는 단어가 포함되어 있어요.';
  }

  return '';
};

const validateBirthday = (value: string, shouldRequire = false) => {
  if (!value) {
    return shouldRequire ? '생년월일을 입력해주세요.' : '';
  }

  return birthdayPattern.test(value) ? '' : 'YYYYMMDD 형식을 지켜주세요.';
};

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

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [errors, setErrors] = useState({
    nickname: '',
    birthday: '',
  });

  const isAllAgreed = termsAgreed && marketingAgreed;
  const isNextDisabled =
    !nickname.trim() || !gender || !birthday || Boolean(validateBirthday(birthday));

  const handleAllAgree = () => {
    const nextValue = !isAllAgreed;
    setTermsAgreed(nextValue);
    setMarketingAgreed(nextValue);
    setTermsError(false);
  };

  const handleNext = () => {
    const nextErrors = {
      nickname: validateNickname(nickname, true),
      birthday: validateBirthday(birthday, true),
    };

    setErrors(nextErrors);
    setTermsError(!termsAgreed);

    if (
      gender &&
      termsAgreed &&
      Object.values(nextErrors).every((message) => !message)
    ) {
      navigate('/auth/finish');
    }
  };

  return (
    <main className="relative h-dvh overflow-y-auto bg-white text-gray-100">
      <div className="sticky top-0 z-20 bg-white pt-[40px]">
        <Header showBack title="프로필 설정" />
        <div className="px-[15px] pb-[27px]">
          <AuthProgressBar step={3} />
        </div>
      </div>

      <section className="flex flex-col gap-[40px] px-[15px] pb-[150px] pt-[23px]">
        <section className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-4">
            <h2 className="text-subtitle font-semibold leading-[1.4] text-gray-100">
              프로필 사진 (선택)
            </h2>
            <button
              type="button"
              className="flex size-[100px] items-center justify-center rounded-[20px] border border-dashed border-secondary-40 bg-secondary-10 text-[28px] font-light leading-none text-secondary-50"
              aria-label="프로필 사진 추가"
            >
              +
            </button>
          </div>

          <AuthInput
            label="닉네임"
            value={nickname}
            onChange={(event) => {
              const nextNickname = event.target.value;
              setNickname(nextNickname);
              setErrors((value) => ({
                ...value,
                nickname: validateNickname(nextNickname),
              }));
            }}
            placeholder="닉네임을 입력해주세요"
            autoComplete="nickname"
            errorMessage={errors.nickname}
          />

          <div className="flex flex-col gap-4">
            <h2 className="text-subtitle font-semibold leading-[1.4] text-gray-100">
              성별
            </h2>
            <div className="grid grid-cols-3 gap-[15px]">
              {genderOptions.map((option) => {
                const isSelected = gender === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setGender(option.value)}
                    className={`flex h-11 items-center justify-center rounded-lg border px-2 text-body-01 font-regular leading-[1.4] ${
                      isSelected
                        ? 'border-secondary-40 bg-secondary-10 text-primary-80'
                        : 'border-gray-40 bg-gray-20 text-gray-70'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <AuthInput
            label="생년월일"
            value={birthday}
            onChange={(event) => {
              const nextBirthday = event.target.value;
              setBirthday(nextBirthday);
              setErrors((value) => ({
                ...value,
                birthday: validateBirthday(nextBirthday),
              }));
            }}
            placeholder="ex. 20010101"
            inputMode="numeric"
            errorMessage={errors.birthday}
          />
        </section>

        <section className="overflow-hidden rounded-[20px] border border-gray-30 bg-white">
          <div className="bg-secondary-10 px-[25px] py-[17px]">
            <CheckItem checked={isAllAgreed} onChange={handleAllAgree}>
              <span className="text-subtitle font-semibold leading-[1.4] text-gray-90">
                전체 동의
              </span>
            </CheckItem>
          </div>

          <div className="flex flex-col gap-[15px] px-[25px] py-5">
            <CheckItem
              checked={termsAgreed}
              onChange={() => {
                setTermsAgreed((value) => {
                  const nextValue = !value;

                  if (nextValue) {
                    setTermsError(false);
                  }

                  return nextValue;
                });
              }}
            >
              <span className="text-body-01 font-regular leading-[1.4] text-gray-80 underline underline-offset-2">
                서비스 이용약관 및 개인정보 취급 방침 동의
              </span>
            </CheckItem>
            {termsError && (
              <p className="flex items-center gap-1 pl-7 text-body-02 font-regular leading-[1.4] text-primary-60">
                <span
                  className="flex size-3 items-center justify-center rounded-full border border-primary-60 text-[9px] leading-none"
                  aria-hidden="true"
                >
                  !
                </span>
                <span>필수 이용약관에 동의해주세요.</span>
              </p>
            )}
            <CheckItem
              checked={marketingAgreed}
              onChange={() => setMarketingAgreed((value) => !value)}
            >
              <span className="text-body-01 font-regular leading-[1.4] text-gray-80 underline underline-offset-2">
                마케팅 정보 수신 동의 (선택)
              </span>
            </CheckItem>
          </div>
        </section>
      </section>

      <section className="fixed bottom-[calc(var(--safe-bottom)+50px)] left-1/2 z-30 w-full max-w-[var(--app-max-width)] -translate-x-1/2 px-[15px]">
        <CTAButton disabled={isNextDisabled} onClick={handleNext}>
          다음
        </CTAButton>
      </section>
    </main>
  );
}
