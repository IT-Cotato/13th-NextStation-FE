export default function MapMarker({ number }: { number: number }) {
  return (
    <div className="flex items-center justify-center w-7 h-7 rounded-full border border-primary-50 bg-secondary-20 shadow-[0_0_8px_0_rgba(0,0,0,0.25)]">
      <p className="text-primary-60">{number}</p>
    </div>
  );
}
