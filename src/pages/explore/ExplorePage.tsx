import { useState } from "react";
import Heart from "@/assets/heart.svg?react";
import SearchIcon from "@/assets/search.svg?react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ExploreCourseCard from "./components/ExploreCourseCard";
import ExploreCourseItem from "./components/ExploreCourseItem";
import { stationsByLine } from "@/mocks/StationByLine";
import { featuredConceptTours } from "./data/conceptTours";
import ExploreSearchForm from "./components/ExploreSearchForm";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [line, setLine] = useState(1);
  const [query, setQuery] = useState("");

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-gray-10 pb-[130px] pt-[calc(var(--safe-top)+12px)] text-gray-100">
      <header className="flex h-[123px] items-start justify-between px-[15px] pb-2.5 pt-[45px]">
        <h1 className="m-0 text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">오늘은 어떤 환승여행을<br />둘러볼까요?</h1>
        <button className="size-6 border-0 bg-transparent p-0" aria-label="관심 코스"><Heart className="block size-6" aria-hidden="true" /></button>
      </header>

      <ExploreSearchForm
        className="mx-[15px] mb-4 mt-[9px] flex h-12 items-center gap-2 rounded-lg border border-gray-40 bg-gray-20 p-3 text-gray-70 focus-within:border-primary-50 focus-within:bg-white [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-body-01 [&_input]:text-gray-90 [&_input]:outline-none"
        icon={<SearchIcon className="size-5 shrink-0" aria-hidden="true" />}
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
        <div className="flex h-[49px] items-center justify-between px-[15px] py-3"><h2 className="m-0 text-title-02 font-semibold leading-[1.4] tracking-[-0.45px]">사람들이 많이 찾는 코스</h2><button className="border-0 bg-transparent p-0 text-body-02 font-semibold text-gray-60" type="button" onClick={() => navigate("/explore/popular")}>더보기 〉</button></div>
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
          {[1, 2, 3, 4, 5, 6].map((rank) => (
            <ExploreCourseCard key={rank} rank={rank} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex h-[49px] items-center justify-between px-[15px] py-3"><h2 className="m-0 text-title-02 font-semibold leading-[1.4] tracking-[-0.45px]">컨셉별 투어</h2><button className="border-0 bg-transparent p-0 text-body-02 font-semibold text-gray-60" type="button" onClick={() => navigate("/explore/concepts")}>더보기 〉</button></div>
        <div className="flex flex-col gap-2 px-[15px] pb-6 pt-2">
          {featuredConceptTours.map(({ slug, title, description, featuredArtwork, featuredStyle }) => (
            <button className="relative h-20 w-full overflow-hidden rounded-lg border-0 bg-gray-20 p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary-50" key={title} onClick={() => navigate(`/explore/concepts/${slug}`)}>
              <span className="relative z-[2] flex flex-col gap-1"><span className="text-subtitle font-semibold leading-[1.4]">{title}</span><small className="text-body-02 text-gray-70">{description}</small></span>
              <img className="absolute max-h-none max-w-none object-contain" src={featuredArtwork} style={featuredStyle} alt="" />
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex h-[49px] items-center justify-between px-[15px] py-3">
          <h2 className="m-0 text-title-02 font-semibold leading-[1.4] tracking-[-0.45px]">노선 따라 둘러보기</h2>
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
          {Array.from({ length: 9 }, (_, index) => index + 1).map((number) => (
            <button
              type="button"
              role="tab"
              aria-selected={line === number}
              key={number}
              className={`shrink-0 rounded-lg border px-4 py-[7px] text-body-01 ${line === number ? "border-primary-50 bg-primary-50 font-semibold text-gray-10" : "border-gray-50 bg-transparent text-gray-90"}`}
              onClick={() => setLine(number)}
            >
              {number}호선
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 px-[15px] py-2">
          {stationsByLine[`${line}호선`].slice(0, 3).map((stationName) => (
            <ExploreCourseItem
              key={`${line}-${stationName}`}
              line={line as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}
              stationName={stationName}
              filledImage
            />
          ))}
        </div>
      </section>

      <BottomNav mode="course" activeTab="explore" />
    </main>
  );
}
