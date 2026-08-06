import type { ExploreCourseLine } from "@/api/explore";

const LINE_STYLES: Record<number, string> = {
  1: "bg-subway-1-dark text-subway-1-light",
  2: "bg-subway-2-dark text-subway-2-light",
  3: "bg-subway-3-dark text-subway-3-light",
  4: "bg-subway-4-dark text-subway-4-light",
  5: "bg-subway-5-dark text-subway-5-light",
  6: "bg-subway-6-dark text-subway-6-light",
  7: "bg-subway-7-dark text-subway-7-light",
  8: "bg-subway-8-dark text-subway-8-light",
  9: "bg-subway-9-dark text-subway-9-light",
};

interface ExploreLineBadgeProps {
  line: ExploreCourseLine;
}

export default function ExploreLineBadge({ line }: ExploreLineBadgeProps) {
  const label = line.name.endsWith("호선")
    ? line.name.slice(0, -2)
    : line.name.replace("선", "");

  return (
    <span
      className={`inline-flex min-h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-body-01 font-semibold ${LINE_STYLES[line.id] ?? "bg-gray-70 text-white"}`}
      aria-label={line.name}
    >
      {label}
    </span>
  );
}
