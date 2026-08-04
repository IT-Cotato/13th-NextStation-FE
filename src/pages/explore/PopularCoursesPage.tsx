import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";
import Header from "@/components/Header";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";

export default function PopularCoursesPage() {
  const goBack = useSafeBack();

  return (
    <main className="explore-page explore-ranking-page">
      <div className="explore-ranking-header">
        <Header className="explore-ranking-header__nav" showBack onBackClick={goBack} />
        <div>
          <h1>사람들이 많이 찾는 코스</h1>
          <p>사람들이 나중에 가려고 가장 많이 담아둔 코스예요</p>
        </div>
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
