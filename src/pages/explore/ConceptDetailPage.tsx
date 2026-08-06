import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import ExploreCourseItem from "./components/ExploreCourseItem";
import { conceptDetails } from "./data/conceptDetails";
import Header from "@/components/Header";
import {
  getConceptTourCourses,
  getConceptTours,
  type ConceptTour,
  type ExploreCourse,
  type ExploreSort,
} from "@/api/explore";
import type { SubwayLine } from "@/types/subway";
import ExploreDropdown from "./components/ExploreDropdown";

type ExploreSortOption = "최신순" | "인기순";

export default function ConceptDetailPage() {
  const navigate = useNavigate();
  const goBack = useSafeBack("/explore/concepts");
  const { conceptId = "1" } = useParams();
  const numericConceptId = Number(conceptId) || 1;
  const designs = Object.values(conceptDetails);
  const detail = designs[(numericConceptId - 1) % designs.length];
  const [sort, setSort] = useState<ExploreSortOption>("최신순");
  const [tour, setTour] = useState<ConceptTour | null>(null);
  const [courses, setCourses] = useState<ExploreCourse[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    void getConceptTours().then((items) =>
      setTour(
        items.find((item) => item.conceptTourId === numericConceptId) ?? null,
      ),
    );
  }, [conceptId, numericConceptId]);

  useEffect(() => {
    const apiSort: ExploreSort = sort === "인기순" ? "POPULAR" : "LATEST";
    void getConceptTourCourses(numericConceptId, apiSort)
      .then((response) => setCourses(response.courses))
      .catch(() => setCourses([]));
  }, [numericConceptId, sort]);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-gray-10 pb-6 text-gray-100">
      <header className="flex flex-col gap-10 px-[15px] pt-[57px]">
        <div className="h-6">
          <Header
            className="grid h-6 w-full grid-cols-[24px_1fr_24px] items-center p-0"
            showBack
            onBackClick={goBack}
          />
        </div>
        <div className="flex min-h-[76px] items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="mb-1 text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">
              {tour?.name ?? detail.title}
            </h1>
            <p className="m-0 text-body-01 leading-[1.4] tracking-[-0.35px] text-gray-70">
              {(tour?.description.split("\n") ?? detail.description).map(
                (line, index) => (
                  <span key={line}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ),
              )}
            </p>
          </div>
          <img
            className="max-h-[134px] shrink-0 object-contain"
            src={detail.artwork}
            alt=""
            style={{
              width: detail.artworkStyle.width,
              height: detail.artworkStyle.height,
            }}
          />
        </div>
      </header>

      <div className="mx-[15px] mt-3 flex justify-end">
        <ExploreDropdown
          ariaLabel="코스 정렬"
          options={["최신순", "인기순"] as const}
          value={sort}
          onChange={setSort}
        />
      </div>

      <section
        className="flex flex-col gap-3 px-[15px] pb-4 pt-4"
        aria-label={`${tour?.name ?? detail.title} ${sort}`}
      >
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
            onClick={() => navigate(`/journals/${course.journalId}`)}
          />
        ))}
      </section>
    </main>
  );
}
