export default function TagChip({ content }: { content: string }) {
  return (
    <div className="flex px-2 py-1 bg-gray-20 items-center justify-center rounded-lg">
      <span className="text-gray-80 text-caption leading-none tracking-[-0.25px]">
        #{content}
      </span>
    </div>
  );
}
