import Setting from "@/assets/setting.svg?react";
import ProfileDefault from "@/assets/profile-default.svg?react";
import Edit from "@/assets/edit-profile.svg?react";
import JournalAdd from "@/assets/journal-add.svg?react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import StampListView from "./components/StampListView";
import JournalPreviewCard from "./components/JournalPreviewCard";
import { useNavigate } from "react-router-dom";
import {
  clearCachedMyProfile,
  deleteMyProfile,
  getMyProfile,
  type MemberProfile,
} from "@/api/member";
import { getJournals, type Journal } from "@/api/journal";
import SettingsDropdown from "./components/SettingsDropdown";
import ConfirmModal from "@/components/ConfirmModal";
import { useInView } from "react-intersection-observer";
import MyPageModal from "./components/MyPageModal";
import BottomNav from "@/components/BottomNav";
import { clearAccessToken, logout } from "@/api/auth";

export default function MyPage() {
  const navigate = useNavigate();
  const [myProfile, setMyProfile] = useState<MemberProfile | null>(null);
  const [isMyProfileLoading, setIsMyProfileLoading] = useState(true);
  const [myProfileError, setMyProfileError] = useState<string | null>(null);
  const [isStampMode, setIsStampMode] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isJournalsLoading, setIsJournalsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [journalsError, setJournalsError] = useState<string | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isCreateJournalModalOpen, setIsCreateJournalModalOpen] =
    useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    } finally {
      clearCachedMyProfile();
      clearAccessToken();
      navigate("/");
    }
  };
  const handleWithdrawal = async () => {
    try {
      await deleteMyProfile();
    } catch (e) {
      console.error(e);
    } finally {
      clearCachedMyProfile();
      clearAccessToken();
      navigate("/");
    }
  };

  const handleCreateJournal = () => {
    setIsCreateJournalModalOpen(true);
  };

  const MENU_SECTIONS = [
    {
      id: "account",
      title: "계정 관리",
      items: [
        { label: "계정 정보" },
        {
          label: "로그아웃",
          onClick: () => setIsLogoutModalOpen(true),
        },
        {
          label: "회원 탈퇴",
          onClick: () => setIsWithdrawalModalOpen(true),
        },
      ],
    },
    {
      id: "about",
      title: "about",
      items: [
        { label: "이용약관" },
        { label: "개인정보처리방침" },
        { label: "오픈소스처리방침" },
      ],
    },
  ];

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        setIsMyProfileLoading(true);
        const data = await getMyProfile();
        setMyProfile(data);
      } catch (e) {
        console.error(e);
        setMyProfileError("내 정보를 불러오지 못했습니다.");
      } finally {
        setIsMyProfileLoading(false);
      }
    };

    fetchMyProfile();
  }, []);

  useEffect(() => {
    const fetchMyJournals = async () => {
      try {
        setIsJournalsLoading(true);
        const data = await getJournals();

        setJournals(data.journals);
        setNextCursor(data.nextCursor);
        setHasNext(data.hasNext);
      } catch (e) {
        console.error(e);
        setJournalsError("여행 일지 목록을 불러오지 못했습니다.");
      } finally {
        setIsJournalsLoading(false);
      }
    };
    fetchMyJournals();
  }, []);

  // 스크롤로 다음 페이지 불러오기
  const loadMoreJournals = async () => {
    if (!nextCursor) return;

    try {
      setIsLoadingMore(true);
      const data = await getJournals(nextCursor);
      setJournals((prev) => [...prev, ...data.journals]);
      setNextCursor(data.nextCursor);
      setHasNext(data.hasNext);
    } catch (e) {
      console.error(e);
      setJournalsError("여행 일지 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView && hasNext && !isLoadingMore) {
        loadMoreJournals();
      }
    },
  });

  if (isMyProfileLoading) return <p>로딩 중...</p>;
  if (myProfileError) return <p>{myProfileError}</p>;
  if (!myProfile) return null;

  if (isJournalsLoading) return <p>로딩 중...</p>;
  if (journalsError) return <p>{journalsError}</p>;

  const closeCreateJournalModal = () => {
    setIsCreateJournalModalOpen(false);
  };

  return (
    <main className="flex flex-col h-dvh  bg-gray-10 pt-[calc(var(--safe-top)+12px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-2.5">
      {isLogoutModalOpen && (
        <ConfirmModal
          message="로그아웃 하시겠습니까?"
          leftButtonText="로그아웃"
          rightButtonText="취소"
          onClose={handleLogout}
          onConfirm={() => setIsLogoutModalOpen(false)}
        />
      )}
      {isWithdrawalModalOpen && (
        <ConfirmModal
          message={`계정을 영구적으로\n삭제하시겠습니까?`}
          leftButtonText="삭제"
          rightButtonText="취소"
          onClose={handleWithdrawal}
          onConfirm={() => setIsWithdrawalModalOpen(false)}
        />
      )}
      {isCreateJournalModalOpen && (
        <MyPageModal
          content={`새로운 여행일지를\n작성하시겠습니까?`}
          onClose={closeCreateJournalModal}
          closeBtnText="취소"
          onConfirm={() => navigate("/mypage/journal/unwritten")}
          confirmBtnText="작성하기"
        />
      )}

      {/* 설정 */}
      <section className="flex justify-center">
        <div className="relative flex w-[390px] px-[15px] justify-end">
          <button
            type="button"
            onClick={() => setIsSettingsOpen((prev) => !prev)}
          >
            <Setting />
          </button>
          {isSettingsOpen && (
            <SettingsDropdown
              sections={MENU_SECTIONS}
              onClose={() => setIsSettingsOpen(false)}
            />
          )}
        </div>
      </section>

      {/* 프로필 */}
      <section className="flex justify-center">
        <div className="flex flex-col gap-4">
          {myProfile.profileImageUrl ? (
            <img
              src={myProfile.profileImageUrl}
              alt={myProfile.nickname}
              className="size-[70px] rounded-full object-cover"
            />
          ) : (
            <ProfileDefault className="size-[70px]" />
          )}
          <div className="flex justify-center gap-[5px]">
            <span className="text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">
              {myProfile.nickname}
            </span>
            <button
              className="flex items-center justify-center"
              onClick={() => navigate("/mypage/edit")}
            >
              <Edit />
            </button>
          </div>
        </div>
      </section>

      {/* segment */}
      <section className="flex justify-center">
        <div className="flex realtive items-center w-[358px] rounded-[36px] bg-gray-30 p-1">
          <button
            onClick={() => setIsStampMode(true)}
            className={"relative z-10 flex-1 rounded-[28px] text-center py-2"}
          >
            {isStampMode && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 rounded-[28px] bg-white"
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            )}
            <span
              className={`relative z-10 text-subtitle font-semibold ${isStampMode ? "text-gray-100" : "text-gray-60"}`}
            >
              스탬프
            </span>
          </button>

          <button
            onClick={() => setIsStampMode(false)}
            className={"relative z-10 flex-1 rounded-[28px] text-center py-2"}
          >
            {!isStampMode && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 rounded-[28px] bg-white"
                transition={{
                  type: "spring",
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
              />
            )}
            <span
              className={`relative z-10 text-subtitle font-semibold ${!isStampMode ? "text-gray-100" : "text-gray-60"}`}
            >
              여행일지
            </span>
          </button>
        </div>
      </section>

      {/* list */}
      <section className="flex justify-center">
        {isStampMode ? (
          <StampListView />
        ) : (
          <div className="grid grid-cols-3 gap-[5px]">
            <button
              className="col-start-1 row-start-1"
              onClick={handleCreateJournal}
            >
              <JournalAdd />
            </button>
            {journals.map((journal) => (
              // TODO : 클릭 시 여행일지 상세 보기 페이지로 이동 경로 연결
              <JournalPreviewCard
                key={journal.journalId}
                lineId={journal.line.id}
                stationName={journal.stationName}
                journalTitle={journal.title}
                thumbnailUrl={journal.thumbnailUrl}
                likeCount={journal.likeCount}
              />
            ))}
          </div>
        )}
      </section>
      <div ref={ref} className="h-1 w-full"></div>

      <BottomNav mode="course" activeTab="profile" />
    </main>
  );
}
