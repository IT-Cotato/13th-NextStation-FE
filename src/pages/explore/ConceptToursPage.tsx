import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSafeBack from "./hooks/useSafeBack";
import "./ExplorePage.css";
import "./ConceptTours.additions.css";
import "./ExploreReviewFixes.css";

const conceptTours = [
  { slug: "stationery", title: "문구 투어", description: "작은 문구점과 책방을\n찾아가는 코스", image: "/explore/concept-stationery-figma.png", tone: "pink" },
  { slug: "value", title: "가성비 투어", description: "돈은 적게, 만족은\n충분한 알뜰 코스", image: "/explore/concept-value-figma.png", tone: "blue" },
  { slug: "culture", title: "문화재 투어", description: "서울 속 오래된\n흔적을 만나는 코스", image: "/explore/concept-culture-figma.png", tone: "orange" },
  { slug: "nature", title: "자연 속 힐링 투어", description: "하천과 공원을 따라\n쉬어가는 코스", image: "/explore/concept-nature-figma.png", tone: "green" },
  { slug: "rain", title: "비 오는 날 투어", description: "흐린 날에도 걷기 좋은\n실내 중심 코스", image: "/explore/concept-rain-figma.png", tone: "blue" },
  { slug: "neighborhood", title: "동네 탐방 투어", description: "익숙하지 않은 골목과\n동네를 만나는 코스", image: "/explore/concept-neighborhood-figma.png", tone: "purple" },
  { slug: "books", title: "전시·서점 투어", description: "조용히 보고 머무는\n문화 공간 코스", image: "/explore/concept-books-figma.png", tone: "orange" },
  { slug: "after-work", title: "퇴근 후 2시간 투어", description: "짧게 다녀와도\n기분 전환되는 코스", image: "/explore/concept-clock-figma.png", tone: "pink" },
];

export default function ConceptToursPage() {
  const navigate = useNavigate();
  const goBack = useSafeBack();
  const [query, setQuery] = useState("");
  const filteredTours = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return conceptTours;
    return conceptTours.filter(({ title, description }) =>
      `${title} ${description}`.toLowerCase().includes(keyword),
    );
  }, [query]);

  return (
    <main className="explore-page explore-concepts-page">
      <header className="explore-ranking-header">
        <button type="button" onClick={goBack} aria-label="뒤로가기">
          <span aria-hidden="true">‹</span>
        </button>
        <div>
          <h1>컨셉별 투어</h1>
          <p>오늘의 기분에 맞는 여행 코스를 골라보세요</p>
        </div>
      </header>

      <label className="explore-search explore-concept-search">
        <span aria-hidden="true" className="explore-search-icon" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="컨셉 이름, 분위기, 키워드 검색"
        />
      </label>

      {filteredTours.length > 0 ? (
        <section className="explore-concept-grid" aria-label="컨셉별 투어 목록">
          {filteredTours.map(({ slug, title, description, image, tone }) => (
            <button type="button" className="explore-concept-tile" key={title} onClick={() => navigate(`/explore/concepts/${slug}`)}>
              <span className={`explore-concept-tile__art is-${tone}`}>
                <img src={image} alt="" />
              </span>
              <span className="explore-concept-tile__content">
                <strong>{title}</strong>
                <span className="explore-concept-tile__description">
                  {description.split("\n").map((line) => <span key={line}>{line}</span>)}
                </span>
                <small><i aria-hidden="true">★</i> 코스 18개</small>
              </span>
            </button>
          ))}
        </section>
      ) : (
        <p className="explore-concept-no-results">검색 결과가 없어요.</p>
      )}
    </main>
  );
}
