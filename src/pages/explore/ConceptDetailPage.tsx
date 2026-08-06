import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import {
  getConceptTourCourses,
  getConceptTours,
  getExploreCourseDetailPath,
  type ConceptTour,
  type ExploreCourse,
  type ExploreSort,
} from "@/api/explore";
import Header from "@/components/Header";
import ExploreCourseItem from "./components/ExploreCourseItem";
import ExploreDropdown from "./components/ExploreDropdown";
import {
  conceptTours as conceptTourDesigns,
  getConceptTourDesign,
} from "./data/conceptTours";

type ExploreSortOption = "최신순" | "인기순";
type DetailStatus = "loading" | "ready" | "not-found" | "error";

function getFallbackConcept(conceptId: number): {
  designIndex: number;
  tour: ConceptTour;
} | null {
  const designIndex = conceptTourDesigns.findIndex(
    (design) => design.conceptTourId === conceptId,
  );
  const design = conceptTourDesigns[designIndex];
  if (!design) return null;

  return {
    designIndex,
    tour: {
      conceptTourId: conceptId,
      name: design.title,
      description: design.description,
      courseCount: 0,
    },
  };
}

export default function ConceptDetailPage() {
  const navigate = useNavigate();
  const { conceptId = "" } = useParams();
  const numericConceptId = Number(conceptId);
  const isValidConceptId =
    Number.isInteger(numericConceptId) && numericConceptId > 0;
  const fallbackConcept = getFallbackConcept(numericConceptId);
  const [sort, setSort] = useState<ExploreSortOption>("최신순");
  const [tour, setTour] = useState<ConceptTour | null>(
    fallbackConcept?.tour ?? null,
  );
  const [designIndex, setDesignIndex] = useState<number | null>(
    fallbackConcept?.designIndex ?? null,
  );
  const [courses, setCourses] = useState<ExploreCourse[]>([]);
  const [status, setStatus] = useState<DetailStatus>(
    fallbackConcept ? "ready" : "loading",
  );
  const [loadedConceptId, setLoadedConceptId] = useState<number | null>(
    fallbackConcept ? numericConceptId : null,
  );
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const isLoadingMoreRef = useRef(false);
  const { ref: loadMoreRef, inView } = useInView({ rootMargin: "120px" });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (!isValidConceptId) return;

    void getConceptTours()
      .then((items) => {
        const index = items.findIndex(
          (item) => item.conceptTourId === numericConceptId,
        );
        if (index < 0) {
          const fallback = getFallbackConcept(numericConceptId);
          if (fallback) {
            setTour(fallback.tour);
            setDesignIndex(fallback.designIndex);
            setLoadedConceptId(numericConceptId);
            setStatus("ready");
            return;
          }
          setLoadedConceptId(numericConceptId);
          setStatus("not-found");
          return;
        }

        const matchingDesign = getConceptTourDesign(
          items[index].conceptTourId,
        );
        if (!matchingDesign) {
          setLoadedConceptId(numericConceptId);
          setStatus("not-found");
          return;
        }

        setTour(items[index]);
        setDesignIndex(
          conceptTourDesigns.findIndex(
            (design) => design.conceptTourId === items[index].conceptTourId,
          ),
        );
        setLoadedConceptId(numericConceptId);
        setStatus("ready");
      })
      .catch(() => {
        const fallback = getFallbackConcept(numericConceptId);
        if (fallback) {
          setTour(fallback.tour);
          setDesignIndex(fallback.designIndex);
          setLoadedConceptId(numericConceptId);
          setStatus("ready");
          return;
        }
        setLoadedConceptId(numericConceptId);
        setStatus("error");
      });
  }, [isValidConceptId, numericConceptId]);

  useEffect(() => {
    if (status !== "ready" || loadedConceptId !== numericConceptId) return;

    const apiSort: ExploreSort = sort === "인기순" ? "POPULAR" : "LATEST";
    void getConceptTourCourses(numericConceptId, apiSort)
      .then((response) => {
        setCourses(response.courses);
        setNextCursor(response.nextCursor);
        setHasNext(response.hasNext);
      })
      .catch(() => {
        setCourses([]);
        setNextCursor(null);
        setHasNext(false);
      });
  }, [loadedConceptId, numericConceptId, sort, status]);

  useEffect(() => {
    if (
      status !== "ready" ||
      !inView ||
      !hasNext ||
      !nextCursor ||
      isLoadingMoreRef.current
    )
      return;

    const apiSort: ExploreSort = sort === "인기순" ? "POPULAR" : "LATEST";
    isLoadingMoreRef.current = true;
    void getConceptTourCourses(
      numericConceptId,
      apiSort,
      nextCursor,
      50,
    )
      .then((response) => {
        setCourses((current) => [...current, ...response.courses]);
        setNextCursor(response.nextCursor);
        setHasNext(response.hasNext);
      })
      .catch(() => setHasNext(false))
      .finally(() => {
        isLoadingMoreRef.current = false;
      });
  }, [hasNext, inView, nextCursor, numericConceptId, sort, status]);

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
          <header className="flex h-[122px] items-start justify-between pl-[15px] pr-6">
            <div className="min-w-0 pt-[26px]">
              <h1 className="mb-1 text-title-01 font-semibold leading-[1.4] tracking-[-0.025em]">
                {tour.name}
              </h1>
              <p className="whitespace-pre-line text-body-01 leading-[1.4] tracking-[-0.025em] text-gray-70">
                {design.detailDescription}
              </p>
            </div>
            <div className="-mt-9 flex size-[134px] w-[140px] shrink-0 items-center justify-center">
              <design.Artwork
                className={`shrink-0 object-contain ${design.detailArtworkClassName}`}
                aria-hidden="true"
              />
            </div>
          </header>

          <div className="mx-[15px] flex h-9 justify-end">
            <ExploreDropdown
              ariaLabel="코스 정렬"
              options={["최신순", "인기순"] as const}
              value={sort}
              onChange={(nextSort) => {
                setNextCursor(null);
                setHasNext(false);
                setSort(nextSort);
              }}
            />
          </div>

          <section
            className="flex flex-col gap-3 px-[15px] pb-4 pt-4"
            aria-label={`${tour.name} ${sort}`}
          >
            {courses.length === 0 && (
              <p className="py-16 text-center text-body-01 text-gray-60">
                이 컨셉의 코스가 아직 없어요.
              </p>
            )}
            {courses.map((course) => (
              <ExploreCourseItem
                key={course.courseId}
                courseId={course.courseId}
                line={course.line}
                stationName={course.stationName}
                name={course.name}
                tags={course.tags}
                likeCount={course.likeCount}
                isLiked={course.isLiked}
                imageUrl={course.imageUrl}
                onClick={() => navigate(getExploreCourseDetailPath(course))}
              />
            ))}
          </section>
          {hasNext && (
            <div ref={loadMoreRef} className="h-px" aria-hidden="true" />
          )}
        </>
      )}
    </main>
  );
}
