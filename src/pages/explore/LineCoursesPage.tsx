import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { stationsByLine } from "@/mocks/StationByLine";
import Header from "@/components/Header";
import type { SubwayLine } from "@/types/subway";
import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";
import "./LineCoursesPage.css";

type SortOption = "전체" | "인기순" | "최신순";

const lines: SubwayLine[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const sortOptions: Exclude<SortOption, "전체">[] = ["최신순", "인기순"];

export default function LineCoursesPage() {
  const goBack = useSafeBack();
  const [searchParams, setSearchParams] = useSearchParams();
  const [line, setLine] = useState<SubwayLine>(() => {
    const requestedLine = Number(searchParams.get("line"));
    return lines.includes(requestedLine as SubwayLine)
      ? (requestedLine as SubwayLine)
      : 1;
  });
  const [station, setStation] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("전체");
  const [isStationMenuOpen, setIsStationMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const stationButtonRef = useRef<HTMLButtonElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const sortContainerRef = useRef<HTMLDivElement>(null);
  const stationDialogRef = useRef<HTMLElement>(null);
  const stationNames = stationsByLine[`${line}호선`];
  const visibleStations = useMemo(
    () => (station ? stationNames.filter((name) => name === station) : stationNames),
    [station, stationNames],
  );
  const courseStations =
    visibleStations.length > 0 ? visibleStations : stationNames;

  const handleLineChange = (nextLine: SubwayLine) => {
    setLine(nextLine);
    setStation("");
    setSearchParams({ line: String(nextLine) }, { replace: true });
  };

  useEffect(() => {
    if (!isSortMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!sortContainerRef.current?.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSortMenuOpen(false);
        sortButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSortMenuOpen]);

  useEffect(() => {
    if (!isStationMenuOpen) {
      return undefined;
    }

    const dialog = stationDialogRef.current;
    const focusableElements = dialog?.querySelectorAll<HTMLElement>("button");
    focusableElements?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsStationMenuOpen(false);
        stationButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isStationMenuOpen]);

  return (
    <main className="line-courses-page pt-[calc(var(--safe-top)+12px)]">
      <Header showBack onBackClick={goBack} />
      <h1 className="px-[15px] pb-[5px] text-headline font-semibold leading-[1.4]">
        노선따라 둘러보기
      </h1>

      <div
        className="line-courses-tabs"
        role="tablist"
        aria-label="지하철 노선 선택"
        tabIndex={0}
        onWheel={(event) => {
          if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.currentTarget.scrollLeft += event.deltaY;
          }
        }}
      >
        {lines.map((number) => (
          <button
            type="button"
            role="tab"
            aria-selected={line === number}
            className={line === number ? "is-active" : ""}
            onClick={() => handleLineChange(number)}
            key={number}
          >
            {number}호선
          </button>
        ))}
      </div>

      <div className="line-courses-filters">
        <button
          ref={stationButtonRef}
          type="button"
          className="line-courses-filter"
          aria-haspopup="dialog"
          aria-expanded={isStationMenuOpen}
          onClick={() => {
            setIsSortMenuOpen(false);
            setIsStationMenuOpen(true);
          }}
        >
          {station || "역 선택"}
          <span aria-hidden="true" />
        </button>

        <div className="line-courses-sort" ref={sortContainerRef}>
          <button
            ref={sortButtonRef}
            type="button"
            className="line-courses-filter"
            aria-haspopup="menu"
            aria-expanded={isSortMenuOpen}
            onClick={() => {
              setIsStationMenuOpen(false);
              setIsSortMenuOpen((open) => !open);
            }}
          >
            {sortOption}
            <span className={isSortMenuOpen ? "is-open" : ""} aria-hidden="true" />
          </button>
          {isSortMenuOpen && (
            <div className="line-courses-sort__menu" role="menu">
              {sortOptions.map((option) => (
                <button
                  type="button"
                  role="menuitem"
                  className={sortOption === option ? "is-selected" : ""}
                  onClick={() => {
                    setSortOption(option);
                    setIsSortMenuOpen(false);
                  }}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="line-courses-list" aria-label={`${line}호선 코스 목록`}>
        {courseStations.map((stationName, index) => (
            <ExploreCourseItem
              key={`${line}-${stationName}-${index}`}
              line={line}
              stationName={stationName}
              imageSrc={index === 0 ? "/explore/line-course-sky.png" : undefined}
            />
          ))}
      </section>

      {isStationMenuOpen && (
        <div
          className="line-courses-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsStationMenuOpen(false);
            }
          }}
        >
          <section
            ref={stationDialogRef}
            className="line-courses-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="station-menu-title"
          >
            <div className="line-courses-modal__header">
              <h2 id="station-menu-title">역 선택</h2>
              <button
                type="button"
                onClick={() => setIsStationMenuOpen(false)}
                aria-label="역 선택 닫기"
              >
                <span aria-hidden="true" />
              </button>
            </div>
            <div className="line-courses-stations">
              <button
                type="button"
                className={!station ? "is-active" : ""}
                onClick={() => {
                  setStation("");
                  setIsStationMenuOpen(false);
                }}
              >
                전체
              </button>
              {stationNames.map((stationName) => (
                <button
                  type="button"
                  className={station === stationName ? "is-active" : ""}
                  onClick={() => {
                    setStation(stationName);
                    setIsStationMenuOpen(false);
                  }}
                  key={stationName}
                >
                  {stationName.replace(/역$/, "")}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

    </main>
  );
}
