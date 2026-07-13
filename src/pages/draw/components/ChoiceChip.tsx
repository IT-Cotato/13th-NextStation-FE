interface ChoiceChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}
export default function ChoiceChip({ label, selected = false, onClick }: ChoiceChipProps) {
  return(
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-[110px] items-center justify-center px-6 py-3 rounded-lg border
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