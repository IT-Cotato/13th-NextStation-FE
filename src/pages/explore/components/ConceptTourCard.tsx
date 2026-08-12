import type { ComponentType, SVGProps } from "react";
import CourseCountIcon from "@/assets/explore/course-count.svg?react";

interface ConceptTourCardProps {
  Artwork: ComponentType<SVGProps<SVGSVGElement>>;
  artworkClassName: string;
  courseCount: number;
  description: string;
  name: string;
  onClick: () => void;
}

export default function ConceptTourCard({
  Artwork,
  artworkClassName,
  courseCount,
  description,
  name,
  onClick,
}: ConceptTourCardProps) {
  return (
    <button
      type="button"
      className="flex h-52 flex-col overflow-hidden rounded-lg border-0 bg-white p-4 text-left shadow-[0_0_20px_rgb(118_118_118/10%)] outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
      onClick={onClick}
    >
      <span className="flex h-[74px] w-full shrink-0 justify-end">
        <Artwork
          className={`-mr-3 -mt-2 shrink-0 object-contain ${artworkClassName}`}
          aria-hidden="true"
        />
      </span>
      <span className="flex min-h-0 flex-1 flex-col items-start gap-2">
        <p className="whitespace-nowrap text-title-01 font-semibold leading-[1.4] tracking-[-0.025em]">
          {name}
        </p>
        <p className="whitespace-pre-line text-body-01 leading-[1.4] tracking-[-0.025em] text-gray-70">
          {description}
        </p>
        <span className="mt-auto flex items-center gap-2 text-caption leading-none text-gray-60">
          <CourseCountIcon
            className="size-[18px] shrink-0"
            aria-hidden="true"
          />
          코스 {courseCount}개
        </span>
      </span>
    </button>
  );
}
