import { useState } from "react";
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

  return (
    <div className="z-10 flex flex-col items-end gap-3">
      <button
        className="flex h-9 min-w-24 items-end justify-between gap-3 rounded-lg border border-white bg-white/50 px-5 py-2 text-body-01 font-semibold text-gray-70 backdrop-blur-[10px]"
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {value}
        <ArrowDown
          className={`size-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div
          className="-mb-[104px] flex w-24 flex-col items-start gap-3 rounded-lg bg-white/50 px-5 py-4 shadow-[0_0_28px_rgb(118_118_118/25%)] backdrop-blur-[10px] outline outline-1 outline-offset-[-1px] outline-white"
          role="menu"
        >
          {options.map((option) => (
            <button
              type="button"
              role="menuitemradio"
              aria-checked={value === option}
              className="w-full border-0 bg-transparent p-0 text-left text-body-01 font-semibold leading-[1.4] text-gray-70"
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
