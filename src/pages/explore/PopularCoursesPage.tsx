import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularExploreCourses, type ExploreCourse } from "@/api/explore";
import Header from "@/components/Header";
import type { SubwayLine } from "@/types/subway";
import ExploreCourseItem from "./components/ExploreCourseItem";

export default function PopularCoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<ExploreCourse[]>([]);

  useEffect(() => {
    void getPopularExploreCourses()
      .then((data) => setCourses(data.courses))
      .catch(() => setCourses([]));
  }, []);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-gray-10 pb-4 text-gray-100">
      <div className="px-[3px] pt-[45px]">
        <Header showBack />
      </div>
      <div className="px-[15px] pb-2.5">
        <h1 className="text-title-01 font-semibold tracking-[-0.025em]">
          사람들이 많이 찾는 코스
        </h1>
        <p className="mt-1 text-body-02 tracking-[-0.025em] text-gray-70">
          사람들이 저장도 많이 하고 가장 많이 돌아본 코스예요
        </p>
      </div>

      <section className="flex flex-col gap-3 px-[15px] py-4">
        {courses.map((course, index) => (
          <ExploreCourseItem
            key={course.courseId}
            courseId={course.courseId}
            rank={index + 1}
            line={course.line?.id as SubwayLine | undefined}
            stationName={course.stationName}
            name={course.name}
            tags={course.tags}
            likeCount={course.likeCount}
            isLiked={course.isLiked}
            imageUrl={course.imageUrl}
            onClick={() => navigate(`/course/logs/${course.journalId}`)}
          />
        ))}
      </section>
    </main>
  );
}
