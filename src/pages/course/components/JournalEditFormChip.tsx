interface JournalEditFormChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function JournalEditFormChip({
  label,
  selected,
  onClick,
}: JournalEditFormChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center px-3 py-2 rounded-lg outline-none border ${selected ? "border-primary-50 bg-primary-50" : "border-gray-50"}`}
    >
      <span
        className={`text-body-02 leading-[1.4] tracking-[-0.3px] text-center ${selected ? "text-gray-10" : "text-gray-70"}`}
      >
        {label}
      </span>
    </button>
  );
}
