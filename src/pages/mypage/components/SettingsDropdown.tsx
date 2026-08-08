import { useState } from "react";
import AccordionSection from "./AccordionSection";

type MenuItem = {
  label: string;
  onClick?: () => void;
};

type MenuSection = {
  id: string;
  title: string;
  items: MenuItem[];
};

export default function SettingsDropdown({
  sections,
  onClose,
}: {
  sections: MenuSection[];
  onClose: () => void;
}) {
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setOpenSectionIds((prev) =>
      prev.includes(id)
        ? prev.filter((sectionId) => sectionId !== id)
        : [...prev, id],
    );
  };

  return (
    <>
      <div
        role="presentation"
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div className="absolute right-0 top-[calc(100%+8px)] z-50 flex flex-col px-5 py-4 gap-3 bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
        {sections.map((section) => (
          <AccordionSection
            key={section.id}
            title={section.title}
            items={section.items}
            isOpen={openSectionIds.includes(section.id)}
            onToggle={() => toggleSection(section.id)}
          />
        ))}
      </div>
    </>
  );
}
