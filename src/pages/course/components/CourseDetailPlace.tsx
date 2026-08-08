import type { CourseDetailPlaceData } from "@/types/courseDetail";

export default function CourseDetailPlace({ place }: { place: CourseDetailPlaceData }) {
  const thumbnail = place.imageUrl ? (
    <img className="course-detail-place__thumbnail" src={place.imageUrl} alt="" />
  ) : (
    <div className="course-detail-place__thumbnail" aria-hidden="true" />
  );
  const content = <div className="course-detail-place__content"><div className="course-detail-place__heading"><strong>{place.name}</strong><img src="/course-detail/next.svg" alt="" /></div><p>{place.description.split("\n").map((line, index) => <span key={`${place.id}-${index}`}>{index > 0 && <br />}{line}</span>)}</p></div>;
  return <article className="course-detail-place">{place.imagePosition === "left" ? <>{thumbnail}{content}</> : <>{content}{thumbnail}</>}</article>;
}
