import EditPen from "@/assets/edit-pen.svg?react";
import { useEffect, useRef, useState } from "react";

export default function NameEditInput({
  value,
  onChange,
  disabled = false,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    if (disabled) return;

    setIsEditing((prev) => {
      const next = !prev;
      if (next) setPlaceholder(value);
      return next;
    });
  };

  useEffect(() => {
    if (disabled) {
      setIsEditing(false);
    }
  }, [disabled]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  return (
    <div
      className={`flex relative items-center rounded-lg p-2.5 bg-white border border-gray-40 font-semibold placeholder:text-gray-50 ${className} `}
    >
      <input
        className="w-full text-center outline-none text-subtitle font-semibold leading-[1.4] tracking-[-0.4px] placeholder:text-gray-50 caret-primary-50"
        readOnly={!isEditing || disabled}
        disabled={disabled}
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setIsEditing(false);
        }}
      />
      <div
        className={`absolute right-3 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={handleEditToggle}
      >
        <EditPen className="w-6 h-6 text-gray-70" />
      </div>
    </div>
  );
}
