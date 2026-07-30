import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ExploreReviewFixes.css";

export default function PopularCoursesPage() {
  const goBack = useSafeBack();

  return (
    <main className="explore-page explore-ranking-page">
      <header className="explore-ranking-header">
        <button type="button" onClick={goBack} aria-label="뒤로가기">
          <span aria-hidden="true">‹</span>
        </button>
        <div>
          <h1>사람들이 많이 찾는 코스</h1>
          <p>사람들이 나중에 가려고 가장 많이 담아둔 코스예요</p>
        </div>
      </header>

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
