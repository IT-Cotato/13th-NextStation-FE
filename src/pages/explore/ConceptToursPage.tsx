import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getConceptTours, type ConceptTour } from "@/api/explore";
import Header from "@/components/Header";
import ConceptTourCard from "./components/ConceptTourCard";
import ExploreSearchBar from "./components/ExploreSearchBar";
import { getConceptTourDesign } from "./data/conceptTours";

export default function ConceptToursPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [conceptTours, setConceptTours] = useState<ConceptTour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const displayedTours = conceptTours
    .filter((tour) =>
      `${tour.name} ${tour.description}`.toLowerCase().includes(normalizedQuery),
    )
    .map((tour) => ({
      tour,
      design: getConceptTourDesign(tour.conceptTourId),
    }));

  useEffect(() => {
    void getConceptTours()
      .then((items) => {
        setConceptTours(items);
        setHasError(false);
      })
      .catch(() => {
        setConceptTours([]);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="flex h-dvh flex-col bg-gray-10 text-gray-100 pt-[calc(var(--safe-top)+12px)] text-gray-100 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <Header showBack />
      <div className="flex flex-col gap-1 px-[15px] pb-2.5">
        <h1 className="text-title-01 font-semibold leading-[1.4] tracking-[-0.025em]">
          컨셉별 투어
        </h1>
        <p className="text-body-02 leading-[1.4] tracking-[-0.025em] text-gray-70">
          오늘의 기분에 맞는 여행 코스를 골라보세요
        </p>
      </div>

      <div className="mx-[15px] mb-4 mt-[9px]">
        <ExploreSearchBar
          onSubmit={setQuery}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="컨셉 이름, 분위기, 키워드 검색"
        />
      </div>

      <section
        className="grid grid-cols-2 gap-3 px-[15px] pb-5"
        aria-label="컨셉별 투어 목록"
      >
        {displayedTours.map(({ tour, design }) =>
          design ? (
            <ConceptTourCard
              key={tour.conceptTourId}
              Artwork={design.Artwork}
              artworkClassName={design.artworkClassName}
              name={tour.name}
              description={tour.description}
              courseCount={tour.courseCount}
              onClick={() =>
                navigate(`/explore/concepts/${tour.conceptTourId}`, {
                  state: { conceptTour: tour },
                })
              }
            />
          ) : null,
        )}
      </section>
      {isLoading && (
        <p className="px-[15px] py-16 text-center text-body-01 text-gray-60">
          컨셉을 불러오는 중...
        </p>
      )}
      {!isLoading && hasError && (
        <p className="px-[15px] py-16 text-center text-body-01 text-gray-60">
          컨셉 목록을 불러오지 못했습니다.
        </p>
      )}
      {!isLoading && !hasError && displayedTours.length === 0 && (
        <p className="px-[15px] py-16 text-center text-body-01 text-gray-60">
          일치하는 컨셉이 없어요.
        </p>
      )}
    </main>
  );
}
