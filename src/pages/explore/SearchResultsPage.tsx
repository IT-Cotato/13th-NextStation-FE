import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { stationsByLine } from "@/mocks/StationByLine";
import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";
import { conceptTours } from "./data/conceptTours";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";

export default function SearchResultsPage() {
  const goBack = useSafeBack();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const isConceptSearch = searchParams.get("source") === "concept";
  const conceptResults = useMemo(() => {
    const keyword = urlQuery.trim().toLowerCase();

    if (!keyword || !isConceptSearch) {
      return [];
    }

    return conceptTours.filter(({ slug, title, description }) =>
      `${slug} ${title} ${description}`.toLowerCase().includes(keyword),
    );
  }, [isConceptSearch, urlQuery]);
  const results = useMemo(() => {
    const keyword = urlQuery.trim().toLowerCase();

    if (!keyword || isConceptSearch) {
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
  }, [isConceptSearch, urlQuery]);
  const hasResults = isConceptSearch
    ? conceptResults.length > 0
    : results.length > 0;

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
            setSearchParams(
              nextQuery
                ? {
                    q: nextQuery,
                    ...(isConceptSearch ? { source: "concept" } : {}),
                  }
                : {},
            );
          }}
        >
          <input
            aria-label="코스 검색"
            name="query"
            defaultValue={urlQuery}
          />
        </form>
      </header>

      {hasResults ? (
        isConceptSearch ? (
          <section
            className="explore-concept-grid"
            aria-label={`${urlQuery} 검색 결과`}
          >
            {conceptResults.map(
              ({ slug, title, description, image, star, starStyle, iconStyle }) => (
                <button
                  type="button"
                  className="explore-concept-tile"
                  key={slug}
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
                      <i aria-hidden="true">♥</i> 코스 18개
                    </small>
                  </span>
                </button>
              ),
            )}
          </section>
        ) : (
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
        )
      ) : (
        <section className="explore-search-results__empty">
          <img src="/explore/search-empty-figma.png" alt="" />
          <p>일치하는 검색 결과가 없어요!</p>
        </section>
      )}
    </main>
  );
}
