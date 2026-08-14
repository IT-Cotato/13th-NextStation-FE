// 장소/역 카테고리 (필터 탭)

const categoryColorMap: Record<string, string> = {
  active: "bg-primary-50 border border-primary-50 text-white font-semibold",
  inactive: "border border-gray-50 text-gray-90",
};

export default function CategoryTabs({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((cat) => {
        const isChecked = selected === cat;
        const currentClass = isChecked
          ? categoryColorMap["active"]
          : categoryColorMap["inactive"];

        return (
          <label
            key={cat}
            className={`shrink-0 px-4 py-2 text-body-01 leading-[1.4] tracking-[-0.35px] rounded-lg whitespace-nowrap ${currentClass}`}
          >
            {" "}
            <input
              type="radio"
              name="course-cateogry"
              value={cat}
              checked={isChecked}
              onChange={() => onSelect(cat)}
              className="hidden"
            />
            {cat}
          </label>
        );
      })}
    </div>
  );
}
