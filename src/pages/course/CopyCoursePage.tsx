import MapIcon from "@/assets/map-icon.svg?react";
import { getCourseDetail, patchCourseDetail, type Place } from "@/api/courseDetail";
import CTAButton from "@/components/CTAButton";
import Header from "@/components/Header";
import StationTitle from "@/components/StationTitle";
import type { SubwayLine } from "@/types/subway";
import { Reorder } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CourseCard from "./components/CourseCard";
import CourseNumber from "./components/CourseNumber";
import MapMarker from "./components/MapMarker";
import NameEditInput from "./components/NameEditInput";

interface CopiedCourse {
  courseId: number;
  stationName: string;
  lineId: number;
}

interface CopyCourseRouteState {
  courseName: string;
  stationName: string;
  lineId: number;
  places: Place[];
}

const isSubwayLine = (value: number): value is SubwayLine =>
  Number.isInteger(value) && value >= 1 && value <= 9;

export default function CopyCoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state as CopyCourseRouteState | null;
  const listRef = useRef<HTMLUListElement>(null);
  const parsedCourseId = Number(courseId);
  const hasValidCourseId = Number.isSafeInteger(parsedCourseId) && parsedCourseId > 0;
  const previewCourseId = hasValidCourseId ? parsedCourseId : 0;
  const [course, setCourse] = useState<CopiedCourse>(() => ({
    courseId: previewCourseId,
    stationName: routeState?.stationName ?? "",
    lineId: routeState?.lineId ?? 0,
  }));
  const [courseName, setCourseName] = useState(routeState?.courseName ?? "");
  const [places, setPlaces] = useState<Place[]>(routeState?.places ?? []);
  const [pressedId, setPressedId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reorderMessage, setReorderMessage] = useState("");
  const [mapLoading, mapError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_API,
  });

  useEffect(() => {
    const id = Number(courseId);
    if (!Number.isSafeInteger(id) || id <= 0) return;
    let isActive = true;

    getCourseDetail(id)
      .then((data) => {
        if (!isActive) return;
        if (!isSubwayLine(data.lineId)) {
          throw new Error("지원하지 않는 지하철 노선입니다.");
        }
        setCourse({
          courseId: data.courseId,
          stationName: data.stationName,
          lineId: data.lineId,
        });
        setCourseName(data.courseName);
        setPlaces(data.places);
      })
      .catch((error) => {
        if (isActive) {
          setErrorMessage(error instanceof Error ? error.message : "코스 정보를 불러오지 못했습니다.");
        }
      });

    return () => {
      isActive = false;
    };
  }, [courseId]);

  const handleSave = async () => {
    if (!course || isSaving) return;

    try {
      setIsSaving(true);
      setErrorMessage(null);
      await patchCourseDetail(course.courseId, {
        name: courseName.trim(),
        placeIds: places.map((place) => place.placeId),
      });
      navigate("/course/saved", {
        state: { courseName, courseId: course.courseId },
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "코스를 저장하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const movePlace = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= places.length) return;
    const nextPlaces = [...places];
    const [movedPlace] = nextPlaces.splice(index, 1);
    nextPlaces.splice(targetIndex, 0, movedPlace);
    setPlaces(nextPlaces);
    setReorderMessage(`${movedPlace.placeName}이(가) ${targetIndex + 1}번째로 이동했습니다.`);
  };

  const subwayLine = isSubwayLine(course.lineId) ? course.lineId : null;

  return (
    <main className="flex h-dvh flex-col gap-8 overflow-y-auto bg-gray-10 pt-[calc(var(--safe-top)+12px)] pb-[134px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Header showBack showClose onCloseClick={() => navigate("/")} />

      {subwayLine && course.stationName && (
        <section className="flex justify-center">
          <StationTitle line={subwayLine} stationName={course.stationName} />
        </section>
      )}

      <section className="flex justify-center">
        <div className="flex w-[calc(100%-30px)] max-w-[360px] flex-col gap-2.5">
          <NameEditInput value={courseName} onChange={setCourseName} disabled={isSaving} />

          <div className="flex h-[357px] flex-col overflow-hidden rounded-lg border border-gray-40 bg-white">
            <div className="flex items-center justify-between p-4">
              <p className="text-title-02 font-semibold leading-[1.4] tracking-[-0.45px]">내 코스 지도</p>
              <MapIcon className="h-6 w-6 text-gray-70" />
            </div>
            {mapLoading ? (
              <div className="flex h-[300px] items-center justify-center bg-gray-20 text-body-02 text-gray-70" role="status">지도를 불러오는 중입니다.</div>
            ) : mapError ? (
              <div className="flex h-[300px] items-center justify-center bg-gray-20 text-body-02 text-gray-70" role="alert">지도를 불러오지 못했습니다.</div>
            ) : (
              <Map
                center={places[0] ? { lat: places[0].yCoordinate, lng: places[0].xCoordinate } : { lat: 37.5665, lng: 126.978 }}
                level={6}
                style={{ width: "100%", height: "300px" }}
              >
                {places.map((place, index) => (
                  <CustomOverlayMap
                    key={place.placeId}
                    position={{ lat: place.yCoordinate, lng: place.xCoordinate }}
                    yAnchor={1}
                  >
                    <MapMarker number={index + 1} />
                  </CustomOverlayMap>
                ))}
              </Map>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-4">
        <div className="flex w-[calc(100%-30px)] max-w-[360px] flex-col gap-1">
          <p className="text-title-02 font-semibold text-gray-100 leading-[1.4] tracking-[-0.45px]">내 코스 순서</p>
          <p className="text-body-02 text-gray-70 leading-[1.4] tracking-[-0.3px]">장소를 길게 누르면 순서를 변경할 수 있어요!</p>
        </div>

        <Reorder.Group
          as="ul"
          ref={listRef}
          axis="y"
          values={places}
          onReorder={setPlaces}
          className="flex w-[calc(100%-30px)] max-w-[360px] flex-col gap-[13px]"
        >
          {places.map((place, index) => (
            <Reorder.Item
              key={place.placeId}
              value={place}
              dragConstraints={listRef}
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
                category=""
                isActive={pressedId === place.placeId}
                width="calc(100% - 41px)"
              />
              <span className="sr-only">
                <button type="button" onClick={() => movePlace(index, -1)} disabled={index === 0}>
                  {place.placeName} 위로 이동
                </button>
                <button type="button" onClick={() => movePlace(index, 1)} disabled={index === places.length - 1}>
                  {place.placeName} 아래로 이동
                </button>
              </span>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </section>

      <p className="sr-only" aria-live="polite">{reorderMessage}</p>

      {(errorMessage || !hasValidCourseId) && (
        <p role="alert" className="px-[15px] text-center text-body-02 text-primary-60">
          {errorMessage ?? "올바르지 않은 코스 주소입니다."}
        </p>
      )}

      <section className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-[390px] -translate-x-1/2 bg-gray-10 px-[15px] pt-[10px] pb-[64px]">
        <CTAButton disabled={isSaving || course.courseId <= 0 || places.length === 0 || !courseName.trim()} onClick={handleSave}>
          {isSaving ? "저장 중..." : "코스 저장하기"}
        </CTAButton>
      </section>
    </main>
  );
}
