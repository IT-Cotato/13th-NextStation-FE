import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useSafeBack(fallback = "/explore") {
  const navigate = useNavigate();

  return useCallback(() => {
    const historyIndex: unknown = window.history.state?.idx;

    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(fallback, { replace: true });
  }, [fallback, navigate]);
}
