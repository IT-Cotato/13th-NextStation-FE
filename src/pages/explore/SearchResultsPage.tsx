import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackIcon from "@/assets/back.svg?react";
import SearchEmpty from "@/assets/explore/search-empty.svg?react";
import {
  getConceptTours,
  getExploreCourses,
  type ConceptTour,
  type ExploreCourse,
} from "@/api/explore";
import type { SubwayLine } from "@/types/subway";
import ConceptTourCard from "./components/ConceptTourCard";
import ExploreCourseItem from "./components/ExploreCourseItem";
import ExploreSearchBar from "./components/ExploreSearchBar";
import { conceptTours as conceptTourDesigns } from "./data/conceptTours";

export default function SearchResultsPage() {
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
      void getConceptTours()
        .then(setTours)
        .catch(() => setTours([]));
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
      <header className="flex items-center gap-4 px-[15px] pb-2.5 pt-[57px]">
        <button
          type="button"
          className="size-6 shrink-0 border-0 bg-transparent p-0"
          aria-label="이전"
          onClick={() => navigate(-1)}
        >
          <BackIcon className="size-6" aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <ExploreSearchBar
            key={query}
            onSubmit={(value) =>
              setSearchParams(
                value
                  ? {
                      q: value,
                      ...(isConceptSearch ? { source: "concept" } : {}),
                    }
                  : {},
              )
            }
            defaultValue={query}
          />
        </div>
      </header>

      {hasResults ? (
        isConceptSearch ? (
          <section className="grid grid-cols-2 gap-3 px-[15px] pt-4">
            {conceptResults.map((tour, index) => {
              const design =
                conceptTourDesigns[index % conceptTourDesigns.length];

              return (
                <ConceptTourCard
                  key={tour.conceptTourId}
                  Artwork={design.Artwork}
                  artworkWidth={design.artworkStyle.width}
                  artworkHeight={design.artworkStyle.height}
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
                onClick={() => navigate(`/course/logs/${course.journalId}`)}
              />
            ))}
          </section>
        )
      ) : (
        <section className="flex flex-col items-center gap-5 pt-[163px]">
          <SearchEmpty className="h-[200px] w-[222px]" aria-hidden="true" />
          <p className="text-center text-subtitle leading-[1.4] tracking-[-0.025em] text-gray-80">
            일치하는 검색 결과가 없어요
          </p>
        </section>
      )}
    </main>
  );
}
