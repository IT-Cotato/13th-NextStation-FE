import type { ReactNode } from "react";

export default function CardActionButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-center items-center border border-primary-50 rounded-lg px-3 py-1 text-primary-60 text-body-02"
    >
      {children}
    </button>
  );
}
