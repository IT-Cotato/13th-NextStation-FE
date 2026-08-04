import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import { conceptTours } from "./data/conceptTours";
import "./ExplorePage.css";
import "./ConceptTours.additions.css";
import "./ExploreReviewFixes.css";

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
            navigate(
              `/explore/search?q=${encodeURIComponent(keyword)}&source=concept`,
            );
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
