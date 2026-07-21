import { toast } from "react-toastify";

interface ToastProps {
  message: string;
}

export const showToast = ({ message }: ToastProps) => {
  toast(message, {
    position: "top-center",
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
  });
};
