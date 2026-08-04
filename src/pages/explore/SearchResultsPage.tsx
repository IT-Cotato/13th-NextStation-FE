import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { stationsByLine } from "@/mocks/StationByLine";
import type { SubwayLine } from "@/types/subway";
import ExploreCourseItem from "./components/ExploreCourseItem";
import ExploreSearchBar from "./components/ExploreSearchBar";
import useSafeBack from "./hooks/useSafeBack";
import { conceptTours } from "./data/conceptTours";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";

interface SearchResultsSearchBarProps {
  initialValue: string;
  isConceptSearch: boolean;
  onSearch: (query: string) => void;
}

function SearchResultsSearchBar({
  initialValue,
  isConceptSearch,
  onSearch,
}: SearchResultsSearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  return (
    <ExploreSearchBar
      className="explore-concept-search"
      value={query}
      onChange={setQuery}
      onSubmit={() => onSearch(query)}
      placeholder={
        isConceptSearch
          ? "컨셉 이름, 분위기, 키워드 검색"
          : "역 이름, 동네, 코스명 검색"
      }
    />
  );
}

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
            line: line as SubwayLine,
            stationName,
          }));
      });
  }, [isConceptSearch, urlQuery]);
  const hasResults = isConceptSearch
    ? conceptResults.length > 0
    : results.length > 0;

  const handleSearch = (nextValue: string) => {
    const nextQuery = nextValue.trim();
    setSearchParams(
      nextQuery
        ? {
            q: nextQuery,
            ...(isConceptSearch ? { source: "concept" } : {}),
          }
        : {},
    );
  };

  return (
    <main className="explore-search-results pt-[calc(var(--safe-top)+12px)] tracking-[-0.025em]">
      <Header showBack onBackClick={goBack} />
      <SearchResultsSearchBar
        key={`${isConceptSearch}-${urlQuery}`}
        initialValue={urlQuery}
        isConceptSearch={isConceptSearch}
        onSearch={handleSearch}
      />

      {hasResults ? (
        isConceptSearch ? (
          <section
            className="explore-concept-grid"
            aria-label={`${urlQuery} 검색 결과`}
          >
            {conceptResults.map(
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
                  key={slug}
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
