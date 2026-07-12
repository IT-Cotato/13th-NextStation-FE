import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from './components/AuthButton';
import AuthInput from './components/AuthInput';
import AuthPasswordInput from './components/AuthPasswordInput';
import AuthTopBar from './components/AuthTopBar';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/auth');
  };

  const handleLogin = () => {
    setPasswordError('비밀번호가 일치하지 않습니다.');
  };

  return (
    <main className="relative h-dvh overflow-hidden bg-white text-gray-100">
      <div className="absolute left-0 top-[40px] w-full">
        <AuthTopBar title="이메일로 로그인" onBack={handleBack} />
      </div>

      <section className="absolute left-[15px] right-[15px] top-[130px] flex flex-col gap-[30px]">
        <AuthInput
          label="이메일"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />

        <div className="flex w-full flex-col gap-2">
          <AuthPasswordInput
            label="비밀번호"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setPasswordError('');
            }}
            autoComplete="current-password"
            errorMessage={passwordError}
          />
          <button
            type="button"
            onClick={() => navigate('/auth/find')}
            className="self-end text-body-02 font-regular leading-[1.4] text-gray-80 underline underline-offset-2"
          >
            비밀번호 찾기
          </button>
        </div>
      </section>

      <section className="absolute left-0 top-[449px] flex w-full flex-col items-center gap-2 text-center">
        <p className="text-body-01 font-regular leading-[1.4] text-gray-60">
          아직 계정이 없나요?
        </p>
        <button
          type="button"
          onClick={() => navigate('/auth/sign-up')}
          className="text-title-02 font-semibold leading-[1.4] text-primary-60 underline underline-offset-4"
        >
          이메일로 회원가입
        </button>
      </section>

      <div className="absolute bottom-[calc(var(--safe-bottom)+50px)] left-[15px] right-[15px]">
        <AuthButton onClick={handleLogin}>다음</AuthButton>
      </div>
    </main>
  );
}
