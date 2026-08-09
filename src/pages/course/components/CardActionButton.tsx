import type { ReactNode } from "react";

export default function CardActionButton({
  isCompleted = false,
  children,
  onClick,
}: {
  isCompleted?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  const style = isCompleted
    ? "border-gray-40 text-gray-60"
    : "border-primary-50 text-primary-60";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isCompleted}
      className={`${style} flex justify-center items-center border rounded-lg px-3 py-1 text-body-02 outline-none leading-[1.4] tracking-[-0.3px]`}
    >
      {children}
    </button>
  );
}
