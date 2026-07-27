import TagChip from "./TagChip";
import LineBadge, { type SubwayLine } from "@/components/LineBadge";

export default function CoursePreviewCard({
  line,
  name,
  placeCount,
  travelDuration,
  tags,
  imageUrl,
}: {
  line: number;
  name: string;
  placeCount: number;
  travelDuration: string; // 추후 매핑 필요
  tags: string[];
  imageUrl: string | null;
}) {
  return (
    <div className="flex justify-center">
      <div className="relative w-[144px] h-[200px] rounded-lg overflow-hidden shadow-[0_0_20px_0_rgba(118,118,118,0.2)]">
        <img
          src={
            imageUrl === null
              ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7z50yHLlZku4h0dKDuozhC8fbHcdO88iKgv8cvL_6Vw&s=10`
              : imageUrl
          }
          alt={name}
          className="absolute inset-0 w-full h-full rounded-lg object-cover"
        />
        <div className="absolute rounded-lg inset-0 bg-gradient-to-b from-transparent from-40% to-white to-100%" />

        <div className="relative flex flex-col h-full pt-[15px] pl-[16px] pb-[18px] pr-[25px] justify-between">
          {/* 호선 뱃지 */}
          <LineBadge line={line as SubwayLine} />

          {/* course info */}
          <div className="flex flex-col gap-2">
            <p className="text-subtitle font-semibold line-clamp-2 break-keep leading-[1.4] tracking-[-0.4px]">
              {name}
            </p>
            <span className="text-caption text-gray-80 leading-none tracking-[-0.25px]">
              장소 {placeCount}곳 ∙ {travelDuration}
            </span>
            <div className="flex gap-1">
              {tags.map((tag, index) => (
                <TagChip key={`${index}`} content={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
