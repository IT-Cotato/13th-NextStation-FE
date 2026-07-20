import { useMemo, useState } from "react";
import SearchIcon from '@/assets/search.svg?react';
import CloseIcon from '@/assets/close.svg?react';
import LineBadge from "./LineBadge";

export interface Station {
  id: number
  name: string
  lines: string[]
}

const stationList: Station[] = [
  { id: 1, name: '사당역', lines: ['2', '4'] },
  { id: 2, name: '서울역', lines: ['1', '4'] },
  { id: 3, name: '선릉역', lines: ['2'] },
]

interface SearchBarProps {
  selectedStation: Station | null;
  onSelectStation: (station: Station | null ) => void;
}

export default function SearchBar({ selectedStation, onSelectStation }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const suggestions = useMemo(() => {
    if (!query.trim()) return []

    return stationList.filter((station) =>
      station.name.includes(query.trim())
    )
  }, [query])

  const handleSelectStation = (station: Station) => {
    setQuery(station.name)
    onSelectStation(station);
  }

  const handleClear = () => {
    setQuery('')
    onSelectStation(null);
  }

  const showSuggestions =
    query.trim().length > 0 &&
    suggestions.length > 0 &&
    selectedStation?.name !== query

  const isSelected = selectedStation !== null

  return (
    <div className={[
        "w-[360px] rounded-lg ",
        showSuggestions ? "bg-white shadow-[0_0_28px_0_rgba(118,118,118,0.25)]" : ""
      ].join("")}
    >
      <div className="relative z-10 ">
        <div className={[
            "flex h-[50px] w-full items-center justify-between rounded-[20px] px-4 py-3",
            isSelected
              ? "border border-primary-50 bg-white"
              : showSuggestions
              ? "border border-primary-50 bg-white"
              : "border border-transparent bg-gray-20 focus-within:border-primary-50 focus-within:bg-white"
          ].join(" ")}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {isSelected && (
              <div className="flex shrink-0 items-center gap-1">
                {selectedStation.lines.map((line) => (
                  <LineBadge key={`${selectedStation.id}-${line}`} line={line} />
                ))}
              </div>
            )}

            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                onSelectStation(null);
              }}
              placeholder="나와 가장 가까운 지하철역 찾아보기"
              className={[
                "min-w-0 flex-1 bg-transparent outline-none text-body-01 leading-[1.4] tracking-[-0.025em]",
                isSelected ? "text-gray-100" : "text-gray-70"
              ].join(" ")}
            />
          </div>

          {query.length > 0 ? (
            <button
              type="button"
              onClick={handleClear}
              className="ml-3 flex shrink-0 items-center justify-center"
              aria-label="검색어 지우기"
            >
              <CloseIcon className="size-6" />
            </button>
          ) : (
            <div className="ml-3 flex shrink-0 items-center justify-center">
              <SearchIcon className="size-6" />
            </div>
          )}
        </div>
      </div>

      {showSuggestions && (
        <ul className="pb-2">
          {suggestions.map((station) => (
            <li key={station.id}>
              <button
                type="button"
                onClick={() => handleSelectStation(station)}
                className="flex w-full items-center gap-1 p-4 text-left"
              >
                <div className="flex items-center gap-1">
                  {station.lines.map((line) => (
                    <LineBadge key={`${station.id}-${line}`} line={line} />
                  ))}
                </div>

                <span className="text-body-01 text-gray-100 leading-[1.4] tracking-[-0.025em]">
                  {station.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}