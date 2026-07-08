interface SubwayLineChipProps {
  label: string;
}

export default function SubwayLineChip({ label }: SubwayLineChipProps) {
  return (
    <div className="flex items-center justify-center rounded-lg px-4 py-2 bg-primary-30">
      <p className="text-body-01 text-gray-100 leading-[1.4] tracking-[-0.025em] text-center">
        {label}
      </p>
    </div>
  )
}