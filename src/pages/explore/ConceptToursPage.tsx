import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import { conceptTours as conceptTourDesigns } from "./data/conceptTours";
import Header from "@/components/Header";
import SearchIcon from "@/assets/search.svg?react";
import ExploreSearchForm from "./components/ExploreSearchForm";
import { getConceptTours, type ConceptTour } from "@/api/explore";
import ConceptTourCard from "./components/ConceptTourCard";

export default function ConceptToursPage() {
  const navigate = useNavigate();
  const goBack = useSafeBack();
  const [query, setQuery] = useState("");
  const [conceptTours, setConceptTours] = useState<ConceptTour[]>([]);
  const displayedTours = conceptTourDesigns.map((design, index) => ({
    design,
    tour: conceptTours[index] ?? {
      conceptTourId: index + 1,
      name: design.title,
      description: design.description.replace("\n", " "),
      courseCount: 0,
    },
  }));

  useEffect(() => { void getConceptTours().then(setConceptTours).catch(() => setConceptTours([])); }, []);

  return (
    <main className="h-dvh min-h-0 overflow-x-hidden overflow-y-auto bg-gray-10 pb-7 text-gray-100 [scrollbar-width:none]">
      <div className="h-[156px] px-[15px] pb-2.5 pt-[57px]">
        <div className="mb-4 h-6"><Header className="grid h-6 w-full grid-cols-[24px_1fr_24px] items-center p-0" showBack onBackClick={goBack} /></div>
        <div className="flex flex-col gap-1">
          <h1 className="m-0 text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">컨셉별 투어</h1>
          <p className="m-0 text-body-02 leading-[1.4] tracking-[-0.3px] text-gray-70">오늘의 기분에 맞는 여행 코스를 골라보세요</p>
        </div>
      </div>

      <ExploreSearchForm
        className="mx-[15px] mb-4 mt-[9px] flex h-12 items-center gap-2 rounded-lg border border-gray-40 bg-gray-20 p-3 text-gray-70 focus-within:border-primary-50 focus-within:bg-white"
        inputClassName="w-full border-0 bg-transparent text-body-01 outline-none"
        icon={<SearchIcon className="size-5 shrink-0" aria-hidden="true" />}
        onSubmit={(keyword) => {
          if (keyword) {
            navigate(
              `/explore/search?q=${encodeURIComponent(keyword)}&source=concept`,
            );
          }
        }}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="컨셉 이름, 분위기, 키워드 검색"
      />

      <section className="grid grid-cols-2 gap-3 px-[15px]" aria-label="컨셉별 투어 목록">
        {displayedTours.map(({ tour, design }) => {
          return (
            <ConceptTourCard
              key={tour.conceptTourId}
              artwork={design.artwork}
              artworkWidth={design.combinedStyle.width}
              artworkHeight={design.combinedStyle.height}
              name={tour.name}
              description={tour.description}
              courseCount={tour.courseCount}
              onClick={() => navigate(`/explore/concepts/${tour.conceptTourId}`)}
            />
          );
        })}
      </section>
    </main>
  );
}
