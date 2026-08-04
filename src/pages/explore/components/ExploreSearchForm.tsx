import type { ChangeEventHandler, ReactNode } from "react";

interface ExploreSearchFormProps {
  ariaLabel?: string;
  className?: string;
  defaultValue?: string;
  icon?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmit: (query: string) => void;
  placeholder?: string;
  value?: string;
}

export default function ExploreSearchForm({
  ariaLabel = "코스 검색",
  className,
  defaultValue,
  icon,
  onChange,
  onSubmit,
  placeholder,
  value,
}: ExploreSearchFormProps) {
  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit(String(formData.get("query") ?? "").trim());
      }}
    >
      {icon}
      <input
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        name="query"
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onSubmit(event.currentTarget.value.trim());
          }
        }}
        placeholder={placeholder}
        value={value}
      />
    </form>
  );
}
