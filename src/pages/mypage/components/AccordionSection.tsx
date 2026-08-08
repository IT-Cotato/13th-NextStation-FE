import SettingArrow from "@/assets/setting-arrow.svg?react";

type MenuItem = {
  label: string;
  onClick?: () => void;
};

export default function AccordionSection({
  title,
  items,
  isOpen,
  onToggle,
}: {
  title: string;
  items: MenuItem[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onToggle}
        className={`flex justify-between items-center py-1 ${isOpen ? "border-b border-gray-50" : ""}`}
      >
        <span className="text-body-01 text-gray-70 font-semibold leading-[1.4] tracking-[-0.35px]">
          {title}
        </span>
        <SettingArrow
          className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>
      <div
        className="grid transition-all duration-300"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-3 pt-3 pb-2">
            {items.map((item) => (
              <li
                key={item.label}
                className="text-body-01 text-gray-70 font-semibold leading-[1.4] tracking-[-0.35px]"
                onClick={item.onClick}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
