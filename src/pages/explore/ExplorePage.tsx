import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ExploreCourseCard from "./components/ExploreCourseCard";
import ExploreCourseItem from "./components/ExploreCourseItem";
import { stationsByLine } from "@/mocks/StationByLine";
import { featuredConceptTours } from "./data/conceptTours";
import ExploreSearchForm from "./components/ExploreSearchForm";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";

export default function ExplorePage() {
  const navigate = useNavigate();
  const [line, setLine] = useState(1);
  const [query, setQuery] = useState("");

  return (
    <main className="explore-page pt-[calc(var(--safe-top)+12px)]">
      <header className="explore-header !h-[123px] !pt-[45px]">
        <h1>오늘은 어떤 환승여행을<br />둘러볼까요?</h1>
        <button aria-label="관심 코스"><img src="/explore/heart-outline.svg" alt="" /></button>
      </header>

      <ExploreSearchForm
        className="explore-search explore-concept-search"
        icon={<span aria-hidden="true" className="explore-search-icon" />}
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
        <div className="explore-section-heading"><h2>사람들이 많이 찾는 코스</h2><button type="button" onClick={() => navigate("/explore/popular")}>더보기 〉</button></div>
        <div
          className="explore-popular-scroll"
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
        <div className="explore-section-heading"><h2>컨셉별 투어</h2><button type="button" onClick={() => navigate("/explore/concepts")}>더보기 〉</button></div>
        <div className="explore-concept-list">
          {featuredConceptTours.map(({ slug, title, description, image, iconStyle, stars }) => (
            <button className="explore-concept-card" key={title} onClick={() => navigate(`/explore/concepts/${slug}`)}>
              <span><strong>{title}</strong><small>{description}</small></span>
              <span className="explore-concept-art">
                {stars.map((star) => (
                  <img
                    className="explore-concept-art__star"
                    src={star.image}
                    style={star.style}
                    alt=""
                    key={star.image}
                  />
                ))}
                <img className="explore-concept-art__icon" src={image} style={iconStyle} alt="" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="explore-section-heading">
          <h2>노선 따라 둘러보기</h2>
          <button
            type="button"
            onClick={() => navigate(`/explore/lines?line=${line}`)}
          >
            전체보기 〉
          </button>
        </div>
        <div
          className="explore-line-filter"
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
              className={line === number ? "is-active" : ""}
              onClick={() => setLine(number)}
            >
              {number}호선
            </button>
          ))}
        </div>
        <div className="explore-course-list">
          {stationsByLine[`${line}호선`].slice(0, 3).map((stationName, index) => (
            <ExploreCourseItem
              key={`${line}-${stationName}`}
              line={line as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}
              stationName={stationName}
              filledImage={index === 0}
            />
          ))}
        </div>
      </section>

      <BottomNav mode="course" activeTab="explore" />
    </main>
  );
}
