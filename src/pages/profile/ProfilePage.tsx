import BackIcon from "@/assets/back.svg?react";
import ProfileDefault from "@/assets/profile-default.svg?react";
import StampBomun from "@/assets/stamp/stamp-bomun.svg?react";
import StampDongnimmun from "@/assets/stamp/stamp-dongnimmun.svg?react";
import StampHagye from "@/assets/stamp/stamp-hagye.svg?react";
import StampHansungUniv from "@/assets/stamp/stamp-hansung-univ.svg?react";
import StampHeukseok from "@/assets/stamp/stamp-heukseok.svg?react";
import StampJegiDong from "@/assets/stamp/stamp-jegi-dong.svg?react";
import StampMajang from "@/assets/stamp/stamp-majang.svg?react";
import StampMullae from "@/assets/stamp/stamp-mullae.svg?react";
import StampSeokchon from "@/assets/stamp/stamp-seokchon.svg?react";
import StampEmpty from "@/assets/profile/stamp-empty.svg?react";
import JournalDefault from "@/assets/profile/journal-default.svg?react";
import {
  getCachedMyProfile,
  getMyProfile,
  getPublicMemberCourses,
  getPublicMemberProfile,
  getPublicMemberStamps,
  type PublicMemberCourse,
  type PublicMemberStamp,
} from "@/api/member";
import { STATION_STAMP_MAP } from "@/constants/stationStampMap";
import { useEffect, useMemo, useState, type ComponentType, type SVGProps } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

type ProfileTab = "stamps" | "journals";
type StampIcon = ComponentType<SVGProps<SVGSVGElement>>;

const stampIcons: StampIcon[] = [
  StampJegiDong,
  StampMullae,
  StampDongnimmun,
  StampHansungUniv,
  StampMajang,
  StampBomun,
  StampHagye,
  StampSeokchon,
  StampHeukseok,
  StampHagye,
  StampSeokchon,
  StampHeukseok,
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { memberId: memberIdParam } = useParams();
  const location = useLocation();
  const profileState = location.state as { nickname?: string; profileImageUrl?: string | null } | null;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialProfile = getCachedMyProfile();
  const isPublicProfile = location.pathname === "/profile";
  const [nickname, setNickname] = useState(profileState?.nickname ?? initialProfile?.nickname ?? "민성");
  const [profileImageUrl, setProfileImageUrl] = useState(profileState?.profileImageUrl ?? initialProfile?.profileImageUrl ?? null);
  const [publicStamps, setPublicStamps] = useState<PublicMemberStamp[]>([]);
  const [publicCourses, setPublicCourses] = useState<PublicMemberCourse[]>([]);
  const [profileError, setProfileError] = useState<string | null>(null);
  const requestedView = searchParams.get("view");
  const [tab, setTab] = useState<ProfileTab>(requestedView === "journals" ? "journals" : "stamps");

  const previewStamps = useMemo(() => {
    if (requestedView === "one") return stampIcons.slice(0, 1);
    if (requestedView === "many") return stampIcons;
    return [];
  }, [requestedView]);
  const memberId = Number(memberIdParam);
  const hasPublicMemberId = Number.isSafeInteger(memberId) && memberId > 0;
  const stamps = hasPublicMemberId
    ? publicStamps.map((stamp) => STATION_STAMP_MAP[stamp.stationName]).filter((Stamp): Stamp is StampIcon => Boolean(Stamp))
    : previewStamps;
  const journals = publicCourses;

  useEffect(() => {
    if (isPublicProfile) return;
    getMyProfile()
      .then((profile) => {
        setNickname(profile.nickname);
        setProfileImageUrl(profile.profileImageUrl);
      })
      .catch(() => undefined);
  }, [isPublicProfile]);

  useEffect(() => {
    if (!hasPublicMemberId) return;
    let isActive = true;
    Promise.all([
      getPublicMemberProfile(memberId),
      getPublicMemberStamps(memberId),
      getPublicMemberCourses(memberId),
    ])
      .then(([profile, stampsResponse, coursesResponse]) => {
        if (!isActive) return;
        setNickname(profile.nickname);
        setProfileImageUrl(profile.profileImageUrl);
        setPublicStamps(stampsResponse);
        setPublicCourses(coursesResponse.courses);
      })
      .catch((error) => {
        if (isActive) setProfileError(error instanceof Error ? error.message : "프로필 정보를 불러오지 못했습니다.");
      });
    return () => {
      isActive = false;
    };
  }, [hasPublicMemberId, memberId]);

  const selectTab = (nextTab: ProfileTab) => {
    setTab(nextTab);
    const next = new URLSearchParams(searchParams);
    next.set("view", nextTab === "journals" ? "journals" : stamps.length > 1 ? "many" : stamps.length === 1 ? "one" : "empty");
    setSearchParams(next, { replace: true });
  };

  return (
    <main className="profile-page mx-auto min-h-dvh w-full max-w-[390px] overflow-x-hidden bg-gray-10 pb-16 text-gray-100">
      <header className="flex h-[90px] items-end px-[15px] pb-[10px] pt-[57px]">
        <button type="button" onClick={() => navigate(-1)} aria-label="이전" className="grid size-6 place-items-center">
          <BackIcon className="size-6" />
        </button>
      </header>

      <section className="flex flex-col items-center gap-4">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt={`${nickname} 프로필`} className="size-[70px] rounded-full object-cover" />
        ) : (
          <ProfileDefault className="size-[70px]" aria-hidden="true" />
        )}
        <h1 className="text-title-01 font-semibold leading-[1.4] tracking-[-0.5px]">{nickname}</h1>
      </section>

      <section className="mt-[10px] px-4 pt-4">
        <div className="flex rounded-[36px] bg-gray-30 p-1">
          <button type="button" onClick={() => selectTab("stamps")} className={`flex-1 rounded-[28px] py-2 text-subtitle font-semibold ${tab === "stamps" ? "bg-white text-gray-90" : "text-gray-60"}`}>스탬프</button>
          <button type="button" onClick={() => selectTab("journals")} className={`flex-1 rounded-[28px] py-2 text-subtitle font-semibold ${tab === "journals" ? "bg-white text-gray-90" : "text-gray-60"}`}>여행일지</button>
        </div>
      </section>

      {profileError && <p role="alert" className="mt-3 px-4 text-center text-body-02 text-primary-60">{profileError}</p>}

      <div className="mt-[14px]">
        {tab === "stamps" ? (
          stamps.length === 0 ? (
          <section className="mx-auto flex h-[484px] w-[348px] flex-col items-center gap-4 rounded-[36px] bg-white pt-[120px]">
            <StampEmpty className="h-[180px] w-[200px]" aria-hidden="true" />
            <p className="text-center text-body-01 leading-[1.4] tracking-[-0.35px] text-gray-80">아직 스탬프가 없어요!</p>
          </section>
        ) : (
          <section className="mx-auto w-[348px] rounded-[36px] bg-white px-6 pb-3 pt-6">
            <div className="grid w-[300px] grid-cols-3 gap-3">
              {stamps.map((Stamp, index) => <Stamp key={index} className="size-[92px]" />)}
            </div>
            <p className="mt-4 text-center text-body-01 font-semibold tracking-[-0.35px] text-gray-70">
              01 <span className="mx-2 text-gray-50">/</span> {stamps.length > 9 ? "02" : "01"}
            </p>
          </section>
        )
        ) : (
        <section className="grid grid-cols-3 gap-[5px] px-4">
          {journals.map((journal) => {
            const courseId = journal.courseId;
            return (
            <button key={courseId} type="button" className="relative h-[160px] overflow-hidden rounded-[20px] bg-secondary-20 px-3 pb-4 pt-[54px] text-left">
              {journal.imageUrl ? (
                <img src={journal.imageUrl} alt="" className="absolute inset-0 size-full object-cover" />
              ) : (
                <JournalDefault className="absolute inset-0 size-full" aria-hidden="true" />
              )}
              <div className="absolute inset-0 bg-linear-to-b from-transparent from-50% to-white" />
              <div className="relative flex flex-col gap-[9px]">
                <div className="flex items-center gap-1 text-body-02">
                  <span className="rounded-full bg-subway-2-dark px-[6px] text-body-01 font-semibold text-subway-2-light">{journal.line.id}</span>
                  <span>{journal.stationName}</span>
                </div>
                <strong className="line-clamp-2 text-body-01 font-semibold leading-[1.4] tracking-[-0.35px]">{journal.name}</strong>
                <span className="text-caption text-gray-70">♥ {journal.likeCount ?? 0}</span>
              </div>
            </button>
            );
          })}
        </section>
        )}
      </div>
    </main>
  );
}
