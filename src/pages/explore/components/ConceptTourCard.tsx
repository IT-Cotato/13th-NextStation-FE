import courseCountIcon from "@/assets/explore/course-count.svg";

interface ConceptTourCardProps {
  artwork: string;
  artworkHeight: number;
  artworkWidth: number;
  courseCount: number;
  description: string;
  name: string;
  onClick: () => void;
}

export default function ConceptTourCard({
  artwork,
  artworkHeight,
  artworkWidth,
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
        <img
          className="-mr-3 -mt-2 shrink-0 object-contain"
          src={artwork}
          alt=""
          width={artworkWidth}
          height={artworkHeight}
        />
      </span>
      <span className="flex min-h-0 flex-1 flex-col items-start gap-2">
        <strong className="block max-w-full text-title-01 font-semibold leading-[1.4] tracking-[-0.5px] [overflow-wrap:anywhere] max-[360px]:text-title-02">
          {name}
        </strong>
        <span className="whitespace-pre-line text-body-01 leading-[1.4] tracking-[-0.35px] text-gray-70 max-[360px]:text-body-02">
          {description}
        </span>
        <small className="flex items-center gap-2 text-caption font-normal leading-none text-gray-60">
          <img className="size-[18px] shrink-0" src={courseCountIcon} alt="" />
          코스 {courseCount}개
        </small>
      </span>
    </button>
  );
}
