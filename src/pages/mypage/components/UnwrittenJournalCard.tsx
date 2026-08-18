import TagChip from "@/pages/place/components/TagChip";
import { STATION_STAMP_MAP } from "@/data/stampMaps";
import type { Course } from "@/api/journal";
import { formatAcquiredAtToDisplayDate } from "@/utils/logDate";
import LineBadge from "@/components/LineBadge";
import {
  TRAVEL_STYLE_LABELS,
  type RecommendationTravelStyle,
} from "@/api/recommendation";
import type { SubwayLine } from "@/types/subway";

export default function UnwrittenJournalCard({
  course,
  disabled,
  onClick,
}: {
  course: Course;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const StampIcon = STATION_STAMP_MAP[course.stationName] ?? null;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex items-center gap-4 p-3 w-[360px] bg-white rounded-lg text-left disabled:opacity-50"
    >
      {/* stamp */}
      <div>{StampIcon && <StampIcon className="size-16" />}</div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <LineBadge line={course.line.id as SubwayLine} />
              <span>{course.stationName}</span>
            </div>
            <span className="text-caption leading-[1.4] tracking-[-0.25px] text-gray-70">
              {formatAcquiredAtToDisplayDate(course.acquiredAt)}
            </span>
          </div>
          <p className="text-body-01 font-semibold leading-[1.4] tracking-[-0.35px] text-gray-100 line-clamp-2">
            {course.courseName}
          </p>
        </div>
        <div className="flex gap-1">
          {course.tags.map((tag) => (
            <TagChip
              key={tag}
              content={
                TRAVEL_STYLE_LABELS[tag as RecommendationTravelStyle] ?? tag
              }
            />
          ))}
        </div>
      </div>
    </button>
  );
}
