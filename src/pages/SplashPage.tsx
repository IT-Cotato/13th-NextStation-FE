import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import SplashIcon from '@/assets/splash.svg?react';

function SplashPage() {
  const navigate = useNavigate();
  const { isChecking } = useAuth();
  const [isMinimumDelayPassed, setIsMinimumDelayPassed] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsMinimumDelayPassed(true);
    }, 1500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (isChecking || !isMinimumDelayPassed) {
      return;
    }

    navigate("/main", { replace: true });
  }, [isChecking, isMinimumDelayPassed, navigate]);

  return (
    <main className="flex h-dvh bg-white items-center justify-center">
        <SplashIcon className='w-[230px]'/>
    </main>
  )

}

export default SplashPage
