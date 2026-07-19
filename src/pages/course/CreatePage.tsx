import Header from "@/components/Header";
import StationTitle from "@/components/StationTitle";
import SubwayLineChip from "@/components/SubwayLineChip";
import CTAButton from "@/components/CTAButton";
import CourseCard from "./components/CourseCard";
import { mockCourses } from "@/mocks/mockCourses";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryTabs from "./components/CategoryTabs";

const CATEGORIES = ["문화 공간", "식당", "카페", "산책 포인트"];

const CATEGORY_KEY_MAP: Record<string, string> = {
  // 매핑
  "문화 공간": "culturalSpace",
  식당: "restaurant",
  카페: "cafe",
  "산책 포인트": "walk",
};

export default function CreatePage() {
  const navigate = useNavigate();
  const [filterCateogry, setFilterCategory] = useState("문화 공간");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelected = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  const filteredCourses = mockCourses.filter((course) => {
    const matchedCategory =
      course.category === CATEGORY_KEY_MAP[filterCateogry];

    return matchedCategory;
  });

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 pt-[calc(var(--safe-top)+12px)]">
      <Header showBack />

      {/* 역명 */}
      <section className="flex justify-center">
        <StationTitle line={6} stationName="보문역" />
      </section>

      {/* 설명 */}
      <section className="flex flex-col items-center pt-8">
        <div className="flex flex-col w-[360px] rounded-lg p-[15px] bg-white gap-4">
          {/* 호선 칩 */}
          <div className="w-full flex px-20 gap-2 justify-center">
            <SubwayLineChip variant="secondary" label="6호선" />
            <SubwayLineChip variant="secondary" label="우이신설선" />
          </div>

          <div className="rounded-lg px-4 py-5 bg-gray-10">
            <p>
              성북천을 따라 천천히 걷고, <br />
              대학가와 오래된 주거 골목 사이의 <br />
              조용한 생활감을 느낄 수 있는 역이에요.
            </p>
          </div>
        </div>
      </section>

      {/* 코스 목록 + 카테고리 */}
      <section className="flex flex-col w-[360px] items-center gap-4.5 py-4 pt-6 mx-auto">
        {/* 텍스트 */}
        <div className="flex flex-col self-start">
          <div className="flex flex-col gap-1">
            <span className="flex text-black font-semibold text-subtitle">
              코스 장소 선택
            </span>
            <span className="flex text-gray-70 text-body-02">
              나만의 코스를 만들기 위해 장소를 선택해 주세요! (최소 3개)
            </span>
          </div>
        </div>

        {/* 카테고리 + 코스 목록 */}
        <div className="flex flex-col gap-3 self-start">
          <div className="flex self-start">
            <CategoryTabs
              categories={CATEGORIES}
              selected={filterCateogry}
              onSelect={setFilterCategory}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="flex-1"
                onClick={() => handleSelected(course.id)}
              >
                <CourseCard
                  name={course.name}
                  description={course.description}
                  category={course.category}
                  isActive={selectedIds.includes(course.id)}
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
          disabled={selectedIds.length >= 3 ? false : true}
          variant="primary"
          onClick={() => navigate("/course/verify")}
        >
          나만의 여행 코스 만들기
        </CTAButton>
      </section>
    </main>
  );
}
