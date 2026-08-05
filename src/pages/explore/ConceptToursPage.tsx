import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import { conceptTours } from "./data/conceptTours";
import Header from "@/components/Header";
import SearchIcon from "@/assets/search.svg?react";
import ExploreSearchForm from "./components/ExploreSearchForm";

export default function ConceptToursPage() {
  const navigate = useNavigate();
  const goBack = useSafeBack();
  const [query, setQuery] = useState("");

  return (
    <main className="relative h-dvh min-h-0 overflow-x-hidden overflow-y-auto bg-gray-10 pb-7 text-gray-100 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="h-[156px] px-[15px] pb-2.5 pt-[57px]">
        <div className="mb-4 h-6 [&>header]:h-6 [&>header]:grid-cols-[24px_1fr_24px] [&>header]:p-0"><Header showBack onBackClick={goBack} /></div>
        <div className="flex flex-col gap-1 [&_h1]:m-0 [&_h1]:text-title-01 [&_h1]:font-semibold [&_h1]:leading-[1.4] [&_h1]:tracking-[-0.5px] [&_p]:m-0 [&_p]:text-body-02 [&_p]:leading-[1.4] [&_p]:tracking-[-0.3px] [&_p]:text-gray-70">
          <h1>컨셉별 투어</h1>
          <p>오늘의 기분에 맞는 여행 코스를 골라보세요</p>
        </div>
      </div>

      <ExploreSearchForm
        className="mx-[15px] mb-4 mt-[9px] flex h-12 items-center gap-2 rounded-lg border border-gray-40 bg-gray-20 p-3 text-gray-70 focus-within:border-primary-50 focus-within:bg-white [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-body-01 [&_input]:outline-none"
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
        {conceptTours.map(
          ({
            slug,
            title,
            description,
            artwork,
            combinedStyle,
            courseCount,
          }) => (
            <button
              type="button"
              className="relative h-52 overflow-hidden rounded-lg border-0 bg-white p-0 text-left shadow-[0_0_20px_rgb(118_118_118/10%)] outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
              key={title}
              onClick={() => navigate(`/explore/concepts/${slug}`)}
            >
              <img className="absolute object-contain" src={artwork} alt="" style={combinedStyle} />
              <span className="absolute left-4 top-[90px] z-[2] flex flex-col items-start gap-2 [&>small]:flex [&>small]:items-center [&>small]:gap-2 [&>small]:text-caption [&>small]:font-normal [&>small]:leading-none [&>small]:text-gray-60 [&>small>i]:grid [&>small>i]:size-[18px] [&>small>i]:place-items-center [&>small>i]:rounded-full [&>small>i]:bg-gray-60 [&>small>i]:text-caption [&>small>i]:not-italic [&>small>i]:text-white">
                <span className="block max-w-full text-title-01 font-semibold leading-[1.4] tracking-[-0.5px] [overflow-wrap:anywhere] max-[360px]:text-title-02">{title}</span>
                <span className="flex flex-col text-body-01 leading-[1.4] tracking-[-0.35px] text-gray-70 max-[360px]:text-body-02">
                  {description.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
                <small>
                  <i aria-hidden="true">★</i> 코스 {courseCount}개
                </small>
              </span>
            </button>
          ),
        )}
      </section>
    </main>
  );
}
