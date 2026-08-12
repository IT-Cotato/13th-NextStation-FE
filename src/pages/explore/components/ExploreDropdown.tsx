import { useEffect, useRef, useState } from "react";
import ArrowDown from "@/assets/arrow-down.svg?react";

interface ExploreDropdownProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

export default function ExploreDropdown<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: ExploreDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="z-10 flex flex-col items-end" ref={containerRef}>
      <button
        ref={buttonRef}
        className="flex h-9 w-24 items-end justify-between gap-3 rounded-lg border border-white bg-white/50 px-[19px] py-2 text-body-01 font-semibold text-gray-70 backdrop-blur-[10px]"
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="shrink-0 whitespace-nowrap">{value}</span>
        <ArrowDown
          className={`size-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="z-10 h-0 w-24 overflow-visible">
          <div
            className="mt-3 flex w-24 flex-col items-start gap-3 rounded-lg bg-white/50 px-5 py-4 shadow-[0_0_28px_rgb(118_118_118/25%)] backdrop-blur-[10px] outline outline-1 outline-offset-[-1px] outline-white"
            role="menu"
          >
            {options.map((option) => (
              <button
                type="button"
                role="menuitemradio"
                aria-checked={option === value}
                className="w-full border-0 bg-transparent p-0 text-left text-body-01 font-semibold leading-[1.4] text-gray-70"
                key={option}
                onClick={() => {
                  if (option !== value) onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
