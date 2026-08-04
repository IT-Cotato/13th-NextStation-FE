import type { FormEvent } from "react";
import SearchIcon from "@/assets/search.svg?react";

interface ExploreSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
  ariaLabel?: string;
  className?: string;
}

export default function ExploreSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  ariaLabel = "코스 검색",
  className = "",
}: ExploreSearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      className={`explore-search ${className}`.trim()}
      role="search"
      onSubmit={handleSubmit}
    >
      <SearchIcon className="size-5 shrink-0" aria-hidden="true" />
      <input
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </form>
  );
}
