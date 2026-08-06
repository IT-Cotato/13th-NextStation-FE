import { useEffect, useState } from "react";
import Heart from "@/assets/heart.svg?react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ExploreCourseCard from "./components/ExploreCourseCard";
import ExploreCourseItem from "./components/ExploreCourseItem";
import { featuredConceptTours } from "./data/conceptTours";
import ExploreSearchBar from "./components/ExploreSearchBar";
import {
  getExploreCourses,
  getExploreMain,
  type ExploreMainResponse,
} from "@/api/explore";
import type { SubwayLine } from "@/types/subway";

const defaultLines = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  name: `${index + 1}호선`,
  code: `LINE_${index + 1}`,
  hasCourses: false,
}));

export default function ExplorePage() {
  const navigate = useNavigate();
  const [line, setLine] = useState(1);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ExploreMainResponse | null>(null);
  const displayedConceptTours = featuredConceptTours.map((design, index) => ({
    design,
    tour: data?.conceptTours[index] ?? {
      conceptTourId: index + 1,
      name: design.title,
      description: design.description,
      courseCount: 0,
    },
  }));
  const displayedLines = data?.lines.length ? data.lines : defaultLines;

  useEffect(() => {
    void getExploreMain()
      .then((response) => {
        setData(response);
        if (response.selectedLineId) setLine(response.selectedLineId);
      })
      .catch(() => setData(null));
  }, []);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-gray-10 pb-[130px] pt-[calc(var(--safe-top)+12px)] text-gray-100">
      <header className="flex h-[123px] items-start justify-between px-[15px] pb-2.5 pt-[45px]">
        <h1 className="m-0 text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">
          오늘은 어떤 환승여행을
          <br />
          둘러볼까요?
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

      <ExploreSearchBar
        className="mx-[15px] mb-4 mt-[9px] flex h-12 items-center gap-2 rounded-lg border border-gray-40 bg-gray-20 p-3 text-gray-70 focus-within:border-primary-50 focus-within:bg-white"
        inputClassName="w-full border-0 bg-transparent text-body-01 text-gray-90 outline-none"
        onSubmit={(keyword) => {
          if (keyword) {
            navigate(`/explore/search?q=${encodeURIComponent(keyword)}`);
          }
        }}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="역 이름, 동네, 코스명 검색"
      />

      <section>
        <div className="flex h-[49px] items-center justify-between px-[15px] py-3">
          <h2 className="m-0 text-title-02 font-semibold leading-[1.4] tracking-[-0.45px]">
            사람들이 많이 찾는 코스
          </h2>
          <button
            className="border-0 bg-transparent p-0 text-body-02 font-semibold text-gray-60"
            type="button"
            onClick={() => navigate("/explore/popular")}
          >
            더보기 〉
          </button>
        </div>
        <div
          className="mt-[-12px] flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[15px] pb-6 pt-5 [scrollbar-width:none] [touch-action:pan-x] focus:outline-none"
          role="region"
          aria-label="사람들이 많이 찾는 코스 가로 목록"
          tabIndex={0}
          onWheel={(event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
              event.currentTarget.scrollLeft += event.deltaY;
            }
          }}
        >
          {(data?.popularCourses ?? []).map((course, index) => (
            <ExploreCourseCard
              key={course.courseId}
              rank={index + 1}
              course={course}
              onClick={() => navigate(`/journals/${course.journalId}`)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex h-[49px] items-center justify-between px-[15px] py-3">
          <h2 className="m-0 text-title-02 font-semibold leading-[1.4] tracking-[-0.45px]">
            컨셉별 투어
          </h2>
          <button
            className="border-0 bg-transparent p-0 text-body-02 font-semibold text-gray-60"
            type="button"
            onClick={() => navigate("/explore/concepts")}
          >
            더보기 〉
          </button>
        </div>
        <div className="flex flex-col gap-2 px-[15px] pb-6 pt-2">
          {displayedConceptTours.map(({ tour, design }) => {
            return (
              <button
                className="flex h-20 w-full items-center justify-between overflow-hidden rounded-lg border-0 bg-gray-20 p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
                key={tour.conceptTourId}
                onClick={() =>
                  navigate(`/explore/concepts/${tour.conceptTourId}`)
                }
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-subtitle font-semibold leading-[1.4]">
                    {tour.name}
                  </span>
                  <small className="text-body-02 text-gray-70">
                    {tour.description}
                  </small>
                </span>
                <img
                  className="max-h-20 shrink-0 object-contain"
                  src={design.featuredArtwork}
                  style={{
                    width: design.featuredStyle.width,
                    height: design.featuredStyle.height,
                  }}
                  alt=""
                />
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex h-[49px] items-center justify-between px-[15px] py-3">
          <h2 className="m-0 text-title-02 font-semibold leading-[1.4] tracking-[-0.45px]">
            노선 따라 둘러보기
          </h2>
          <button
            className="border-0 bg-transparent p-0 text-body-02 font-semibold text-gray-60"
            type="button"
            onClick={() => navigate(`/explore/lines?line=${line}`)}
          >
            전체보기 〉
          </button>
        </div>
        <div
          className="flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[15px] py-2 [scrollbar-width:none] [touch-action:pan-x] focus:outline-none"
          role="tablist"
          aria-label="지하철 노선 선택"
          tabIndex={0}
          onWheel={(event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
              event.currentTarget.scrollLeft += event.deltaY;
            }
          }}
        >
          {displayedLines.map((item) => (
            <button
              type="button"
              role="tab"
              aria-selected={line === item.id}
              disabled={!item.hasCourses}
              key={item.id}
              className={`shrink-0 rounded-lg border px-4 py-[7px] text-body-01 disabled:opacity-40 ${line === item.id ? "border-primary-50 bg-primary-50 font-semibold text-gray-10" : "border-gray-50 bg-transparent text-gray-90"}`}
              onClick={() => {
                setLine(item.id);
                void getExploreCourses({ lineId: item.id, size: 3 }).then(
                  (response) =>
                    setData((current) =>
                      current
                        ? { ...current, lineCourses: response.courses }
                        : current,
                    ),
                );
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 px-[15px] py-2">
          {(data?.lineCourses ?? []).map((course) => (
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
        </div>
      </section>

      <BottomNav mode="course" activeTab="explore" />
    </main>
  );
}
