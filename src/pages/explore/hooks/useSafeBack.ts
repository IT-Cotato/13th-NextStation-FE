import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useSafeBack(fallback = "/explore") {
  const navigate = useNavigate();

  return useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallback, { replace: true });
  }, [fallback, navigate]);
}
