import ExploreCourseItem from "./components/ExploreCourseItem";
import Header from "@/components/Header";
import useSafeBack from "./hooks/useSafeBack";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";

export default function PopularCoursesPage() {
  const goBack = useSafeBack();

  return (
    <main className="explore-page explore-ranking-page pt-[calc(var(--safe-top)+12px)] tracking-[-0.025em]">
      <Header showBack onBackClick={goBack} />
      <div className="px-[15px] pb-[5px]">
        <h1 className="text-headline font-semibold leading-[1.4]">
          사람들이 많이 찾는 코스
        </h1>
        <p className="mt-1 text-caption font-regular leading-[1.4] text-gray-70">
          사람들이 나중에 가려고 가장 많이 담아둔 코스예요
        </p>
      </div>

      <section className="explore-ranking-list" aria-label="인기 코스 순위">
        {Array.from({ length: 6 }, (_, index) => (
          <ExploreCourseItem
            key={index}
            rank={index + 1}
            filledImage={index === 0}
          />
        ))}
      </section>
    </main>
  );
}
