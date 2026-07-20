import MapIcon from "@/assets/map-icon.svg?react";
import Button from "@/components/Button";
import CourseCard from "@/pages/course/components/CourseCard";
import CourseNumber from "@/pages/course/components/CourseNumber";
import Header from "@/components/Header";
import StationTitle from "@/components/StationTitle";
import { mockCourses } from "@/mocks/mockCourses";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";
import MapMarker from "./components/MapMarker";
import { Reorder } from "motion/react";
import NameEditInput from "./components/NameEditInput";
import ConfirmModal from "@/components/ConfirmModal";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("보문역 환승여행 코스");
  const courseListRef = useRef<HTMLUListElement>(null);
  const [courses, setCourses] = useState(mockCourses); // 초기값 : mockCourses
  const [pressedId, setPressedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_API,
  });

  if (loading || error) {
    return (
      <div>{error ? "지도를 불러오지 못했어요." : "지도를 불러오는 중..."}</div>
    );
  }

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const handleConfirm = () => {
    navigate("/");
  };

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 gap-8 pt-[calc(var(--safe-top)+12px)]">
      <Header showBack showClose onCloseClick={toggleModal} />

      {/* 경고 모달 */}
      {isModalOpen && (
        <ConfirmModal
          message={
            "해당 코스는 저장되지 않습니다.\n저장하지 않고 나가시겠습니까?"
          }
          onClose={toggleModal}
          onConfirm={handleConfirm}
        />
      )}

      {/* 역명 */}
      <section className="flex justify-center">
        <StationTitle line={6} stationName="보문역" />
      </section>

      {/* 지도 */}
      <section className="flex justify-center">
        <div className="flex flex-col gap-2.5 w-[360px]">
          <NameEditInput value={courseName} onChange={setCourseName} />

          <div className="flex flex-col border h-[357px] border-gray-40 bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4">
              <p className="text-title-02 font-semibold">내 코스 지도</p>
              <MapIcon className="w-6 h-6 text-gray-70 cursor-pointer" />
            </div>
            <Map
              center={{ lat: 37.585, lng: 127.0192 }}
              level={5}
              style={{ width: "100%", height: "300px" }}
            >
              {courses.map((course, i) => (
                <CustomOverlayMap
                  key={course.id}
                  position={course.position}
                  yAnchor={1}
                >
                  <MapMarker number={i + 1} />
                </CustomOverlayMap>
              ))}
            </Map>
          </div>
        </div>
      </section>

      {/* 코스 순서 */}
      <section className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-1 w-[360px]">
          <p className="text-title-02 font-semibold text-gray-100">
            내 코스 순서
          </p>
          <p className="text-body-02 text-gray-70">
            장소를 길게 누르면 순서를 변경할 수 있어요!
          </p>
        </div>

        {/* 번호 + 카드 하나 */}
        <Reorder.Group
          as="ul"
          ref={courseListRef}
          axis="y"
          values={courses}
          onReorder={setCourses}
          className="flex flex-col gap-[13px] "
        >
          {courses.map((course, index) => (
            <Reorder.Item
              key={course.id}
              value={course}
              dragConstraints={courseListRef}
              dragElastic={0.05}
              className="flex items-center gap-[13px]"
              onPointerDown={() => setPressedId(course.id)}
              onPointerUp={() => setPressedId(null)}
              onPointerLeave={() => setPressedId(null)}
            >
              <CourseNumber number={index + 1} />
              <CourseCard
                name={course.name}
                description={course.description}
                category={course.category}
                isActive={pressedId === course.id}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </section>

      {/* 하단 버튼 */}
      <section className="flex justify-center">
        <div className="flex w-[360px] justify-between">
          <Button
            direction="left" // 왼쪽 화살표가 있는 버튼
            onClick={() => navigate("/draw/loading")}
          >
            다시 뽑기
          </Button>
          <Button
            direction="right" // 오른쪽 화살표가 있는 버튼
            onClick={() => navigate("/course/saved")}
          >
            코스 저장
          </Button>
        </div>
      </section>
    </main>
  );
}
