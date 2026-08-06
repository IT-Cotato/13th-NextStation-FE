import { useEffect, useState } from "react";
import {
  getPopularExploreCourses,
  type ExploreCourse,
} from "@/api/explore";
import Header from "@/components/Header";
import type { SubwayLine } from "@/types/subway";
import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";

export default function PopularCoursesPage() {
  const goBack = useSafeBack();
  const [courses, setCourses] = useState<ExploreCourse[]>([]);

  useEffect(() => {
    void getPopularExploreCourses()
      .then((data) => setCourses(data.courses))
      .catch(() => setCourses([]));
  }, []);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-gray-10 pb-4 text-gray-100">
      <div className="px-[15px] pb-2.5 pt-[57px]">
        <div className="mb-4 h-6">
          <Header
            className="h-6 grid-cols-[24px_1fr_24px] p-0"
            showBack
            onBackClick={goBack}
          />
        </div>
        <h1 className="m-0 text-title-01 font-semibold">
          사람들이 많이 찾는 코스
        </h1>
        <p className="mt-1 text-body-02 text-gray-70">
          사람들이 나중에 가려고 가장 많이 담아둔 코스예요
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
          />
        ))}
      </section>
    </main>
  );
}
