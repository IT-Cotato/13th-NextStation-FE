import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashIcon from '@/assets/splash.svg?react';

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate("/main", { replace: true });
    }, 1500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <main className="flex h-dvh bg-white items-center justify-center">
        <SplashIcon className='w-[230px]'/>
    </main>
  )

}

export default SplashPage
