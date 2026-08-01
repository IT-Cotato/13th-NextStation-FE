
interface SelectDropdownProps {
  onSelect: () => void;
}

export default function SelectDropdown({ onSelect }: SelectDropdownProps) {
  return (
    <div className="absolute right-0 top-[calc(100%+12px)] z-20">
      <button
        type="button"
        onClick={onSelect}
        className="relative flex min-w-[96px] items-center justify-start rounded-lg overflow-hidden rounded-[28px] border border-white/70 bg-linear-to-b from-white/30 to-white/10 px-5 py-4 shadow-[0_0_28px_rgba(118,118,118,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[22px] outline-none"
      >
        <div className="pointer-events-none absolute inset-x-2 top-1 h-[12px] rounded-full bg-white/25 blur-md" />
        <p className="relative text-body-01 font-semibold leading-[1.4] tracking-[-0.025em] text-gray-70">
          선택
        </p>
      </button>
    </div>
  )
}
