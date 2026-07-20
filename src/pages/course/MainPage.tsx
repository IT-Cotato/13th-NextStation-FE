import Heart from "@/assets/heart.svg?react";
import SavedCourseCard from "./components/SavedCourseCard";
import { useState } from "react";
import CompleteConfirmModal from "./components/CompleteConfirmModal";
import StationCategory from "./components/StationCategory";
import { mockSavedCourses } from "@/mocks/mockSavedCourses";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

export default function MainPage() {
  const [savedCourses, setSavedCourses] = useState(mockSavedCourses);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLine, setSelectedLine] = useState("전체"); // 호선
  const [selectedStation, setSelectedStation] = useState("전체"); // 역
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleCompleteModal = () => setIsCompleteModalOpen((prev) => !prev);

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedIds([]);
  };

  const filteredCourses = savedCourses.filter((course) => {
    const matchedLine = selectedLine === "전체" || course.line === selectedLine;
    const matchedStation =
      selectedStation === "전체" || course.station === selectedStation;

    return matchedLine && matchedStation;
  });

  const handleConfirmDelete = () => {
    setSavedCourses((prev) =>
      prev.filter((savedCourse) => !selectedIds.includes(savedCourse.id)),
    );
    setSelectedIds([]);
    setIsDeleteMode(false);
    setIsDeleteModalOpen(false);
  };

  const handleSelected = (targetId: number) => {
    setSelectedIds((prev) =>
      prev.includes(targetId)
        ? prev.filter((value) => value !== targetId)
        : [...prev, targetId],
    );
  };

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 pt-[calc(var(--safe-top)+12px)]">
      {/* Header */}
      <section className="flex justify-center">
        <div className="flex w-[390px] px-[15px] items-center justify-between">
          <span className="text-title-02 font-semibold">내가 만든 코스</span>
          {/* 둘러보기 경로 나오면 연결 */}
          <Heart />
        </div>
      </section>

      {/* 여행 확인 모달 */}
      {isCompleteModalOpen && (
        <CompleteConfirmModal onClose={toggleCompleteModal} />
      )}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && selectedIds.length > 0 && (
        <DeleteConfirmModal
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* 카테고리 */}
      <section className="flex justify-center">
        <div className="flex w-[390px]">
          <StationCategory
            selectedLine={selectedLine}
            onSelectLine={setSelectedLine}
            selectedStation={selectedStation}
            onSelectStation={setSelectedStation}
          />
        </div>
      </section>

      {/* 삭제 */}
      <section className="flex justify-center">
        <div className="flex w-[390px]">
          <button
            className={`flex text-body-01 ${isDeleteMode && selectedIds.length > 0 ? "text-primary-60" : "text-gray-70"} pt-2 pb-4 pl-[346px]`}
            onClick={() =>
              isDeleteMode
                ? selectedIds.length > 0
                  ? setIsDeleteModalOpen(true)
                  : setIsDeleteMode(false)
                : setIsDeleteMode(true)
            }
          >
            삭제
          </button>
        </div>
      </section>

      {/* 저장된 코스 */}
      {/* 백엔드 연동 후 mockSavedCourses 대신 API 응답으로 교체 */}
      <section className="flex justify-center">
        <div className="flex flex-col gap-[9px]">
          {filteredCourses.map((course) => (
            <SavedCourseCard
              key={course.id}
              id={course.id}
              name={course.name}
              line={course.line}
              stationName={course.station}
              isCourseCompleted={course.isCompleted}
              onCompletedClick={toggleCompleteModal}
              isDeleteMode={isDeleteMode}
              isSelect={selectedIds.includes(course.id)}
              handleSelected={handleSelected}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
