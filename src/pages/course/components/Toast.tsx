import { ToastContainer } from "react-toastify";

export default function Toast() {
  return (
    <ToastContainer
      className="pt-3"
      closeButton={false}
      toastClassName="!flex !px-5 !py-3 !min-h-0 !w-fit !justify-center !rounded-full !bg-linear-to-r !from-secondary-50 !to-primary-50 !shadow-none !text-white !font-semibold !text-center"
    />
  );
}
