import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import ExploreCourseItem from "./components/ExploreCourseItem";
import { stationsByLine } from "@/mocks/StationByLine";
import "./ExplorePage.css";
import "./ExplorePage.additions.css";
import "./ConceptDetail.additions.css";
import "./ExploreReviewFixes.css";

const conceptDetails = {
  stationery: {
    title: "문구 투어",
    description: <>작은 문구점과 책방을 따라 걷는<br />아기자기한 환승여행 코스</>,
    star: "/explore/detail-stationery-star.png",
    icon: "/explore/detail-stationery-icon.png",
    headerHeight: 217,
    starStyle: { right: 24, top: 59, width: 128, height: 127 },
    iconStyle: { right: 41, top: 97, width: 123, height: 96 },
  },
  value: {
    title: "가성비 투어",
    description: <>돈은 적게, 만족은 충분한 알뜰 코스</>,
    star: "/explore/detail-value-star.png",
    icon: "/explore/detail-value-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 46, width: 124, height: 124 },
    iconStyle: { right: 51, top: 79, width: 95, height: 94 },
  },
  culture: {
    title: "문화재 투어",
    description: <>서울 속 오래된 흔적을 만나는 코스</>,
    star: "/explore/detail-culture-star.png",
    icon: "/explore/detail-culture-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 50, width: 119, height: 119 },
    iconStyle: { right: 50, top: 81, width: 92, height: 92 },
  },
  nature: {
    title: "자연 속 힐링 투어",
    description: <>하천과 공원을 따라 쉬어가는 코스</>,
    star: "/explore/detail-nature-star.png",
    icon: "/explore/detail-nature-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 40, width: 128, height: 128 },
    iconStyle: { right: 46, top: 67, width: 98, height: 106 },
  },
  rain: {
    title: "비 오는 날 투어",
    description: <>흐린 날에도 걷기 좋은 실내 중심 코스</>,
    star: "/explore/detail-rain-star.png",
    icon: "/explore/detail-rain-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 49, width: 124, height: 124 },
    iconStyle: { right: 51, top: 76, width: 92, height: 96 },
  },
  neighborhood: {
    title: "동네 탐방 투어",
    description: <>익숙하지 않은 골목과 동네를 만나는 코스</>,
    star: "/explore/detail-neighborhood-star.png",
    icon: "/explore/detail-neighborhood-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 49, width: 124, height: 124 },
    iconStyle: { right: 51, top: 76, width: 97, height: 97 },
  },
  books: {
    title: "전시·서점 투어",
    description: <>조용히 보고 머무는 문화 공간 코스</>,
    star: "/explore/detail-books-star.png",
    icon: "/explore/detail-books-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 51, width: 117, height: 117 },
    iconStyle: { right: 49, top: 82, width: 99, height: 91 },
  },
  "after-work": {
    title: "퇴근 후 2시간 투어",
    description: <>짧게 다녀와도 기분 전환되는 코스</>,
    star: "/explore/detail-after-work-star.png",
    icon: "/explore/detail-after-work-icon.png",
    headerHeight: 197,
    starStyle: { right: 24, top: 47, width: 124, height: 123 },
    iconStyle: { right: 51, top: 79, width: 87, height: 94 },
  },
} as const;

export default function ConceptDetailPage() {
  const goBack = useSafeBack("/explore/concepts");
  const { conceptId = "stationery" } = useParams();
  const detail = conceptDetails[conceptId as keyof typeof conceptDetails] ?? conceptDetails.stationery;
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
          <p>{detail.description}</p>
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
