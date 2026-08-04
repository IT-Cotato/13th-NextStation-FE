import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import { conceptTours } from "./data/conceptTours";
import Header from "@/components/Header";
import ExploreSearchForm from "./components/ExploreSearchForm";

export default function ConceptToursPage() {
  const navigate = useNavigate();
  const goBack = useSafeBack();
  const [query, setQuery] = useState("");

  return (
    <main className="relative h-dvh min-h-0 overflow-x-hidden overflow-y-auto bg-gray-10 pb-7 text-gray-100 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="h-[156px] px-[15px] pb-2.5 pt-[57px]">
        <div className="mb-4 h-6 [&>header]:h-6 [&>header]:grid-cols-[24px_1fr_24px] [&>header]:p-0"><Header showBack onBackClick={goBack} /></div>
        <div className="flex flex-col gap-1 [&_h1]:m-0 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:leading-[1.4] [&_h1]:tracking-[-0.5px] [&_p]:m-0 [&_p]:text-xs [&_p]:leading-[1.4] [&_p]:tracking-[-0.3px] [&_p]:text-gray-70">
          <h1>컨셉별 투어</h1>
          <p>오늘의 기분에 맞는 여행 코스를 골라보세요</p>
        </div>
      </div>

      <ExploreSearchForm
        className="mx-[15px] mb-4 mt-[9px] flex h-12 items-center gap-2 rounded-[20px] border border-gray-40 bg-gray-20 p-3 text-gray-70 focus-within:border-primary-50 focus-within:bg-white [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-sm [&_input]:outline-none"
        icon={<span aria-hidden="true" className="relative size-5 shrink-0 rounded-full border-[1.5px] border-gray-70 after:absolute after:-right-1 after:bottom-0 after:h-[1.5px] after:w-[7px] after:origin-left after:rotate-45 after:bg-gray-70 after:content-['']" />}
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
            image,
            star,
            starStyle,
            iconStyle,
            courseCount,
          }) => (
            <button
              type="button"
              className="relative h-52 overflow-hidden rounded-[20px] border-0 bg-white p-0 text-left shadow-[0_0_20px_rgb(118_118_118/10%)] outline-none focus-visible:ring-2 focus-visible:ring-primary-50"
              key={title}
              onClick={() => navigate(`/explore/concepts/${slug}`)}
            >
              <span className="absolute inset-0">
                <img
                  className="absolute object-contain"
                  src={star}
                  alt=""
                  style={starStyle}
                />
                <img
                  className="absolute z-[1] object-contain"
                  src={image}
                  alt=""
                  style={iconStyle}
                />
              </span>
              <span className="absolute left-4 top-[90px] z-[2] flex flex-col items-start gap-2 [&>small]:flex [&>small]:items-center [&>small]:gap-2 [&>small]:text-[10px] [&>small]:font-normal [&>small]:leading-none [&>small]:text-gray-60 [&>small>i]:grid [&>small>i]:size-[18px] [&>small>i]:place-items-center [&>small>i]:rounded-full [&>small>i]:bg-gray-60 [&>small>i]:text-[10px] [&>small>i]:not-italic [&>small>i]:text-white">
                <strong className="block whitespace-nowrap text-xl font-semibold leading-[1.4] tracking-[-0.5px] max-[360px]:text-lg">{title}</strong>
                <span className="flex flex-col text-sm leading-[1.4] tracking-[-0.35px] text-gray-70 max-[360px]:text-[13px]">
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
