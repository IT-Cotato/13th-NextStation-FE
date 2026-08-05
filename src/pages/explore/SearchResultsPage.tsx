import { exploreAsset } from "@/assets/explore";
import BackIcon from "@/assets/back.svg?react";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { stationsByLine } from "@/mocks/StationByLine";
import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";
import { conceptTours } from "./data/conceptTours";
import ExploreSearchForm from "./components/ExploreSearchForm";

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
    <main className="min-h-dvh bg-gray-10 text-gray-100">
      <header className="flex h-[115px] items-stretch gap-4 px-[15px] pb-2.5 pt-[57px]">
        <button type="button" className="w-6 shrink-0 border-0 bg-transparent p-0" aria-label="이전" onClick={goBack}>
          <BackIcon className="size-6" aria-hidden="true" />
        </button>
        <ExploreSearchForm
          key={urlQuery}
          className="flex min-w-0 flex-1 [&_input]:h-11 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-gray-40 [&_input]:bg-gray-20 [&_input]:px-4 [&_input]:py-3 [&_input]:text-body-01 [&_input]:text-gray-90 [&_input]:outline-none focus-within:[&_input]:border-primary-50 focus-within:[&_input]:bg-white"
          onSubmit={(nextQuery) => {
            setSearchParams(
              nextQuery
                ? {
                    q: nextQuery,
                    ...(isConceptSearch ? { source: "concept" } : {}),
                  }
                : {},
            );
          }}
          defaultValue={urlQuery}
        />
      </header>

      {hasResults ? (
        isConceptSearch ? (
          <section
            className="grid grid-cols-2 gap-3 px-[15px]"
            aria-label={`${urlQuery} 검색 결과`}
          >
            {conceptResults.map(
              ({ slug, title, description, artwork, combinedStyle }) => (
                <button
                  type="button"
                  className="relative h-52 overflow-hidden rounded-lg border-0 bg-white p-0 text-left shadow-[0_0_20px_rgb(118_118_118/10%)] outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
                  key={slug}
                  onClick={() => navigate(`/explore/concepts/${slug}`)}
                >
                  <img className="absolute object-contain" src={artwork} alt="" style={combinedStyle} />
                  <span className="absolute left-4 top-[90px] z-[2] flex flex-col items-start gap-2 [&>small]:flex [&>small]:items-center [&>small]:gap-2 [&>small]:text-caption [&>small]:text-gray-60 [&>small>i]:grid [&>small>i]:size-[18px] [&>small>i]:place-items-center [&>small>i]:rounded-full [&>small>i]:bg-gray-60 [&>small>i]:not-italic [&>small>i]:text-white">
                    <span className="max-w-full text-title-01 font-semibold leading-[1.4] [overflow-wrap:anywhere]">{title}</span>
                    <span className="flex flex-col text-body-01 leading-[1.4] text-gray-70">
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
          <section className="flex flex-col gap-3 px-[15px] py-4 [&>article]:min-h-[120px]" aria-label={`${urlQuery} 검색 결과`}>
            {results.map(({ line, stationName }) => (
              <ExploreCourseItem
                key={`${line}-${stationName}`}
                line={line}
                stationName={stationName}
                filledImage
              />
            ))}
          </section>
        )
      ) : (
        <section className="flex flex-col items-center gap-5 pt-[163px] [&_img]:block [&_img]:h-[200px] [&_img]:w-[222px] [&_img]:object-contain [&_p]:m-0 [&_p]:w-[222px] [&_p]:text-center [&_p]:text-subtitle [&_p]:leading-[1.4] [&_p]:tracking-[-0.4px] [&_p]:text-gray-80">
          <img src={exploreAsset("search-empty.svg")} alt="" />
          <p>일치하는 검색 결과가 없어요!</p>
        </section>
      )}
    </main>
  );
}
