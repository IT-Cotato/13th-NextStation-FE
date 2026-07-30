import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";

export default function SearchResultsPage() {
  const goBack = useSafeBack();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const hasResults = useMemo(() => query.trim().includes("신림"), [query]);

  return (
    <main className="explore-search-results">
      <header className="explore-search-results__top">
        <button type="button" className="explore-search-results__back" aria-label="이전" onClick={goBack}>
          <span aria-hidden="true" />
        </button>
        <form
          className="explore-search-results__form"
          onSubmit={(event) => {
            event.preventDefault();
            const nextQuery = query.trim();
            setSearchParams(nextQuery ? { q: nextQuery } : {});
          }}
        >
          <input aria-label="코스 검색" value={query} onChange={(event) => setQuery(event.target.value)} />
        </form>
      </header>

      {hasResults ? (
        <section className="explore-search-results__list" aria-label={`${query} 검색 결과`}>
          {Array.from({ length: 6 }, (_, index) => (
            <ExploreCourseItem key={index} rank={1} line={2} stationName="신림역" filledImage={index === 0} />
          ))}
        </section>
      ) : (
        <section className="explore-search-results__empty">
          <img src="/explore/search-empty-figma.png" alt="" />
          <p>일치하는 검색 결과가 없어요!</p>
        </section>
      )}
    </main>
  );
}
