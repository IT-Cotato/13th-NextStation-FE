import type { ChangeEventHandler } from "react";
import SearchIcon from "@/assets/search.svg?react";

interface ExploreSearchBarProps {
  ariaLabel?: string;
  className?: string;
  defaultValue?: string;
  inputClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmit: (query: string) => void;
  placeholder?: string;
  value?: string;
}

export default function ExploreSearchBar({
  ariaLabel = "코스 검색",
  className,
  defaultValue,
  inputClassName,
  onChange,
  onSubmit,
  placeholder,
  value,
}: ExploreSearchBarProps) {
  return (
    <form
      className={className}
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit(String(formData.get("query") ?? "").trim());
      }}
    >
      <SearchIcon className="size-5 shrink-0" aria-hidden="true" />
      <input
        className={inputClassName}
        aria-label={ariaLabel}
        defaultValue={defaultValue}
        name="query"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </form>
  );
}
