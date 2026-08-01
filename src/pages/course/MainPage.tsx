import Heart from "@/assets/heart.svg?react";
import SavedCourseCard from "./components/SavedCourseCard";
import { useEffect, useState } from "react";
import CompleteConfirmModal from "./components/CompleteConfirmModal";
import StationCategory from "./components/StationCategory";
import ConfirmModal from "@/components/ConfirmModal";
import BottomNav from "@/components/BottomNav";
import {
  deleteSavedCourses,
  getSavedCourses,
  type Course,
} from "@/api/savedCourse";
import { useInView } from "react-intersection-observer";

export default function MainPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isCoursesLoading, setIsCoursesLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // 무한스크롤
  const [coursesError, setCoursesError] = useState<string | null>(null);

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null); // 여행 완료 모달용 단일 선택
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLine, setSelectedLine] = useState("전체"); // 호선
  const [selectedStation, setSelectedStation] = useState("전체"); // 역
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // 삭제 모드용 다중 선택

  // 최초 로드
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsCoursesLoading(true);
        const data = await getSavedCourses();
        setCourses(data.courses ?? []);
        setNextCursor(data.nextCursor);
        setHasNext(data.hasNext);
      } catch (e) {
        console.error(e);
        setCoursesError("내가 만든 코스 목록을 불러오지 못했습니다.");
      } finally {
        setIsCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const loadMoreCourses = async () => {
    if (!nextCursor) return;

    try {
      setIsLoadingMore(true);
      const data = await getSavedCourses(nextCursor);
      setCourses((prev) => [...prev, ...(data.courses ?? [])]);
      setNextCursor(data.nextCursor);
      setHasNext(data.hasNext);
    } catch (e) {
      console.error(e);
      setCoursesError("코스 목록을 불러오지 못했습니다.");
    } finally {
      setIsCoursesLoading(false);
    }
  };

  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView && hasNext && !isLoadingMore) {
        loadMoreCourses();
      }
    },
  });

  if (isCoursesLoading) return <p>로딩 중...</p>;
  if (coursesError) return <p>{coursesError}</p>;
  if (!courses) return null;

  const handleCompletedClick = (id: number) => {
    setSelectedCourseId(id);
    setIsCompleteModalOpen(true);
  };

  const closeCompleteModal = () => {
    setIsCompleteModalOpen(false);
    setSelectedCourseId(null);
  };

  const handleCourseCompleted = (courseId: number) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.courseId === courseId
          ? { ...course, isCompleted: true }
          : course,
      ),
    );
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedIds([]);
  };

  const filteredCourses = courses.filter((course) => {
    const matchedLine =
      selectedLine === "전체" || course.line.name === selectedLine;
    const matchedStation =
      selectedStation === "전체" || course.stationName === selectedStation;

    return matchedLine && matchedStation;
  });

  const handleSelected = (targetId: number) => {
    setSelectedIds((prev) =>
      prev.includes(targetId)
        ? prev.filter((value) => value !== targetId)
        : [...prev, targetId],
    );
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSavedCourses(selectedIds);
      setCourses((prev) =>
        prev.filter((course) => !selectedIds.includes(course.courseId)),
      );
      setSelectedIds([]);
      setIsDeleteMode(false);
      setIsDeleteModalOpen(false);
    } catch (e) {
      console.error(e);
      setCoursesError("코스 삭제에 실패했습니다.");
    }
  };

  return (
    <main className="flex flex-col h-dvh  bg-gray-10 pt-[calc(var(--safe-top)+12px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Header */}
      <section className="flex justify-center">
        <div className="flex w-[390px] px-[15px] items-center justify-between">
          <span className="text-title-02 font-semibold leading-[1.4] tracking-[-0.45px]">
            내가 만든 코스
          </span>
          {/* 스크랩 페이지 경로 나오면 연결 */}
          <Heart />
        </div>
      </section>

      {/* 여행 확인 모달 */}
      {isCompleteModalOpen && selectedCourseId !== null && (
        <CompleteConfirmModal
          onClose={closeCompleteModal}
          courseId={selectedCourseId}
          onCompleted={handleCourseCompleted}
        />
      )}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && selectedIds.length > 0 && (
        <ConfirmModal
          message="저장한 코스를 삭제하시겠습니까?"
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
            type="button"
            className={`flex text-body-01 leading-[1.4] tracking-[-0.35px] ${isDeleteMode && selectedIds.length > 0 ? "text-primary-60" : "text-gray-70"} pt-2 pb-4 pl-[346px]`}
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
      <section className="flex justify-center">
        <div className="flex flex-col gap-[9px]">
          {filteredCourses.map((course) => (
            <SavedCourseCard
              key={course.courseId}
              id={course.courseId}
              name={course.name}
              line={course.line.name}
              stationName={course.stationName}
              isCompleted={course.isCompleted}
              onCompletedClick={handleCompletedClick}
              isDeleteMode={isDeleteMode}
              isSelect={selectedIds.includes(course.courseId)}
              handleSelected={handleSelected}
            />
          ))}
        </div>
      </section>
      <div ref={ref} className="h-1 w-full"></div>

      <BottomNav mode="course" />
    </main>
  );
}
