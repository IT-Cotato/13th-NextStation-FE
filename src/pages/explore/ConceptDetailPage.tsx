import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import ExploreCourseItem from "./components/ExploreCourseItem";
import { stationsByLine } from "@/mocks/StationByLine";
import { conceptDetails, type ConceptId } from "./data/conceptDetails";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ConceptDetail.additions.css";
import "./ExploreReviewFixes.css";

export default function ConceptDetailPage() {
  const goBack = useSafeBack("/explore/concepts");
  const { conceptId = "stationery" } = useParams();
  const detail = conceptDetails[conceptId as ConceptId] ?? conceptDetails.stationery;
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<"전체" | "최신순" | "인기순">("전체");
  const stations = stationsByLine["2호선"];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [conceptId]);

  return (
    <main className="explore-page explore-concept-detail">
      <header className="explore-concept-detail__header" style={{ height: detail.headerHeight }}>
        <button type="button" onClick={goBack} aria-label="뒤로가기"><span>‹</span></button>
        <div className="explore-concept-detail__copy">
          <h1>{detail.title}</h1>
          <p>
            {detail.description.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="explore-concept-detail__art">
          <img className="explore-concept-detail__star" src={detail.star} alt="" style={detail.starStyle} />
          <img className="explore-concept-detail__icon" src={detail.icon} alt="" style={detail.iconStyle} />
        </div>
      </header>

      <div className="explore-sort">
        <button type="button" aria-expanded={sortOpen} onClick={() => setSortOpen((open) => !open)}>
          {sort} <span className={sortOpen ? "is-open" : ""}>⌃</span>
        </button>
        {sortOpen && (
          <div className="explore-sort__menu">
            {(["최신순", "인기순"] as const).map((option) => (
              <button
                type="button"
                className={sort === option ? "is-selected" : ""}
                key={option}
                onClick={() => { setSort(option); setSortOpen(false); }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <section className="explore-ranking-list explore-concept-detail__list" aria-label={`${detail.title} ${sort}`}>
        {stations.slice(0, 6).map((stationName, index) => (
          <ExploreCourseItem
            key={stationName}
            line={2}
            stationName={stationName}
            filledImage={index === 0}
          />
        ))}
      </section>
    </main>
  );
}
