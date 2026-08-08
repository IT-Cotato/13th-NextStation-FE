import Header from "@/components/Header";
import UnwrittenJournalCard from "./components/UnwrittenJournalCard";
import {
  getJournalWriteInfo,
  getUnwrittenJournals,
  type Course,
  type UnwrittenJournals,
} from "@/api/journal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogDraft } from "../course/contexts/LogDraftContext";
import { formatAcquiredAtToDisplayDate } from "@/utils/logDate";
import { showToast } from "../course/components/ShowToast";

export default function UnwrittenJournalListPage() {
  const navigate = useNavigate();
  const { draft, initializeFromStamp } = useLogDraft();
  const [initializingId, setInitializingId] = useState<number | null>(null);

  const [unwrittenJournal, setUnwrittenJournal] =
    useState<UnwrittenJournals | null>(null);

  useEffect(() => {
    const fetchUnwrittenJournals = async () => {
      try {
        const data = await getUnwrittenJournals();
        setUnwrittenJournal(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUnwrittenJournals();
  }, []);

  const initializeJournalWriteInfo = async (course: Course) => {
    setInitializingId(course.memberStampId);

    try {
      const writeInfo = await getJournalWriteInfo(course.memberStampId);
      const placeReviews = writeInfo.places
        .slice()
        .sort((a, b) => a.orderNum - b.orderNum)
        .map((place) => ({
          id: place.placeId,
          label: place.placeName,
          review: "",
          photo: null,
        }));

      initializeFromStamp({
        memberStampId: course.memberStampId,
        stationId: 0,
        stationName: writeInfo.stationName,
        acquiredDate: formatAcquiredAtToDisplayDate(course.acquiredAt),
        logName: writeInfo.courseName,
        tags: writeInfo.tags,
        placeReviews,
      });

      return true;
    } catch (error) {
      showToast({
        message:
          error instanceof Error
            ? error.message
            : "여행일지 초기 정보를 불러오지 못했습니다.",
      });
      return false;
    } finally {
      setInitializingId(null);
    }
  };

  const handleSelectCourse = async (course: Course) => {
    const isInitialized =
      (draft.memberStampId === course.memberStampId &&
        draft.placeReviews.length > 0) ||
      (await initializeJournalWriteInfo(course));

    if (!isInitialized) return;

    navigate(`/course/${course.memberStampId}/log/info`);
  };

  return (
    <main className="flex flex-col h-dvh  bg-gray-10 pt-[calc(var(--safe-top)+12px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-2.5">
      <Header showBack />

      {/* text */}
      <section className="flex justify-center pb-[10px]">
        <div className="flex flex-col gap-1 w-[360px]">
          <span className="text-title-01 font-semibold leading-[1.4] tracking-[-0.5px] text-gray-100">
            여행일지 작성하기
          </span>
          <p className="text-body-02 leading-[1.4] tracking-[-0.3px] text-gray-70">
            여행을 선택해 여행일지를 작성해 보세요.
          </p>
        </div>
      </section>

      {/* list */}
      <section className="flex justify-center">
        <div className="flex flex-col gap-[9px] py-4">
          {unwrittenJournal?.courses.map((course) => (
            <UnwrittenJournalCard
              key={course.memberStampId}
              course={course}
              disabled={initializingId === course.memberStampId}
              onClick={() => void handleSelectCourse(course)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
