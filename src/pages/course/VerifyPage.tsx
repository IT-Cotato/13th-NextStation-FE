import MapIcon from "@/assets/map-icon.svg?react";
import CourseCard from "@/pages/course/components/CourseCard";
import CourseNumber from "@/pages/course/components/CourseNumber";
import Header from "@/components/Header";
import StationTitle from "@/components/StationTitle";
import type { SubwayLine } from "@/types/subway";
import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";
import MapMarker from "./components/MapMarker";
import { Reorder } from "motion/react";
import NameEditInput from "./components/NameEditInput";
import ConfirmModal from "@/components/ConfirmModal";
import {
  getCourseDetail,
  patchCourseDetail,
  type Place,
} from "@/api/courseDetail";
import { createCourse } from "@/api/courseRecommendation";
import type { RandomCourseResponse } from "@/api/random";
import Button from "@/components/Button";
import CTAButton from "@/components/CTAButton";
import share from "@/utils/share";
import { showToast } from "./components/ShowToast";

interface DraftCourseState {
  course: RandomCourseResponse;
  stationId: number;
  stationName: string;
  lineId: number;
}

interface VerifyCourse {
  courseId: number | null; // null --> 아직 저장되지 않은 draft (랜덤 뽑기 결과)
  stationId: number;
  stationName: string;
  lineId: number;
}

function draftToPlaces(draft: DraftCourseState): Place[] {
  return draft.course.places.map((place, index) => ({
    placeId: place.placeId,
    placeName: place.placeName,
    description: place.description,
    imageUrl: place.imageUrl,
    xCoordinate: place.xCoordinate,
    yCoordinate: place.yCoordinate,
    orderNum: index + 1,
  }));
}

export default function VerifyPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const draft = location.state as DraftCourseState | null; // Result Page에서 넘겨주는 랜덤 뽑기 결과
  const [course, setCourse] = useState<VerifyCourse | null>(() =>
    !courseId && draft
      ? {
          // 랜덤 뽑기 결과
          courseId: null,
          stationId: draft.stationId,
          stationName: draft.stationName,
          lineId: draft.lineId,
        }
      : null,
  );
  const [places, setPlaces] = useState<Place[]>(() =>
    !courseId && draft ? draftToPlaces(draft) : [],
  );
  const [isPlacesLoading, setIsPlacesLoading] = useState(!!courseId);
  const [placesError, setPlacesError] = useState<string | null>(() =>
    !courseId && !draft ? "코스 정보를 찾을 수 없습니다." : null,
  );
  const [courseName, setCourseName] = useState(() =>
    !courseId && draft ? draft.course.name : "",
  );
  const courseListRef = useRef<HTMLUListElement>(null);
  const [pressedId, setPressedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // 순서/이름을 바꾸고 아직 저장 안 한 상태인지
  const [searchParams] = useSearchParams(); // 어떤 페이지로부터 진입했는지를 알기 위함
  const from = searchParams.get("from"); // draw (랜덤 뽑기) | recommend (맞춤 추천)

  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_API,
  });

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseDetail = async () => {
      try {
        setIsPlacesLoading(true);
        const data = await getCourseDetail(Number(courseId));
        setCourse({
          courseId: data.courseId,
          stationId: data.stationId,
          stationName: data.stationName,
          lineId: data.lineId,
        });
        setCourseName(data.courseName);
        setPlaces(data.places);
      } catch (e) {
        console.error(e);
        setPlacesError("코스 상세 정보를 불러오지 못했습니다.");
      } finally {
        setIsPlacesLoading(false);
      }
    };
    fetchCourseDetail();
  }, [courseId]);

  const handleSave = async (): Promise<number | null> => {
    if (!course) return null;

    try {
      if (course.courseId) {
        const updated = await patchCourseDetail(course.courseId, {
          name: courseName,
          placeIds: places.map((place) => place.placeId),
        });
        setCourseName(updated.name);
        setHasUnsavedChanges(false);
        return course.courseId;
      }

      const created = await createCourse(
        course.stationId,
        courseName,
        places.map((place) => place.placeId),
      );
      setCourse((prev) =>
        prev ? { ...prev, courseId: created.courseId } : prev,
      );
      setHasUnsavedChanges(false);
      return created.courseId;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndGo = async () => {
    if (isSaving) return;

    setIsSaving(true);
    const savedCourseId = await handleSave();
    setIsSaving(false);

    if (savedCourseId === null) {
      showToast({ message: "코스 저장에 실패했습니다." });
      return;
    }

    navigate("/course/saved", {
      state: { courseName, courseId: savedCourseId },
    });
  };

  const handleSaveOnly = async () => {
    if (isSaving) return;

    setIsSaving(true);
    const savedCourseId = await handleSave();
    setIsSaving(false);

    if (savedCourseId === null) {
      showToast({ message: "코스 저장에 실패했습니다." });
    }
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const handleConfirm = () => {
    navigate("/");
  };

  if (loading || error) {
    return (
      <div>{error ? "지도를 불러오지 못했어요." : "지도를 불러오는 중..."}</div>
    );
  }

  if (isPlacesLoading) return <p>로딩 중...</p>;
  if (placesError) return <p>{placesError}</p>;
  if (!course) return null;

  const handleShareClick = async () => {
    await share({
      title: "환승여행",
      text: `${courseName} 코스를 확인해보세요!`,
      url: `https://next-station-git-develop-canofmatos-projects.vercel.app/course/${course.courseId}/verify`,
    });
  };

  const handleCloseClick = () => {
    if (course.courseId !== null && !hasUnsavedChanges) {
      navigate("/");
      return;
    }
    toggleModal();
  };

  const handleCourseNameChange = (value: string) => {
    setCourseName(value);
    setHasUnsavedChanges(true);
  };

  const handleReorder = (newPlaces: Place[]) => {
    setPlaces(newPlaces);
    setHasUnsavedChanges(true);
  };

  return (
    <main className="flex flex-col h-dvh  bg-gray-10 gap-8 pt-[calc(var(--safe-top)+12px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <Header showBack showClose onCloseClick={handleCloseClick} />

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
        <StationTitle
          line={course.lineId as SubwayLine}
          stationName={course.stationName}
        />
      </section>

      {/* 지도 */}
      <section className="flex justify-center">
        <div className="flex flex-col gap-2.5 w-[360px]">
          <NameEditInput value={courseName} onChange={handleCourseNameChange} />

          <div className="flex flex-col border h-[357px] border-gray-40 bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4">
              <p className="text-title-02 font-semibold leading-[1.4] tracking-[-0.45px]">
                내 코스 지도
              </p>
              <MapIcon className="w-6 h-6 text-gray-70 cursor-pointer" />
            </div>
            <Map
              center={
                places[0]
                  ? { lat: places[0].yCoordinate, lng: places[0].xCoordinate }
                  : { lat: 37.5665, lng: 126.978 }
              }
              level={6}
              style={{ width: "100%", height: "300px" }}
            >
              {places.map((place, i) => (
                <CustomOverlayMap
                  key={place.placeId}
                  position={{ lat: place.yCoordinate, lng: place.xCoordinate }}
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
          <p className="text-title-02 font-semibold text-gray-100 leading-[1.4] tracking-[-0.45px]">
            내 코스 순서
          </p>
          <p className="text-body-02 text-gray-70 leading-[1.4] tracking-[-0.3px]">
            장소를 길게 누르면 순서를 변경할 수 있어요!
          </p>
        </div>

        {/* 번호 + 카드 하나 */}
        <Reorder.Group
          as="ul"
          ref={courseListRef}
          axis="y"
          values={places}
          onReorder={handleReorder}
          className="flex flex-col gap-[13px] "
        >
          {places.map((place, index) => (
            <Reorder.Item
              key={place.placeId}
              value={place}
              dragConstraints={courseListRef}
              dragElastic={0.05}
              className="flex items-center gap-[13px]"
              onPointerDown={() => setPressedId(place.placeId)}
              onPointerUp={() => setPressedId(null)}
              onPointerLeave={() => setPressedId(null)}
            >
              <CourseNumber number={index + 1} />
              <CourseCard
                name={place.placeName}
                description={place.description}
                category="" // 코스 상세 조회 응답에 카테고리가 없어 기본(도보) 아이콘으로 표시됨
                isActive={pressedId === place.placeId}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </section>

      {/* 하단 버튼 */}
      <section className="flex justify-center">
        {from === "draw" ? ( // 랜덤 뽑기로부터 진입
          <div className="flex w-[360px] justify-between">
            <Button direction="left" onClick={() => navigate("/draw/loading")}>
              다시 뽑기
            </Button>
            <Button
              direction="right"
              disabled={isSaving}
              onClick={handleSaveAndGo}
            >
              저장하기
            </Button>
          </div>
        ) : from === "recommend" ? ( // 맞춤 추천으로부터 진입
          <div className="flex w-[360px]">
            <CTAButton disabled={isSaving} onClick={handleSaveAndGo}>
              코스 저장하기
            </CTAButton>
          </div>
        ) : (
          // 내가 만든 코스로부터 진입
          <div className="flex w-[360px] justify-between">
            <Button direction="left" mode="share" onClick={handleShareClick}>
              공유하기
            </Button>
            <Button
              direction="right"
              disabled={isSaving}
              onClick={handleSaveOnly}
            >
              저장하기
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
