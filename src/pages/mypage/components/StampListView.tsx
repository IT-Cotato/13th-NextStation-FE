import StampEmpty from "@/assets/stamp-empty.svg?react";
import { STATION_STAMP_MAP } from "@/constants/stationStampMap";
import {
  type Stamp,
  type StampDetail,
  getStamps,
  getStampsDetail,
} from "@/api/stamp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import type { PanInfo } from "motion/react";
import StampDetailModal from "./StampDetailModal";
import { showToast } from "@/pages/course/components/ShowToast";
import MyPageModal from "./MyPageModal";

const SWIPE_THRESHOLD = 50;

const STAMPS_PER_PAGE = 12;
const PAGE_WIDTH = 300; // 카드 내부 컨텐츠 너비

export default function StampListView() {
  const navigate = useNavigate();
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [isStampsLoading, setIsStampsLoading] = useState(true);
  const [stampsError, setStampsError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(stamps.length / STAMPS_PER_PAGE); // 전체 페이지 수
  const isStampEmpty = stamps.length < 1;
  const [isStampDetailModalOpen, setIsStampDetailModalOpen] = useState(false);
  const [isJournalReminderModalOpen, setIsJournalReminderModalOpen] =
    useState(false);
  const [selectedStampDetail, setSelectedStampDetail] =
    useState<StampDetail | null>(null);
  const [isStampDetailLoading, setIsStampDetailLoading] = useState(false);

  useEffect(() => {
    const fetchStamps = async () => {
      try {
        setIsStampsLoading(true);
        const data = await getStamps();
        setStamps(data.stamps);
      } catch (e) {
        console.error(e);
        setStampsError("스탬프 목록을 불러오지 못했습니다.");
      } finally {
        setIsStampsLoading(false);
      }
    };

    fetchStamps();
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && currentPage < pageCount) {
      setCurrentPage((prev) => prev + 1);
    } else if (info.offset.x > SWIPE_THRESHOLD && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleStampClick = async (stamp: Stamp) => {
    if (isStampDetailLoading) return;

    try {
      setIsStampDetailLoading(true);
      const detail = await getStampsDetail(stamp.stationId);
      setSelectedStampDetail(detail);
      setIsStampDetailModalOpen(true);
    } catch (e) {
      console.error(e);
      showToast({ message: "스탬프 상세 정보를 불러오지 못했습니다." });
    } finally {
      setIsStampDetailLoading(false);
    }
  };

  const closeStampDetailModal = () => {
    setIsStampDetailModalOpen(false);
    setSelectedStampDetail(null);
  };

  const openJournalReminderModal = () => {
    setIsJournalReminderModalOpen(true);
  };

  const handleGoToUnwrittenJournal = () => {
    setIsJournalReminderModalOpen(false);
    closeStampDetailModal();
    navigate("/mypage/journal/unwritten");
  };

  const handleSkipJournalReminder = () => {
    setIsJournalReminderModalOpen(false);
    closeStampDetailModal();
    navigate("/mypage");
  };

  if (isStampsLoading) return <p>로딩 중...</p>;
  if (stampsError) return <p>{stampsError}</p>;
  if (!stamps) return null;

  if (isStampEmpty === true) {
    // 스탬프가 없을 때
    return (
      <div className="flex flex-col items-center justify-center w-[348px] h-[484px] bg-white gap-4 rounded-[36px]">
        <StampEmpty />
        <p className="text-center text-gray-80 text-body-01 leading-[1.4] tracking-[-0.35px]">
          아직 스탬프가 없어요!
          <br />
          환승여행을 떠나 첫 번째 스탬프를 모아보세요.
        </p>
        <button
          className="flex justify-center items-center rounded-lg px-3 py-2 bg-secondary-10 text-body-01 leading-[1.4] tracking-[-0.35px] text-primary-60"
          onClick={() => navigate("/explore")}
        >
          여행 시작하기
        </button>
      </div>
    );
  }

  return (
    // 스탬프가 있을 때
    <div className="flex flex-col items-center gap-4 px-6 pt-6 pb-3 w-[348px] h-[484px] bg-white rounded-[36px]">
      {isStampDetailModalOpen && selectedStampDetail && (
        <StampDetailModal
          onClose={closeStampDetailModal}
          stamp={selectedStampDetail}
          onWriteJournal={openJournalReminderModal}
        />
      )}

      {isJournalReminderModalOpen && selectedStampDetail && (
        <MyPageModal
          content={`${selectedStampDetail.stationName} 여행일지를\n남겨볼까요?`}
          subtitle={`아직 ${selectedStampDetail.stationName} 여행일지를 작성하지 않았어요.`}
          onConfirm={handleGoToUnwrittenJournal}
          confirmBtnText="작성하러 가기"
          onClose={handleSkipJournalReminder}
          closeBtnText="다음에"
        />
      )}

      <div className="overflow-hidden" style={{ width: PAGE_WIDTH }}>
        <motion.div
          className="flex touch-pan-y"
          drag="x"
          dragConstraints={{ left: -(pageCount - 1) * PAGE_WIDTH, right: 0 }}
          dragElastic={0.2}
          animate={{ x: -(currentPage - 1) * PAGE_WIDTH }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onDragEnd={handleDragEnd}
        >
          {Array.from({ length: pageCount }, (_, pageIndex) => (
            <div
              key={pageIndex}
              className="grid grid-cols-3 grid-rows-4 gap-3 items-center justify-center shrink-0"
              style={{ width: PAGE_WIDTH }}
            >
              {stamps
                .slice(
                  pageIndex * STAMPS_PER_PAGE,
                  (pageIndex + 1) * STAMPS_PER_PAGE,
                )
                .map((stamp) => {
                  const StampIcon =
                    STATION_STAMP_MAP[stamp.stationName] ?? null;
                  return StampIcon ? (
                    <StampIcon
                      key={stamp.stationId}
                      className="size-[92px]"
                      onClick={() => void handleStampClick(stamp)}
                    />
                  ) : null;
                })}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex items-center p-1 gap-[7px]">
        <span className="text-body-01 font-semibold text-gray-70">
          {String(currentPage).padStart(2, "0")}
        </span>
        <span className="text-body-01 font-semibold text-gray-50">/</span>
        <span className="text-body-01 font-semibold text-gray-50">
          {String(pageCount).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
