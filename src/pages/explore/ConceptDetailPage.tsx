import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import ExploreCourseItem from "./components/ExploreCourseItem";
import { conceptDetails, type ConceptId } from "./data/conceptDetails";
import Header from "@/components/Header";
import {
  conceptCourses,
  sortExploreCourses,
  type ExploreSortOption,
} from "./data/exploreCourses";

export default function ConceptDetailPage() {
  const goBack = useSafeBack("/explore/concepts");
  const { conceptId = "stationery" } = useParams();
  const selectedConceptId = conceptId in conceptDetails
    ? (conceptId as ConceptId)
    : "stationery";
  const detail = conceptDetails[selectedConceptId];
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<ExploreSortOption>("전체");
  const courses = sortExploreCourses(
    conceptCourses.filter((course) => course.conceptId === selectedConceptId),
    sort,
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [conceptId]);

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-gray-10 pb-6 text-gray-100">
      <header className="relative px-[15px] pt-[57px]" style={{ height: detail.headerHeight }}>
        <div className="h-6 [&>header]:h-6 [&>header]:grid-cols-[24px_1fr_24px] [&>header]:p-0"><Header showBack onBackClick={goBack} /></div>
        <div className="absolute left-[15px] right-[15px] top-[121px]">
          <h1 className="mb-1 text-xl font-semibold leading-[1.4] tracking-[-0.5px]">{detail.title}</h1>
          <p className="m-0 text-sm leading-[1.4] tracking-[-0.35px] text-gray-70">
            {detail.description.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <img className="absolute object-fill" src={detail.star} alt="" style={detail.starStyle} />
          <img className="absolute object-fill" src={detail.icon} alt="" style={detail.iconStyle} />
        </div>
      </header>

      <div className="relative z-[5] mx-[15px] h-9">
        <button className="absolute right-0 top-0 flex h-9 min-w-24 items-center justify-between gap-3 rounded-[20px] border border-white bg-white/50 px-5 py-2 text-sm font-semibold text-gray-70 backdrop-blur-[10px]" type="button" aria-expanded={sortOpen} onClick={() => setSortOpen((open) => !open)}>
          {sort} <span className={`text-lg transition-transform ${sortOpen ? "rotate-0" : "rotate-180"}`}>⌃</span>
        </button>
        {sortOpen && (
          <div className="absolute right-0 top-12 flex w-24 flex-col gap-3 rounded-[20px] border border-white bg-white/85 px-5 py-3 shadow-[0_0_28px_rgb(118_118_118/25%)] backdrop-blur-[10px]" role="menu">
            {(["최신순", "인기순"] as const).map((option) => (
              <button
                type="button"
                role="menuitemradio"
                aria-checked={sort === option}
                className={`border-0 bg-transparent p-0 text-left text-sm font-semibold leading-[1.4] ${sort === option ? "text-gray-100" : "text-gray-70"}`}
                key={option}
                onClick={() => { setSort(option); setSortOpen(false); }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <section className="flex flex-col gap-3 px-[15px] pb-4 pt-4 [&>article]:min-h-[120px]" aria-label={`${detail.title} ${sort}`}>
        {courses.map((course, index) => (
          <ExploreCourseItem
            key={course.id}
            line={course.line}
            stationName={course.stationName}
            filledImage={index === 0}
          />
        ))}
      </section>
    </main>
  );
}
