import type { ReactNode } from "react";

export default function CardActionButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className="flex justify-center items-center border border-primary-50 rounded-lg px-3 py-1"
      onClick={onClick}
    >
      <span className="text-primary-60 text-body-02">{children}</span>
    </div>
  );
}
