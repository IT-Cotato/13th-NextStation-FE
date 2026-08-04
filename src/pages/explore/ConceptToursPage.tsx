import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ExploreSearchBar from "./components/ExploreSearchBar";
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
    <main className="explore-page explore-concepts-page pt-[calc(var(--safe-top)+12px)] tracking-[-0.025em]">
      <Header showBack onBackClick={goBack} />
      <div className="px-[15px] pb-[5px]">
        <h1 className="text-headline font-semibold leading-[1.4]">컨셉별 투어</h1>
        <p className="mt-1 text-caption font-regular leading-[1.4] text-gray-70">
          오늘의 기분에 맞는 여행 코스를 골라보세요
        </p>
      </div>

      <ExploreSearchBar
        className="explore-concept-search"
        value={query}
        onChange={setQuery}
        onSubmit={() => {
          const keyword = query.trim();

          if (keyword) {
            navigate(
              `/explore/search?q=${encodeURIComponent(keyword)}&source=concept`,
            );
          }
        }}
        placeholder="컨셉 이름, 분위기, 키워드 검색"
      />

      <section className="explore-concept-grid" aria-label="컨셉별 투어 목록">
        {conceptTours.map(
          ({
            slug,
            title,
            description,
            image,
            star,
            tileStarStyle,
            tileIconStyle,
          }) => (
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
                  style={tileStarStyle}
                />
                <img
                  className="explore-concept-tile__icon"
                  src={image}
                  alt=""
                  style={tileIconStyle}
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
