import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import "./ExplorePage.css";
import "./ConceptTours.additions.css";
import "./ExploreReviewFixes.css";

const conceptTours = [
  { slug: "stationery", title: "문구 투어", description: "작은 문구점과 책방을\n찾아가는 코스", image: "/explore/concept-stationery-figma.png", star: "/explore/detail-stationery-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 16, top: 36, width: 89, height: 69 } },
  { slug: "value", title: "가성비 투어", description: "돈은 적게, 만족은\n충분한 알뜰 코스", image: "/explore/concept-value-figma.png", star: "/explore/detail-value-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 32, width: 70, height: 70 } },
  { slug: "culture", title: "문화재 투어", description: "서울 속 오래된\n흔적을 만나는 코스", image: "/explore/concept-culture-figma.png", star: "/explore/detail-culture-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 32, width: 71, height: 71 } },
  { slug: "nature", title: "자연 속 힐링 투어", description: "하천과 공원을 따라\n쉬어가는 코스", image: "/explore/concept-nature-figma.png", star: "/explore/detail-nature-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 20, top: 28, width: 70, height: 76 } },
  { slug: "rain", title: "비 오는 날 투어", description: "흐린 날에도 걷기 좋은\n실내 중심 코스", image: "/explore/concept-rain-figma.png", star: "/explore/detail-rain-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 28, width: 68, height: 71 } },
  { slug: "neighborhood", title: "동네 탐방 투어", description: "익숙하지 않은 골목과\n동네를 만나는 코스", image: "/explore/concept-neighborhood-figma.png", star: "/explore/detail-neighborhood-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 28, width: 72, height: 72 } },
  { slug: "books", title: "전시·서점 투어", description: "조용히 보고 머무는\n문화 공간 코스", image: "/explore/concept-books-figma.png", star: "/explore/detail-books-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 32, width: 78, height: 72 } },
  { slug: "after-work", title: "퇴근 후 2시간 투어", description: "짧게 다녀와도\n기분 전환되는 코스", image: "/explore/concept-clock-figma.png", star: "/explore/detail-after-work-star.png", starStyle: { right: 6, top: 10, width: 88, height: 88 }, iconStyle: { right: 24, top: 32, width: 65, height: 70 } },
];

export default function ConceptToursPage() {
  const navigate = useNavigate();
  const goBack = useSafeBack();
  const [query, setQuery] = useState("");

  return (
    <main className="explore-page explore-concepts-page">
      <header className="explore-ranking-header">
        <button type="button" onClick={goBack} aria-label="뒤로가기">
          <span aria-hidden="true">‹</span>
        </button>
        <div>
          <h1>컨셉별 투어</h1>
          <p>오늘의 기분에 맞는 여행 코스를 골라보세요</p>
        </div>
      </header>

      <form
        className="explore-search explore-concept-search"
        onSubmit={(event) => {
          event.preventDefault();
          const keyword = query.trim();

          if (keyword) {
            navigate(`/explore/search?q=${encodeURIComponent(keyword)}`);
          }
        }}
      >
        <span aria-hidden="true" className="explore-search-icon" />
        <input
          aria-label="코스 검색"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="컨셉 이름, 분위기, 키워드 검색"
        />
      </form>

      <section className="explore-concept-grid" aria-label="컨셉별 투어 목록">
        {conceptTours.map(
          ({ slug, title, description, image, star, starStyle, iconStyle }) => (
            <button
              type="button"
              className="explore-concept-tile"
              key={title}
              onClick={() => navigate(`/explore/concepts/${slug}`)}
            >
              <span className="explore-concept-tile__art">
                <img
                  className="explore-concept-tile__star"
                  src={star}
                  alt=""
                  style={starStyle}
                />
                <img
                  className="explore-concept-tile__icon"
                  src={image}
                  alt=""
                  style={iconStyle}
                />
              </span>
              <span className="explore-concept-tile__content">
                <strong>{title}</strong>
                <span className="explore-concept-tile__description">
                  {description.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
                <small>
                  <i aria-hidden="true">★</i> 코스 18개
                </small>
              </span>
            </button>
          ),
        )}
      </section>
    </main>
  );
}
