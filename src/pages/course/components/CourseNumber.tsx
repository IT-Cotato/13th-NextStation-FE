export default function CourseNumber({ number }: { number: number }) {
  return (
    <div className="flex items-center justify-center w-7 h-7 rounded-full border border-primary-50 bg-secondary-20">
      <p className="text-primary-60">{number}</p>
    </div>
  );
}
