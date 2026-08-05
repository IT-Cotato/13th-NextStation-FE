import ExploreCourseItem from "./components/ExploreCourseItem";
import useSafeBack from "./hooks/useSafeBack";
import Header from "@/components/Header";

export default function PopularCoursesPage() {
  const goBack = useSafeBack();

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-gray-10 pb-4 text-gray-100">
      <div className="px-[15px] pb-2.5 pt-[57px] [&_h1]:m-0 [&_h1]:text-title-01 [&_h1]:font-semibold [&_h1]:leading-[1.4] [&_h1]:tracking-[-0.5px] [&_p]:mt-1 [&_p]:text-body-02 [&_p]:leading-[1.4] [&_p]:tracking-[-0.3px] [&_p]:text-gray-70">
        <div className="mb-4 h-6 [&>header]:h-6 [&>header]:grid-cols-[24px_1fr_24px] [&>header]:p-0"><Header showBack onBackClick={goBack} /></div>
        <div>
          <h1>사람들이 많이 찾는 코스</h1>
          <p>사람들이 나중에 가려고 가장 많이 담아둔 코스예요</p>
        </div>
      </div>

      <section className="flex flex-col gap-3 px-[15px] py-4 [&>article]:min-h-[120px]" aria-label="인기 코스 순위">
        {Array.from({ length: 6 }, (_, index) => (
          <ExploreCourseItem
            key={index}
            rank={index + 1}
            filledImage
          />
        ))}
      </section>
    </main>
  );
}
