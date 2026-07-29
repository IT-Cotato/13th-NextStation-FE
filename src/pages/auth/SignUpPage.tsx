import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CTAButton from '@/components/CTAButton';
import Header from '@/components/Header';
import {
  AuthApiError,
  confirmEmailVerification,
  getAgreedTermsIds,
  REQUIRED_TERMS_IDS,
  saveSignupToken,
  sendEmailVerification,
  signup,
} from '@/api/auth';
import AuthCodeInput from './components/AuthCodeInput';
import AuthEmailCertificationInput from './components/AuthEmailCertificationInput';
import AuthPasswordInput from './components/AuthPasswordInput';
import AuthProgressBar from './components/AuthProgressBar';

const CERTIFICATION_LIMIT_SECONDS = 180;
const PASSWORD_PATTERN =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,20}$/;
const PASSWORD_FORMAT_ERROR =
  '영문 ∙ 숫자 ∙ 특수기호 ∙ 8-20자 포함해서 설정해주세요.';

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [certificationSeconds, setCertificationSeconds] = useState<number | null>(
    null,
  );
  const [code, setCode] = useState('');
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    code: '',
    password: '',
    passwordConfirm: '',
  });
  const isCertificationActive =
    certificationSeconds !== null && certificationSeconds > 0;
  const isEmailCertified = isCodeConfirmed;
  const isNextDisabled =
    !isEmailCertified ||
    !password ||
    !passwordConfirm ||
    !PASSWORD_PATTERN.test(password) ||
    password !== passwordConfirm ||
    isSubmitting;

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

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailError = '';

    if (!emailPattern.test(email)) {
      emailError = '이메일 형식이 올바르지 않습니다.';
    } else if (email === 'user@example.com') {
      emailError = '이미 가입된 이메일입니다.';
    }

    setErrors((value) => ({ ...value, email: emailError }));
    return !emailError;
  };

  const handleNext = async () => {
    const nextErrors = {
      email: '',
      code: '',
      password: '',
      passwordConfirm: '',
    };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      nextErrors.email = '이메일 형식이 잘못되었습니다.';
    } else if (email === 'user@example.com') {
      nextErrors.email = '이미 가입된 이메일입니다.';
    }

    if (!/^\d{6}$/.test(code)) {
      nextErrors.code = '잘못된 인증번호입니다.';
    }

    if (!PASSWORD_PATTERN.test(password)) {
      nextErrors.password = PASSWORD_FORMAT_ERROR;
    }

    if (!passwordConfirm) {
      nextErrors.passwordConfirm = '비밀번호를 다시 입력해주세요.';
    } else if (password !== passwordConfirm) {
      nextErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    const agreedTermsIds = getAgreedTermsIds();
    const hasRequiredTerms = REQUIRED_TERMS_IDS.every((id) =>
      agreedTermsIds.includes(id),
    );

    if (!hasRequiredTerms) {
      navigate('/auth/terms');
      return;
    }

    try {
      setIsSubmitting(true);
      const { signupToken } = await signup(
        email,
        password,
        passwordConfirm,
        agreedTermsIds,
      );
      saveSignupToken(signupToken);
      navigate('/auth/profile');
    } catch (error) {
      const message =
        error instanceof AuthApiError
          ? error.message
          : '회원가입 요청에 실패했습니다.';

      if (
        error instanceof AuthApiError &&
        error.code.endsWith('DUPLICATE_EMAIL')
      ) {
        setErrors((value) => ({ ...value, email: message }));
      } else if (
        error instanceof AuthApiError &&
        error.code.endsWith('PASSWORD_CONFIRMATION_MISMATCH')
      ) {
        setErrors((value) => ({ ...value, passwordConfirm: message }));
      } else {
        setErrors((value) => ({ ...value, password: message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCertificationClick = async () => {
    if (!validateEmail()) {
      return;
    }

    const agreedTermsIds = getAgreedTermsIds();

    if (!REQUIRED_TERMS_IDS.every((id) => agreedTermsIds.includes(id))) {
      navigate('/auth/terms');
      return;
    }

    try {
      setIsSending(true);
      await sendEmailVerification(email, agreedTermsIds);
      setCertificationSeconds(CERTIFICATION_LIMIT_SECONDS);
      setIsCodeConfirmed(false);
      setCode('');
      setErrors((value) => ({ ...value, email: '', code: '' }));
    } catch (error) {
      const message =
        error instanceof AuthApiError
          ? error.message
          : '인증번호 발송에 실패했습니다.';
      setErrors((value) => ({ ...value, email: message }));
    } finally {
      setIsSending(false);
    }
  };

  const handleCodeConfirm = async () => {
    if (!isCertificationActive || !/^\d{6}$/.test(code)) {
      setErrors((value) => ({
        ...value,
        code: '잘못된 인증번호입니다.',
      }));
      setIsCodeConfirmed(false);
      return;
    }

    try {
      setIsConfirming(true);
      await confirmEmailVerification(email, code);
      setErrors((value) => ({ ...value, code: '' }));
      setIsCodeConfirmed(true);
    } catch (error) {
      const message =
        error instanceof AuthApiError
          ? error.message
          : '인증번호 확인에 실패했습니다.';
      setErrors((value) => ({ ...value, code: message }));
      setIsCodeConfirmed(false);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <main className="flex h-dvh flex-col bg-white pt-[calc(var(--safe-top)+12px)] tracking-[-0.025em] text-gray-100">
      <Header showBack title="이메일로 회원가입" />

      <div className="-mt-[3px] px-[15px]">
        <AuthProgressBar step={1} edgeToEdge />
      </div>

      <section className="mt-[27px] px-[15px]">
        <section className="flex flex-col gap-[30px]">
          <h2 className="text-subtitle font-semibold leading-[1.4] text-gray-100">
            이메일을 입력해주세요
          </h2>
          <div className="flex flex-col gap-3">
            <AuthEmailCertificationInput
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setCertificationSeconds(null);
                setIsCodeConfirmed(false);
                setCode('');
                setPassword('');
                setPasswordConfirm('');
                setErrors((value) => ({ ...value, email: '' }));
              }}
              onBlur={validateEmail}
              placeholder="user@example.com"
              autoComplete="email"
              buttonLabel={
                isSending
                  ? '요청 중'
                  : isCertificationActive
                    ? '재요청'
                    : '인증하기'
              }
              buttonTone={
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? 'active'
                  : 'default'
              }
              errorMessage={errors.email}
              buttonDisabled={isSending}
              onCertificationClick={handleCertificationClick}
            />
            <AuthCodeInput
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setIsCodeConfirmed(false);
                setPassword('');
                setPasswordConfirm('');
                setErrors((value) => ({ ...value, code: '' }));
              }}
              placeholder="인증번호 6자리를 입력해주세요"
              inputMode="numeric"
              timer={formatTimer(certificationSeconds ?? CERTIFICATION_LIMIT_SECONDS)}
              errorMessage={errors.code}
              showButton
              buttonLabel={isConfirming ? '확인 중' : '확인'}
              buttonTone={/^\d{6}$/.test(code) ? 'active' : 'default'}
              buttonDisabled={isConfirming}
              onButtonClick={handleCodeConfirm}
            />
          </div>
        </section>

        {isEmailCertified && (
          <section className="mt-[33px] flex flex-col gap-[30px]">
            <h2 className="text-subtitle font-semibold leading-[1.4] text-gray-100">
              비밀번호를 입력해주세요
            </h2>
            <div className="flex flex-col gap-3">
              <AuthPasswordInput
                value={password}
                onChange={(event) => {
                  const nextPassword = event.target.value;
                  setPassword(nextPassword);
                  setErrors((value) => ({
                    ...value,
                    password:
                      nextPassword && !PASSWORD_PATTERN.test(nextPassword)
                        ? PASSWORD_FORMAT_ERROR
                        : '',
                    passwordConfirm:
                      passwordConfirm && nextPassword !== passwordConfirm
                        ? '비밀번호가 일치하지 않습니다.'
                        : '',
                  }));
                }}
                placeholder="영문 ∙ 숫자 ∙ 특수기호 ∙ 8-20자를 포함해주세요"
                autoComplete="new-password"
                errorMessage={errors.password}
              />
              <AuthPasswordInput
                value={passwordConfirm}
                onChange={(event) => {
                  const nextPasswordConfirm = event.target.value;
                  setPasswordConfirm(nextPasswordConfirm);
                  setErrors((value) => ({
                    ...value,
                    passwordConfirm:
                      nextPasswordConfirm && password !== nextPasswordConfirm
                        ? '비밀번호가 일치하지 않습니다.'
                        : '',
                  }));
                }}
                placeholder="비밀번호를 다시 입력해주세요"
                autoComplete="new-password"
                errorMessage={errors.passwordConfirm}
              />
            </div>
          </section>
        )}
      </section>

      <section className="mt-auto flex justify-center px-[15px] pb-[calc(var(--safe-bottom)+50px)]">
        <CTAButton
          disabled={isNextDisabled}
          className="disabled:!bg-gray-40 disabled:!text-gray-10"
          onClick={handleNext}
        >
          다음
        </CTAButton>
      </section>
    </main>
  );
}
