interface TimeChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}
export default function TimeChip({ label, selected = false, onClick }: TimeChipProps) {
  return(
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center px-4 py-2 rounded-lg border outline-none
        ${
          selected
           ? 'bg-secondary-20 border-secondary-40'
           : 'bg-gray-20 border-gray-40'
        }
      `}
    >
      <span
        className={`
          text-body-01 leading-[1.4] tracking-[-0.025em] text-center
          ${selected? 'text-primary-80' : 'text-gray-70'}
        `}
      >
        {label}
      </span>
    </button>
  )
}