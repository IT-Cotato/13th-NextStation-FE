interface SubwayLineChipProps {
  label: string;
  variant?: 'primary' | 'secondary';
}

const variantStyles = {
  primary: 'bg-primary-30',
  secondary: 'bg-gray-30',
};

export default function SubwayLineChip({ 
  label,
   variant = 'primary',
}: SubwayLineChipProps) {
  return (
    <div className={`
      flex items-center justify-center rounded-lg px-4 py-2
      ${variantStyles[variant]}
      `}
    >
      <p className="whitespace-nowrap text-body-01 text-gray-100 leading-[1.4] tracking-[-0.025em] text-center">
        {label}
      </p>
    </div>
  )
}