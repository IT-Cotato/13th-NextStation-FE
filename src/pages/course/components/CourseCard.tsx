import CulturalSpace from "@/assets/category/cultural-space.svg?react";
import Cafe from "@/assets/category/cafe.svg?react";
import Restaurant from "@/assets/category/restaurant.svg?react";
import Walk from "@/assets/category/walk.svg?react";
import ArrowNext from "@/assets/arrow-next(gray).svg?react";

export default function CourseCard({
  name,
  description,
  category,
  isActive,
  width = 319, // 디폴트 값
}: {
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  width?: number;
}) {
  return (
    <div
      style={{ width }}
      className={`flex items-center gap-3 px-3 py-3 border rounded-lg ${isActive ? "border-primary-50 bg-secondary-10" : "border-gray-40 bg-white"}`}
    >
      <div className="flex items-center justify-center w-[67px] h-[50px] bg-gray-30 rounded-md">
        {category === "CULTURE" ? (
          <CulturalSpace className="w-[32px]" />
        ) : category === "CAFE" ? (
          <Cafe className="w-[32px]" />
        ) : category === "FOOD" ? (
          <Restaurant className="w-[32px]" />
        ) : (
          <Walk className="w-[32px]" />
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <p className="text-subtitle font-semibold leading-[1.4] tracking-[-0.4px]">
          {name}
        </p>
        <p className="text-body-02 text-gray-70 leading-[1.4] tracking-[-0.35px] align-items truncate">
          {description}
        </p>
      </div>
      <div className="px-1.5">
        <ArrowNext />
      </div>
    </div>
  );
}
