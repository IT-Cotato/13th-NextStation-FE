import Header from "@/components/Header";
import StationTitle from "@/components/StationTitle";
import type { SubwayLine } from "@/types/subway";
import SubwayLineChip from "@/components/SubwayLineChip";
import CTAButton from "@/components/CTAButton";
import CourseCard from "./components/CourseCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryTabs from "./components/CategoryTabs";
import {
  getStationCourseRecommendation,
  type StationCategoryPlace,
  type StationCourseRecommendation,
} from "@/api/courseRecommendation";
import type { CustomRecommendationRequest } from "@/api/recommendation";

type CreatePageState = {
  stationId: number;
  stationName: string;
  lineId: number;
  recommendationRequest?: CustomRecommendationRequest;
};

export default function CreatePage() {
  const { stationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const createPageState = location.state as CreatePageState | null;
  const [station, setStation] = useState<StationCourseRecommendation | null>(
    null,
  );
  const [isStationLoading, setIsStationLoading] = useState(true);
  const [stationError, setStationError] = useState<string | null>(null);
  const [filterCateogry, setFilterCategory] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const isDisabled = selectedIds.length < 3; // 코스 만들기 버튼 활성화 여부

  useEffect(() => {
    const fetchStationCourseRecommendation = async () => {
      if (!stationId) {
        setStationError("잘못된 역입니다.");
        setIsStationLoading(false);
        return;
      }

      try {
        setIsStationLoading(true);
        const data = await getStationCourseRecommendation(
          Number(stationId),
          createPageState?.recommendationRequest?.travelStyles,
        );
        setStation(data);
      } catch (e) {
        console.error(e);
        setStationError("역 정보를 불러오지 못했습니다.");
      } finally {
        setIsStationLoading(false);
      }
    };
    fetchStationCourseRecommendation();
  }, [createPageState?.recommendationRequest?.travelStyles, stationId]);

  if (isStationLoading) return <p>로딩 중...</p>;
  if (stationError) return <p>{stationError}</p>;
  if (!station) return null;

  const handleSelected = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  const categoryNames = station.categories.map((cat) => cat.categoryName);
  const activeCategoryName = filterCateogry || categoryNames[0] || "";
  const activeCategory = station.categories.find(
    (cat) => cat.categoryName === activeCategoryName,
  );
  const places = activeCategory?.places ?? [];

  const placeById = new Map<number, StationCategoryPlace>(
    station.categories.flatMap((category) => category.places).map((place) => [
      place.placeId,
      place,
    ]),
  );

  const selectedPlaces = selectedIds
    .map((id) => placeById.get(id))
    .filter((place): place is StationCategoryPlace => Boolean(place));

  return (
    <main className="flex flex-col h-dvh  bg-gray-10 pt-[calc(var(--safe-top)+12px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <Header showBack />

      {/* 역명 */}
      <section className="flex justify-center">
        <StationTitle
          line={station.line.id as SubwayLine}
          stationName={station.stationName}
        />
      </section>

      {/* 설명 */}
      <section className="flex flex-col items-center pt-8">
        <div className="flex flex-col w-[360px] rounded-lg p-[15px] bg-white gap-4">
          {/* 호선 칩 */}
          <div className="w-full flex px-20 gap-2 justify-center">
            {station.lines.map((line) => (
              <SubwayLineChip
                key={line.id}
                variant="secondary"
                label={line.name}
              />
            ))}
          </div>

          <div className="rounded-lg px-4 py-5 bg-gray-10">
            <p className="text-body-01 leading-[1.4] tracking-[-0.35px] break-keep">
              {station.description}
            </p>
          </div>
        </div>
      </section>

      {/* 코스 목록 + 카테고리 */}
      <section className="flex flex-col w-[360px] items-center gap-4.5 py-4 pt-6 mx-auto">
        {/* 텍스트 */}
        <div className="flex flex-col self-start">
          <div className="flex flex-col gap-1">
            <span className="flex text-black font-semibold text-subtitle leading-[1.4] tracking-[-0.45px]">
              코스 장소 선택
            </span>
            <span className="flex text-gray-70 text-body-02 leading-[1.4] tracking-[-0.3px]">
              나만의 코스를 만들기 위해 장소를 선택해 주세요! (최소 3개)
            </span>
          </div>
        </div>

        {/* 카테고리 + 코스 목록 */}
        <div className="flex flex-col gap-3 self-start">
          <div className="flex self-start">
            <CategoryTabs
              categories={categoryNames}
              selected={activeCategoryName}
              onSelect={setFilterCategory}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            {places.map((place) => (
              <div
                key={place.placeId}
                className="flex-1"
                onClick={() => handleSelected(place.placeId)}
              >
                <CourseCard
                  key={place.placeId}
                  name={place.placeName}
                  description={place.description}
                  category={activeCategory?.categoryCode ?? "CULTURE"}
                  isActive={selectedIds.includes(place.placeId)}
                  width={360} // width 함께 넘기기
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 버튼 */}
      <section className="flex flex-col px-[15px] justify-center items-center pt-3">
        <CTAButton
          disabled={isDisabled ? true : false}
          variant="primary"
          onClick={() =>
            navigate("/course/verify?from=recommend", {
              state: {
                course: {
                  name: station.defaultCourseName,
                  places: selectedPlaces.map((place) => ({
                    placeId: place.placeId,
                    placeName: place.placeName,
                    description: place.description,
                    categoryCode: activeCategory?.categoryCode ?? "CULTURE",
                    categoryName: activeCategory?.categoryName ?? "문화공간",
                    imageUrl: place.imageUrl,
                    xCoordinate: place.xCoordinate,
                    yCoordinate: place.yCoordinate,
                  })),
                },
                stationId: station.stationId,
                stationName: station.stationName,
                lineId: station.line.id,
              },
            })
          }
        >
          나만의 여행 코스 만들기
        </CTAButton>
      </section>
    </main>
  );
}
