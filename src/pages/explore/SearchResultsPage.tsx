import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { stationsByLine } from "@/mocks/StationByLine";
import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";

export default function SearchResultsPage() {
  const goBack = useSafeBack();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const results = useMemo(() => {
    const keyword = urlQuery.trim().toLowerCase();

    if (!keyword) {
      return [];
    }

    return Object.entries(stationsByLine)
      .filter(([lineLabel]) => lineLabel !== "전체")
      .flatMap(([lineLabel, stationNames]) => {
        const line = Number(lineLabel.replace("호선", ""));

        return stationNames
          .filter((stationName) =>
            `${lineLabel} ${stationName}`.toLowerCase().includes(keyword),
          )
          .map((stationName) => ({
            line: line as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
            stationName,
          }));
      });
  }, [urlQuery]);

  return (
    <main className="explore-search-results">
      <header className="explore-search-results__top">
        <button type="button" className="explore-search-results__back" aria-label="이전" onClick={goBack}>
          <span aria-hidden="true" />
        </button>
        <form
          key={urlQuery}
          className="explore-search-results__form"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const nextQuery = String(formData.get("query") ?? "").trim();
            setSearchParams(nextQuery ? { q: nextQuery } : {});
          }}
        >
          <input
            aria-label="코스 검색"
            name="query"
            defaultValue={urlQuery}
          />
        </form>
      </header>

      {results.length > 0 ? (
        <section className="explore-search-results__list" aria-label={`${urlQuery} 검색 결과`}>
          {results.map(({ line, stationName }, index) => (
            <ExploreCourseItem
              key={`${line}-${stationName}`}
              rank={index + 1}
              line={line}
              stationName={stationName}
              filledImage={index === 0}
            />
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
