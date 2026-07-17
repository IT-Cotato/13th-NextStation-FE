const CATEGORIES = ["문화공간", "식당", "카페", "산책 포인트"];

const categoryColorMap: Record<string, string> = {
  active: "bg-primary-50 border border-white text-gray-10 font-semibold",
  inactive: "border border-gray-50 text-gray-90 ",
};

export default function CourseCategory({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (category: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {CATEGORIES.map((cat) => {
        const isChecked = selected === cat;
        const currentClass = isChecked
          ? categoryColorMap["active"]
          : categoryColorMap["inactive"];

        return (
          <label
            key={cat}
            className={`px-4 py-2 text-body-02 rounded-[20px] ${currentClass}`}
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
