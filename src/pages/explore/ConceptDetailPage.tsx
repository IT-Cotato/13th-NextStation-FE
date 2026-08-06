import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import ExploreCourseItem from "./components/ExploreCourseItem";
import { conceptDetails } from "./data/conceptDetails";
import Header from "@/components/Header";
import ArrowDown from "@/assets/arrow-down.svg?react";
import { getConceptTourCourses, getConceptTours, type ConceptTour, type ExploreCourse, type ExploreSort } from "@/api/explore";
import type { SubwayLine } from "@/types/subway";

type ExploreSortOption = "전체" | "최신순" | "인기순";

export default function ConceptDetailPage() {
  const goBack = useSafeBack("/explore/concepts");
  const { conceptId = "1" } = useParams();
  const numericConceptId = Number(conceptId) || 1;
  const designs = Object.values(conceptDetails);
  const detail = designs[(numericConceptId - 1) % designs.length];
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<ExploreSortOption>("전체");
  const [tour, setTour] = useState<ConceptTour | null>(null);
  const [courses, setCourses] = useState<ExploreCourse[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    void getConceptTours().then((items) => setTour(items.find((item) => item.conceptTourId === numericConceptId) ?? null));
  }, [conceptId, numericConceptId]);

  useEffect(() => {
    const apiSort: ExploreSort = sort === "인기순" ? "POPULAR" : "LATEST";
    void getConceptTourCourses(numericConceptId, apiSort).then((response) => setCourses(response.courses)).catch(() => setCourses([]));
  }, [numericConceptId, sort]);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-gray-10 pb-6 text-gray-100">
      <header className="flex flex-col gap-10 px-[15px] pt-[57px]">
        <div className="h-6"><Header className="grid h-6 w-full grid-cols-[24px_1fr_24px] items-center p-0" showBack onBackClick={goBack} /></div>
        <div className="flex min-h-[76px] items-center justify-between gap-3">
          <div className="min-w-0">
          <h1 className="mb-1 text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">{tour?.name ?? detail.title}</h1>
          <p className="m-0 text-body-01 leading-[1.4] tracking-[-0.35px] text-gray-70">
            {(tour?.description.split("\n") ?? detail.description).map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          </div>
          <img className="max-h-[134px] shrink-0 object-contain" src={detail.artwork} alt="" style={{ width: detail.artworkStyle.width, height: detail.artworkStyle.height }} />
        </div>
      </header>

      <div className="mx-[15px] mt-3 flex flex-col items-end gap-3">
        <button
          className="flex h-9 min-w-24 items-end justify-between gap-3 rounded-lg border border-white bg-white/50 px-5 py-2 text-body-01 font-semibold text-gray-70 backdrop-blur-[10px]"
          type="button"
          aria-expanded={sortOpen}
          onClick={() => setSortOpen((open) => !open)}
        >
          {sort}
          <ArrowDown
            className={`size-5 shrink-0 transition-transform ${sortOpen ? "rotate-180" : "rotate-0"}`}
            aria-hidden="true"
          />
        </button>
        {sortOpen && (
          <div
            className="flex w-24 flex-col items-start justify-end gap-3 rounded-lg bg-white/50 px-5 py-4 shadow-[0_0_28px_rgb(118_118_118/25%)] backdrop-blur-[10px] outline outline-1 outline-offset-[-1px] outline-white"
            role="menu"
          >
            {(["최신순", "인기순"] as const).map((option) => (
              <button
                type="button"
                role="menuitemradio"
                aria-checked={sort === option}
                className={`w-full border-0 bg-transparent p-0 text-left text-body-01 font-semibold leading-5 text-gray-70`}
                key={option}
                onClick={() => { setSort(option); setSortOpen(false); }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <section className="flex flex-col gap-3 px-[15px] pb-4 pt-4" aria-label={`${tour?.name ?? detail.title} ${sort}`}>
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
    </main>
  );
}
