import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from './components/AuthButton';
import AuthCodeInput from './components/AuthCodeInput';
import AuthEmailCertificationInput from './components/AuthEmailCertificationInput';
import AuthPasswordInput from './components/AuthPasswordInput';
import AuthTopBar from './components/AuthTopBar';

const CERTIFICATION_LIMIT_SECONDS = 180;

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function PasswordFindPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [certificationSeconds, setCertificationSeconds] = useState<number | null>(
    null,
  );
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    code: '',
    password: '',
    passwordConfirm: '',
  });
  const isCertificationActive =
    certificationSeconds !== null && certificationSeconds > 0;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/auth/login');
  };

  useEffect(() => {
    if (certificationSeconds === null) {
      return undefined;
    }

    if (certificationSeconds <= 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setCertificationSeconds((seconds) =>
        seconds === null ? seconds : Math.max(seconds - 1, 0),
      );
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [certificationSeconds]);

  const handleNext = () => {
    const nextErrors = {
      email: '',
      code: '',
      password: '',
      passwordConfirm: '',
    };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,20}$/;

    if (!emailPattern.test(email)) {
      nextErrors.email = '이메일 형식이 잘못되었습니다.';
    }

    if (!/^\d{6}$/.test(code)) {
      nextErrors.code = '잘못된 인증번호입니다.';
    }

    if (!passwordPattern.test(password)) {
      nextErrors.password = '영문 ∙ 숫자 ∙ 특수기호 ∙ 8-20자 포함해서 설정해주세요.';
    }

    if (passwordConfirm && password !== passwordConfirm) {
      nextErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(nextErrors);

    if (Object.values(nextErrors).every((message) => !message)) {
      navigate('/auth/login');
    }
  };

  const handleCertificationClick = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setErrors((value) => ({
        ...value,
        email: '이메일 형식이 잘못되었습니다.',
      }));
      return;
    }

    setErrors((value) => ({ ...value, email: '' }));
    setCertificationSeconds(CERTIFICATION_LIMIT_SECONDS);
  };

  return (
    <main className="relative h-dvh overflow-hidden bg-white text-gray-100">
      <div className="absolute left-0 top-[40px] w-full">
        <AuthTopBar title="비밀번호 찾기" onBack={handleBack} />
      </div>

      <section className="absolute left-[15px] right-[15px] top-[130px] flex flex-col gap-[30px]">
        <section className="flex flex-col gap-[30px]">
          <h2 className="text-subtitle font-semibold leading-[1.4] text-gray-100">
            가입한 이메일을 입력해주세요
          </h2>
          <div className="flex flex-col gap-2">
            <AuthEmailCertificationInput
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setCertificationSeconds(null);
                setErrors((value) => ({ ...value, email: '' }));
              }}
              placeholder="user@example.com"
              autoComplete="email"
              buttonLabel={isCertificationActive ? '재요청' : '인증하기'}
              buttonTone={isCertificationActive ? 'dark' : 'default'}
              errorMessage={errors.email}
              onCertificationClick={handleCertificationClick}
            />
            <AuthCodeInput
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setErrors((value) => ({ ...value, code: '' }));
              }}
              placeholder="인증번호 6자리를 입력해주세요"
              inputMode="numeric"
              timer={formatTimer(certificationSeconds ?? CERTIFICATION_LIMIT_SECONDS)}
              errorMessage={errors.code}
            />
          </div>
        </section>

        <section className="flex flex-col gap-[30px]">
          <h2 className="text-subtitle font-semibold leading-[1.4] text-gray-100">
            새로운 비밀번호를 입력해주세요
          </h2>
          <div className="flex flex-col gap-2">
            <AuthPasswordInput
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((value) => ({ ...value, password: '' }));
              }}
              placeholder="영문 ∙ 숫자 ∙ 특수기호 ∙ 8-20자를 포함해주세요"
              autoComplete="new-password"
              errorMessage={errors.password}
            />
            <AuthPasswordInput
              value={passwordConfirm}
              onChange={(event) => {
                setPasswordConfirm(event.target.value);
                setErrors((value) => ({ ...value, passwordConfirm: '' }));
              }}
              placeholder="비밀번호를 다시 입력해주세요"
              autoComplete="new-password"
              errorMessage={errors.passwordConfirm}
            />
          </div>
        </section>
      </section>

      <section className="absolute bottom-[calc(var(--safe-bottom)+50px)] left-[15px] right-[15px] z-10">
        <AuthButton onClick={handleNext}>다음</AuthButton>
      </section>
    </main>
  );
}
