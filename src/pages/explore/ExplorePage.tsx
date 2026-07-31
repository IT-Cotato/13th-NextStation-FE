import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import ExploreCourseCard from "./components/ExploreCourseCard";
import ExploreCourseItem from "./components/ExploreCourseItem";
import { stationsByLine } from "@/mocks/StationByLine";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";

const concepts = [
  {
    slug: "stationery",
    title: "문구 투어",
    description: "작은 문구점과 책방을 찾아가는 코스",
    image: "/explore/concept-stationery-figma.png",
    iconStyle: { right: 34, top: 20, width: 75, height: 57 },
    stars: [
      { image: "/explore/main-concept-stationery-star.svg", style: { right: 14, top: -6, width: 88, height: 88 } },
    ],
  },
  {
    slug: "value",
    title: "가성비 투어",
    description: "돈은 적게, 만족은 충분한 알뜰 코스",
    image: "/explore/concept-value-figma.png",
    iconStyle: { right: 37, top: 15, width: 57, height: 57 },
    stars: [
      { image: "/explore/main-concept-value-star.svg", style: { right: 74, top: 23, width: 70, height: 68 } },
      { image: "/explore/main-concept-value-star-small.svg", style: { right: 14, top: 8, width: 33, height: 32, transform: "rotate(14.42deg)" } },
    ],
  },
  {
    slug: "culture",
    title: "문화재 투어",
    description: "서울 속 오래된 흔적을 만나는 코스",
    image: "/explore/concept-culture-figma.png",
    iconStyle: { right: 41, top: 16, width: 56, height: 56 },
    stars: [
      { image: "/explore/main-concept-culture-star.svg", style: { right: -5, top: -1, width: 83, height: 83, transform: "rotate(-20.62deg)" } },
    ],
  },
];

export default function ExplorePage() {
  const navigate = useNavigate();
  const [line, setLine] = useState(1);
  const [query, setQuery] = useState("");

  return (
    <main className="explore-page">
      <header className="explore-header">
        <h1>오늘은 어떤 환승여행을<br />둘러볼까요?</h1>
        <button aria-label="관심 코스"><img src="/explore/heart-outline.svg" alt="" /></button>
      </header>

      <label className="explore-search">
        <span>⌕</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && query.trim()) {
              navigate(`/explore/search?q=${encodeURIComponent(query.trim())}`);
            }
          }}
          placeholder="역 이름, 동네, 코스명 검색"
        />
      </label>

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
          {concepts.map(({ slug, title, description, image, iconStyle, stars }) => (
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
