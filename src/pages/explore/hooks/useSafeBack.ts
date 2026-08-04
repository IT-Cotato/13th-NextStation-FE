import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useSafeBack(fallback = "/explore") {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    if (location.key !== "default") {
      navigate(-1);
      return;
    }

    navigate(fallback, { replace: true });
  }, [fallback, location.key, navigate]);
}
