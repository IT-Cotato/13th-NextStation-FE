import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exploreAsset } from "@/assets/explore";
import BackIcon from "@/assets/back.svg?react";
import {
  getConceptTours,
  getExploreCourses,
  type ConceptTour,
  type ExploreCourse,
} from "@/api/explore";
import type { SubwayLine } from "@/types/subway";
import ConceptTourCard from "./components/ConceptTourCard";
import ExploreCourseItem from "./components/ExploreCourseItem";
import ExploreSearchForm from "./components/ExploreSearchForm";
import useSafeBack from "./hooks/useSafeBack";
import { conceptTours as conceptTourDesigns } from "./data/conceptTours";

export default function SearchResultsPage() {
  const goBack = useSafeBack();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const isConceptSearch = searchParams.get("source") === "concept";
  const [courses, setCourses] = useState<ExploreCourse[]>([]);
  const [tours, setTours] = useState<ConceptTour[]>([]);

  useEffect(() => {
    const keyword = query.trim();
    if (!keyword) return;

    if (isConceptSearch) {
      void getConceptTours().then(setTours).catch(() => setTours([]));
      return;
    }

    void getExploreCourses({ keyword, sort: "LATEST", size: 50 })
      .then((data) => setCourses(data.courses))
      .catch(() => setCourses([]));
  }, [isConceptSearch, query]);

  const conceptResults = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return tours.filter((tour) =>
      `${tour.name} ${tour.description}`.toLowerCase().includes(keyword),
    );
  }, [query, tours]);

  const hasResults = isConceptSearch
    ? conceptResults.length > 0
    : courses.length > 0;

  return (
    <main className="min-h-dvh bg-gray-10 text-gray-100">
      <header className="flex h-[115px] items-stretch gap-4 px-[15px] pb-2.5 pt-[57px]">
        <button
          type="button"
          className="w-6 shrink-0 border-0 bg-transparent p-0"
          aria-label="이전"
          onClick={goBack}
        >
          <BackIcon className="size-6" aria-hidden="true" />
        </button>
        <ExploreSearchForm
          key={query}
          className="flex min-w-0 flex-1"
          inputClassName="h-11 w-full rounded-lg border border-gray-40 bg-gray-20 px-4 py-3"
          onSubmit={(value) =>
            setSearchParams(
              value
                ? { q: value, ...(isConceptSearch ? { source: "concept" } : {}) }
                : {},
            )
          }
          defaultValue={query}
        />
      </header>

      {hasResults ? (
        isConceptSearch ? (
          <section className="grid grid-cols-2 gap-3 px-[15px]">
            {conceptResults.map((tour, index) => {
              const design = conceptTourDesigns[index % conceptTourDesigns.length];

              return (
                <ConceptTourCard
                  key={tour.conceptTourId}
                  artwork={design.artwork}
                  artworkWidth={design.combinedStyle.width}
                  artworkHeight={design.combinedStyle.height}
                  name={tour.name}
                  description={tour.description}
                  courseCount={tour.courseCount}
                  onClick={() =>
                    navigate(`/explore/concepts/${tour.conceptTourId}`)
                  }
                />
              );
            })}
          </section>
        ) : (
          <section className="flex flex-col gap-3 px-[15px] py-4">
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
        )
      ) : (
        <section className="flex flex-col items-center gap-5 pt-[163px]">
          <img
            className="h-[200px] w-[222px] object-contain"
            src={exploreAsset("search-empty.svg")}
            alt=""
          />
          <p className="m-0 w-[222px] text-center text-subtitle leading-[1.4] tracking-[-0.4px] text-gray-80">
            일치하는 검색 결과가 없어요
          </p>
        </section>
      )}
    </main>
  );
}
