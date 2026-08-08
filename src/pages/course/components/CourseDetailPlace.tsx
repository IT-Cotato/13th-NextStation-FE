import ArrowNext from "@/assets/arrow-next(gray).svg?react";
import CardDefault from "@/assets/card-default.svg?react";
import type { CourseDetailPlaceData } from "@/api/courseDetail";

export default function CourseDetailPlace({
  place,
}: {
  place: CourseDetailPlaceData;
}) {
  const thumbnail = place.imageUrl ? (
    <img
      className="size-[100px] shrink-0 bg-secondary-20 object-cover"
      src={place.imageUrl}
      alt=""
    />
  ) : (
    <CardDefault className="size-[100px] shrink-0" aria-hidden="true" />
  );

  const content = (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <strong className="truncate text-body-01 font-semibold leading-[1.4] tracking-[-0.025em]">
          {place.name}
        </strong>
        <ArrowNext className="size-5 shrink-0" aria-hidden="true" />
      </div>
      <p className="whitespace-pre-line text-caption leading-[1.4] text-gray-70">
        {place.description}
      </p>
    </div>
  );

  return (
    <article
      className={`flex min-h-[132px] items-center gap-6 px-8 py-4 ${place.imagePosition === "left" ? "flex-row" : "flex-row-reverse"}`}
    >
      {thumbnail}
      {content}
    </article>
  );
}
