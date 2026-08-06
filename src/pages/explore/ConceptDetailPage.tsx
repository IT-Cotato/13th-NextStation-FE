import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getConceptTourCourses,
  getConceptTours,
  type ConceptTour,
  type ExploreCourse,
  type ExploreSort,
} from "@/api/explore";
import Header from "@/components/Header";
import type { SubwayLine } from "@/types/subway";
import ExploreCourseItem from "./components/ExploreCourseItem";
import ExploreDropdown from "./components/ExploreDropdown";
import { conceptTours as conceptTourDesigns } from "./data/conceptTours";

type ExploreSortOption = "최신순" | "인기순";
type DetailStatus = "loading" | "ready" | "not-found" | "error";

export default function ConceptDetailPage() {
  const navigate = useNavigate();
  const { conceptId = "" } = useParams();
  const numericConceptId = Number(conceptId);
  const isValidConceptId =
    Number.isInteger(numericConceptId) && numericConceptId > 0;
  const [sort, setSort] = useState<ExploreSortOption>("최신순");
  const [tour, setTour] = useState<ConceptTour | null>(null);
  const [designIndex, setDesignIndex] = useState<number | null>(null);
  const [courses, setCourses] = useState<ExploreCourse[]>([]);
  const [status, setStatus] = useState<DetailStatus>("loading");
  const [loadedConceptId, setLoadedConceptId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (!isValidConceptId) return;

    void getConceptTours()
      .then((items) => {
        const index = items.findIndex(
          (item) => item.conceptTourId === numericConceptId,
        );
        if (index < 0) {
          setLoadedConceptId(numericConceptId);
          setStatus("not-found");
          return;
        }

        setTour(items[index]);
        setDesignIndex(index % conceptTourDesigns.length);
        setLoadedConceptId(numericConceptId);
        setStatus("ready");
      })
      .catch(() => {
        setLoadedConceptId(numericConceptId);
        setStatus("error");
      });
  }, [isValidConceptId, numericConceptId]);

  useEffect(() => {
    if (status !== "ready" || loadedConceptId !== numericConceptId) return;

    const apiSort: ExploreSort = sort === "인기순" ? "POPULAR" : "LATEST";
    void getConceptTourCourses(numericConceptId, apiSort)
      .then((response) => setCourses(response.courses))
      .catch(() => setCourses([]));
  }, [loadedConceptId, numericConceptId, sort, status]);

  const design =
    designIndex === null ? null : (conceptTourDesigns[designIndex] ?? null);

  const displayedStatus: DetailStatus = !isValidConceptId
    ? "not-found"
    : loadedConceptId === numericConceptId
      ? status
      : "loading";

  return (
    <main className="min-h-dvh overflow-x-hidden bg-gray-10 pb-6 text-gray-100">
      <div className="px-[3px] pt-[45px]">
        <Header showBack />
      </div>

      {displayedStatus === "loading" && (
        <p className="px-[15px] pt-20 text-center text-body-01 text-gray-70">
          컨셉을 불러오는 중...
        </p>
      )}
      {displayedStatus === "not-found" && (
        <p className="px-[15px] pt-20 text-center text-body-01 text-gray-70">
          존재하지 않는 컨셉입니다.
        </p>
      )}
      {displayedStatus === "error" && (
        <p className="px-[15px] pt-20 text-center text-body-01 text-gray-70">
          컨셉 정보를 불러오지 못했습니다.
        </p>
      )}

      {displayedStatus === "ready" && tour && design && (
        <>
          <header className="flex min-h-[76px] items-center justify-between gap-3 px-[15px]">
            <div className="min-w-0">
              <h1 className="mb-1 text-title-01 font-semibold leading-[1.4] tracking-[-0.025em]">
                {tour.name}
              </h1>
              <p className="whitespace-pre-line text-body-01 leading-[1.4] tracking-[-0.025em] text-gray-70">
                {tour.description}
              </p>
            </div>
            <design.Artwork
              className="max-h-[134px] shrink-0 object-contain"
              style={{
                width: design.artworkStyle.width,
                height: design.artworkStyle.height,
              }}
              aria-hidden="true"
            />
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
            aria-label={`${tour.name} ${sort}`}
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
                onClick={() => navigate(`/course/logs/${course.journalId}`)}
              />
            ))}
          </section>
        </>
      )}
    </main>
  );
}
