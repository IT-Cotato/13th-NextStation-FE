import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";
import type { SubwayLine } from "@/types/subway";
import Header from "@/components/Header";
import CloseIcon from "@/assets/close.svg?react";
import ArrowDown from "@/assets/arrow-down.svg?react";
import { getExploreCourses, getExploreMain, type ExploreCourse, type ExploreLine, type ExploreSort, type ExploreStation } from "@/api/explore";

type SortOption = "전체" | "최신순" | "인기순";

const sortOptions: Exclude<SortOption, "전체">[] = ["최신순", "인기순"];
const defaultLines: ExploreLine[] = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  name: `${index + 1}호선`,
  code: `LINE_${index + 1}`,
  hasCourses: false,
}));

export default function LineCoursesPage() {
  const goBack = useSafeBack();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedLine = Number(searchParams.get("line"));
  const line = requestedLine || 1;
  const [station, setStation] = useState<ExploreStation | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("전체");
  const [isStationMenuOpen, setIsStationMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const stationButtonRef = useRef<HTMLButtonElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const sortContainerRef = useRef<HTMLDivElement>(null);
  const stationDialogRef = useRef<HTMLElement>(null);
  const [lines, setLines] = useState<ExploreLine[]>(defaultLines);
  const [stationNames, setStationNames] = useState<ExploreStation[]>([]);
  const [courses, setCourses] = useState<ExploreCourse[]>([]);

  useEffect(() => {
    void getExploreMain().then((data) => {
      if (data.lines.length) setLines(data.lines);
      if (!requestedLine && data.selectedLineId) setSearchParams({ line: String(data.selectedLineId) }, { replace: true });
    });
  }, [requestedLine, setSearchParams]);

  useEffect(() => {
    const sort: ExploreSort = sortOption === "인기순" ? "POPULAR" : "LATEST";
    void getExploreCourses({ lineId: line, stationId: station?.stationId, sort, size: 50 }).then((data) => {
      setCourses(data.courses);
      if (data.availableStations.length) setStationNames(data.availableStations);
    }).catch(() => setCourses([]));
  }, [line, sortOption, station]);

  const handleLineChange = (nextLine: number) => {
    setStation(null);
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
    <main className="h-dvh min-h-0 overflow-y-auto bg-gray-10 text-gray-100 tracking-[-0.025em] [scrollbar-width:none]">
      <div className="flex h-[135px] flex-col items-start gap-4 px-[15px] pb-2.5 pt-[57px]">
        <div className="h-6 w-full"><Header className="grid h-6 w-full grid-cols-[24px_1fr_24px] items-center p-0" showBack onBackClick={goBack} /></div>
        <h1 className="m-0 text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">노선따라 둘러보기</h1>
      </div>

      <div
        className="flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[15px] py-2 [scrollbar-width:none] [touch-action:pan-x] focus:outline-none"
        role="group"
        aria-label="지하철 노선 선택"
        onWheel={(event) => {
          if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.currentTarget.scrollLeft += event.deltaY;
          }
        }}
      >
        {lines.map((item) => (
          <button
            type="button"
            aria-pressed={line === item.id}
            disabled={!item.hasCourses}
            className={`shrink-0 rounded-lg border px-4 py-[7px] text-body-01 leading-[1.4] tracking-[-0.35px] disabled:opacity-40 ${line === item.id ? "border-primary-50 bg-primary-50 font-semibold text-gray-10" : "border-gray-50 bg-transparent text-gray-90"}`}
            onClick={() => handleLineChange(item.id)}
            key={item.id}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex items-start justify-between px-[15px] py-2">
        <button
          ref={stationButtonRef}
          type="button"
              className="flex h-9 min-w-[111px] items-end justify-between gap-3 rounded-lg border border-white bg-white/50 px-5 py-2 text-body-01 font-semibold leading-[1.4] text-gray-70 backdrop-blur-[10px]"
          aria-haspopup="dialog"
          aria-expanded={isStationMenuOpen}
          onClick={() => {
            setIsSortMenuOpen(false);
            setIsStationMenuOpen(true);
          }}
        >
          {station?.stationName || "역 선택"}
          <ArrowDown className={`size-5 shrink-0 transition-transform ${isStationMenuOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true" />
        </button>

        <div className="flex flex-col items-end gap-3" ref={sortContainerRef}>
          <button
            ref={sortButtonRef}
            type="button"
              className="flex h-9 min-w-24 items-end justify-between gap-3 rounded-lg border border-white bg-white/50 px-5 py-2 text-body-01 font-semibold leading-[1.4] text-gray-70 backdrop-blur-[10px]"
            aria-haspopup="menu"
            aria-expanded={isSortMenuOpen}
            onClick={() => {
              setIsStationMenuOpen(false);
              setIsSortMenuOpen((open) => !open);
            }}
          >
            {sortOption}
            <ArrowDown className={`size-5 shrink-0 transition-transform ${isSortMenuOpen ? "rotate-180" : "rotate-0"}`} aria-hidden="true" />
          </button>
          {isSortMenuOpen && (
            <div className="z-10 -mb-[104px] flex w-24 flex-col items-start justify-end gap-3 rounded-lg bg-white/50 px-5 py-4 shadow-[0_0_28px_rgb(118_118_118/25%)] backdrop-blur-[10px] outline outline-1 outline-offset-[-1px] outline-white" role="menu">
              {sortOptions.map((option) => (
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={sortOption === option}
                  className={`w-full border-0 bg-transparent p-0 text-left text-body-01 font-semibold leading-5 text-gray-70`}
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

      <section className="flex flex-col gap-3 px-[15px] py-7" aria-label={`${line}호선 코스 목록`}>
        {courses.map((course) => (
            <ExploreCourseItem
              key={course.courseId}
              courseId={course.courseId}
              line={course.line?.id as SubwayLine | undefined}
              stationName={course.stationName}
              name={course.name}
              tags={course.tags}
              likeCount={course.likeCount}
              isLiked={course.isLiked}
              imageUrl={course.imageUrl}
            />
          ))}
      </section>

      {isStationMenuOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-gray-100/15 px-[15px] pb-[50px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsStationMenuOpen(false);
            }
          }}
        >
          <section
            ref={stationDialogRef}
            className="flex max-h-[calc(100dvh-48px)] w-[360px] max-w-full flex-col items-center justify-start gap-3 rounded-lg bg-white/50 px-6 pb-8 pt-6 shadow-[0_0_28px_rgb(118_118_118/25%)] backdrop-blur-[10px] outline outline-1 outline-offset-[-1px] outline-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="station-menu-title"
          >
            <div className="flex w-full items-center justify-between pb-3 pt-2">
              <h2 className="m-0 text-subtitle font-semibold leading-[1.4] text-gray-70" id="station-menu-title">역 선택</h2>
              <button
                className="size-[23px] border-0 bg-transparent p-0"
                type="button"
                onClick={() => setIsStationMenuOpen(false)}
                aria-label="역 선택 닫기"
              >
                <CloseIcon className="size-[23px]" aria-hidden="true" />
              </button>
            </div>
            <div className="flex max-h-[250px] w-full flex-col items-start gap-4 overflow-y-auto [scrollbar-width:none]">
              <button
                type="button"
                className={`w-full border-0 bg-transparent p-0 text-left text-subtitle font-semibold leading-[1.4] ${!station ? "text-gray-100" : "text-gray-60"}`}
                onClick={() => {
                  setStation(null);
                  setIsStationMenuOpen(false);
                }}
              >
                전체
              </button>
              {stationNames.map((stationItem) => (
                <button
                  type="button"
                  disabled={!stationItem.hasCourses}
                  className={`w-full border-0 bg-transparent p-0 text-left text-subtitle font-semibold leading-[1.4] ${station?.stationId === stationItem.stationId ? "text-gray-100" : "text-gray-60"} disabled:opacity-40`}
                  onClick={() => {
                    setStation(stationItem);
                    setIsStationMenuOpen(false);
                  }}
                  key={stationItem.stationId}
                >
                  {stationItem.stationName.replace(/역$/, "")}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

    </main>
  );
}
