import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CTAButton from '@/components/CTAButton';
import Header from '@/components/Header';
import {
  AuthApiError,
  confirmPasswordResetVerification,
  resetPassword,
  sendPasswordResetVerification,
} from '@/api/auth';
import AuthInput from './components/AuthInput';

const CERTIFICATION_LIMIT_SECONDS = 180;
const PASSWORD_PATTERN =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,20}$/;

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function PasswordResetPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [certificationSeconds, setCertificationSeconds] = useState<number | null>(
    null,
  );
  const [code, setCode] = useState('');
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [submitError, setSubmitError] = useState('');
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
    const emailError = emailPattern.test(email)
      ? ''
      : '이메일 형식이 올바르지 않습니다.';

    setErrors((value) => ({ ...value, email: emailError }));
    return !emailError;
  };

  const handleNext = async () => {
    setSubmitError('');
    const nextErrors = {
      email: '',
      code: '',
      password: '',
      passwordConfirm: '',
    };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      nextErrors.email = '이메일 형식이 잘못되었습니다.';
    }

    if (!/^\d{6}$/.test(code)) {
      nextErrors.code = '잘못된 인증번호입니다.';
    }

    if (!PASSWORD_PATTERN.test(password)) {
      nextErrors.password = '영문 ∙ 숫자 ∙ 특수기호 ∙ 8-20자 포함해서 설정해주세요.';
    }

    if (!passwordConfirm) {
      nextErrors.passwordConfirm = '비밀번호를 다시 입력해주세요.';
    } else if (password !== passwordConfirm) {
      nextErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(nextErrors);

    if (Object.values(nextErrors).every((message) => !message)) {
      try {
        setIsSubmitting(true);
        await resetPassword(email, code, password, passwordConfirm);
        navigate('/auth/login');
      } catch (error) {
        const message =
          error instanceof AuthApiError
            ? error.message
            : '비밀번호 재설정에 실패했습니다.';

        if (
          error instanceof AuthApiError &&
          error.code.endsWith('PASSWORD_CONFIRMATION_MISMATCH')
        ) {
          setErrors((value) => ({ ...value, passwordConfirm: message }));
        } else if (
          error instanceof AuthApiError &&
          (error.code.endsWith('EMAIL_VERIFICATION_EXPIRED') ||
            error.code.endsWith('EMAIL_VERIFICATION_CODE_MISMATCH') ||
            error.code.endsWith('EMAIL_VERIFICATION_NOT_FOUND'))
        ) {
          setErrors((value) => ({ ...value, code: message }));
          setIsCodeConfirmed(false);
        } else {
          setSubmitError(message);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCertificationClick = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setErrors((value) => ({
        ...value,
        email: '이메일 형식이 잘못되었습니다.',
      }));
      return;
    }

    try {
      setIsSending(true);
      await sendPasswordResetVerification(email);
      setErrors((value) => ({ ...value, email: '', code: '' }));
      setCertificationSeconds(CERTIFICATION_LIMIT_SECONDS);
      setIsCodeConfirmed(false);
      setCode('');
    } catch (error) {
      setErrors((value) => ({
        ...value,
        email:
          error instanceof AuthApiError
            ? error.message
            : '인증번호 발송에 실패했습니다.',
      }));
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
      await confirmPasswordResetVerification(email, code);
      setErrors((value) => ({ ...value, code: '' }));
      setIsCodeConfirmed(true);
    } catch (error) {
      setErrors((value) => ({
        ...value,
        code:
          error instanceof AuthApiError
            ? error.message
            : '인증번호 확인에 실패했습니다.',
      }));
      setIsCodeConfirmed(false);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <main className="flex h-dvh flex-col bg-white pt-[calc(var(--safe-top)+12px)] tracking-[-0.025em] text-gray-100">
      <Header showBack title="비밀번호 찾기" />

      <section className="mt-10 px-[15px]">
        <section className="flex flex-col gap-[30px]">
          <h2 className="text-subtitle font-semibold leading-[1.4] text-gray-100">
            이메일을 입력해주세요
          </h2>
          <div className="flex flex-col gap-3">
            <AuthInput
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
              actionLabel={
                isSending
                  ? '요청 중'
                  : isCertificationActive
                    ? '재요청'
                    : '인증하기'
              }
              actionTone={email || isCertificationActive ? 'active' : 'default'}
              errorMessage={errors.email}
              actionDisabled={isSending}
              onActionClick={handleCertificationClick}
            />
            <AuthInput
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
              timer={
                certificationSeconds === null
                  ? undefined
                  : formatTimer(certificationSeconds)
              }
              errorMessage={errors.code}
              actionLabel={isConfirming ? '확인 중' : '확인'}
              actionTone={/^\d{6}$/.test(code) ? 'active' : 'default'}
              actionDisabled={isConfirming}
              onActionClick={handleCodeConfirm}
            />
          </div>
        </section>

        {isEmailCertified && (
          <section className="mt-[33px] flex flex-col gap-[30px]">
            <h2 className="text-subtitle font-semibold leading-[1.4] text-gray-100">
              비밀번호를 입력해주세요
            </h2>
            <div className="flex flex-col gap-3">
              <AuthInput
                type="password"
                value={password}
                onChange={(event) => {
                  const nextPassword = event.target.value;
                  setPassword(nextPassword);
                  setErrors((value) => ({
                    ...value,
                    password:
                      nextPassword && !PASSWORD_PATTERN.test(nextPassword)
                        ? '영문 ∙ 숫자 ∙ 특수기호 ∙ 8-20자 포함해서 설정해주세요.'
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
              <AuthInput
                type="password"
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
        <div className="flex w-full flex-col items-center gap-2">
          {submitError && (
            <p className="text-body-02 font-regular leading-[1.4] text-primary-60">
              {submitError}
            </p>
          )}
          <CTAButton
            disabled={isNextDisabled}
            className="disabled:!bg-gray-40 disabled:!text-gray-10"
            onClick={handleNext}
          >
            {isSubmitting ? '변경 중' : '다음'}
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
