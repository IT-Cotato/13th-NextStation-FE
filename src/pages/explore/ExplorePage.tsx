import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowNext from "@/assets/arrow-next(gray).svg?react";
import Heart from "@/assets/heart.svg?react";
import {
  getExploreCourses,
  getExploreCourseDetailPath,
  getExploreMain,
  type ExploreMainResponse,
} from "@/api/explore";
import BottomNav from "@/components/BottomNav";
import ExploreCourseCard from "./components/ExploreCourseCard";
import ExploreCourseItem from "./components/ExploreCourseItem";
import ExploreLineTabs from "./components/ExploreLineTabs";
import ExploreSearchBar from "./components/ExploreSearchBar";
import {
  featuredConceptTours,
  getDisplayedConceptTours,
} from "./data/conceptTours";
import { getDisplayedExploreLines } from "./utils/exploreLines";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [line, setLine] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ExploreMainResponse | null>(null);
  const matchedConceptTours = getDisplayedConceptTours(data?.conceptTours);
  const displayedConceptTours = featuredConceptTours.map((design) => ({
    design,
    tour: matchedConceptTours.find(
      ({ design: matchedDesign }) => matchedDesign.slug === design.slug,
    )?.tour,
  }));
  const displayedLines = getDisplayedExploreLines(data?.lines);

  useEffect(() => {
    void getExploreMain()
      .then((response) => {
        const responseLines = getDisplayedExploreLines(response.lines);
        const selectedLine =
          responseLines.find((lineItem) => lineItem.id === 1) ??
          responseLines[0];

        setLine(selectedLine?.id ?? null);

        if (!selectedLine) {
          setData(response);
          return;
        }

        setData((current) => ({
          ...(current ?? response),
          ...response,
          lineCourses:
            selectedLine.id === response.selectedLineId
              ? response.lineCourses
              : [],
        }));

        if (selectedLine.id !== response.selectedLineId) {
          void getExploreCourses({ lineId: selectedLine.id, size: 3 })
            .then((courseResponse) =>
              setData((current) =>
                current
                  ? { ...current, lineCourses: courseResponse.courses }
                  : current,
              ),
            )
            .catch(() =>
              setData((current) =>
                current ? { ...current, lineCourses: [] } : current,
              ),
            );
        }
      })
      .catch(() => setData(null));
  }, []);

  const renderMore = (label: string) => (
    <span className="flex items-center gap-1">
      {label}
      <ArrowNext className="size-4" aria-hidden="true" />
    </span>
  );

  return (
    <main className="flex h-dvh flex-col bg-gray-10 gap-3 pt-[calc(var(--safe-top)+12px)] pb-[var(--bottom-nav-offset)] text-gray-100 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <header className="flex items-start justify-between px-[15px]">
        <h1 className="text-title-01 font-semibold leading-[1.4] tracking-[-0.025em]">
          오늘은 어떤 환승여행을
          <br />
          떠나볼까요?
        </h1>
        <button
          type="button"
          className="size-6 border-0 bg-transparent p-0"
          aria-label="좋아요한 코스"
          onClick={() => navigate("/course/like")}
        >
          <Heart className="block size-6" aria-hidden="true" />
        </button>
      </header>

      <div className="flex px-[15px]">
        <ExploreSearchBar
          onSubmit={(keyword) => {
            if (keyword) {
              navigate(`/explore/search?q=${encodeURIComponent(keyword)}`);
            }
          }}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="역 이름, 동네, 코스명 검색"
        />
      </div>

      <section>
        <div className="flex items-center justify-between px-[15px] py-3">
          <h2 className="text-title-02 font-semibold leading-[1.4] tracking-[-0.025em]">
            사람들이 많이 찾는 코스
          </h2>
          <button
            className="border-0 bg-transparent p-0 text-body-02 font-semibold text-gray-60"
            type="button"
            onClick={() => navigate("/explore/popular")}
          >
            {renderMore("더보기")}
          </button>
        </div>
        <div
          className="mt-[-12px] flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[15px] pb-6 pt-5 [scrollbar-width:none] [touch-action:pan-x] focus:outline-none"
          role="region"
          aria-label="사람들이 많이 찾는 코스 가로 목록"
          tabIndex={0}
        >
          {(data?.popularCourses ?? []).map((course, index) => (
            <ExploreCourseCard
              key={course.courseId}
              rank={index + 1}
              course={course}
              onClick={() => navigate(getExploreCourseDetailPath(course))}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between px-[15px] py-3">
          <h2 className="text-title-02 font-semibold leading-[1.4] tracking-[-0.025em]">
            컨셉별 투어
          </h2>
          <button
            className="border-0 bg-transparent p-0 text-body-02 font-semibold text-gray-60"
            type="button"
            onClick={() => navigate("/explore/concepts")}
          >
            {renderMore("더보기")}
          </button>
        </div>
        <div className="flex flex-col gap-2 px-[15px] pb-6 pt-2">
          {displayedConceptTours.map(({ tour, design }) => (
            <button
              className="flex h-20 w-full items-center justify-between overflow-hidden rounded-lg border-0 bg-gray-20 p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
              key={design.slug}
              disabled={!tour}
              onClick={() => {
                if (!tour) return;
                navigate(`/explore/concepts/${tour.conceptTourId}`, {
                  state: { conceptTour: tour },
                });
              }}
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-subtitle font-semibold leading-[1.4] tracking-[-0.025em]">
                  {tour?.name ?? design.title}
                </span>
                <p className="text-body-02 tracking-[-0.025em] text-gray-70">
                  {tour?.description ?? design.description}
                </p>
              </span>
              <design.Artwork
                className={`max-h-20 shrink-0 object-contain ${design.artworkClassName}`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </section>

      <section className="pb-6">
        <div className="flex items-center justify-between px-[15px]">
          <h2 className="text-title-02 font-semibold leading-[1.4] tracking-[-0.025em]">
            노선 따라 둘러보기
          </h2>
          <button
            className="border-0 bg-transparent p-0 text-body-02 font-semibold text-gray-60"
            type="button"
            onClick={() =>
              navigate(line ? `/explore/lines?line=${line}` : "/explore/lines")
            }
          >
            {renderMore("전체보기")}
          </button>
        </div>
        <ExploreLineTabs
          lines={displayedLines}
          selectedLine={line}
          onSelect={(lineId) => {
            setLine(lineId);
            void getExploreCourses({ lineId, size: 3 })
              .then((response) =>
                setData((current) =>
                  current
                    ? { ...current, lineCourses: response.courses }
                    : current,
                ),
              )
              .catch(() =>
                setData((current) =>
                  current ? { ...current, lineCourses: [] } : current,
                ),
              );
          }}
        />
        <div className="flex flex-col gap-3 px-[15px] py-2">
          {(data?.lineCourses ?? []).map((course) => (
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
        </div>
      </section>

      <BottomNav mode="course" activeTab="explore" />
    </main>
  );
}
