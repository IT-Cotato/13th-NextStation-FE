import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WarningOutline from "@/assets/warning-outline.svg?react";
import CTAButton from "@/components/CTAButton";
import Header from "@/components/Header";
import ProfileImageUploader from "./components/ProfileImageUploader";
import { getMyProfile, updateMyProfile } from "@/api/member";

const validateNickname = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "닉네임은 2자 이상 입력해주세요";
  }

  if (trimmedValue.length < 2) {
    return "닉네임은 2자 이상 입력해주세요";
  }

  if (trimmedValue.length > 10) {
    return "닉네임은 최대 10자까지 입력할 수 있어요";
  }

  return "";
};

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [profileError, setProfileError] = useState<string | null>(null);
  const [originalNickname, setOriginalNickname] = useState("");
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getMyProfile();
        setMemberId(profile.memberId);
        setNickname(profile.nickname);
        setImage(profile.profileImageUrl);
        setOriginalNickname(profile.nickname);
        setOriginalImage(profile.profileImageUrl);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProfile();
  }, []);

  const isNextDisabled =
    !nickname.trim() || Boolean(validateNickname(nickname));

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    setNicknameError(validateNickname(value));
  };

  const handleComplete = async () => {
    if (memberId === null) return;

    const updates: { nickname?: string; profileImageUrl?: string } = {};

    if (nickname.trim() !== originalNickname) {
      updates.nickname = nickname.trim();
    }

    if (image !== originalImage) {
      updates.profileImageUrl = image ?? "";
    }

    if (Object.keys(updates).length === 0) {
      navigate("/mypage");
      return;
    }

    try {
      await updateMyProfile(updates);
      navigate("/mypage");
    } catch (e) {
      console.error(e);
      setProfileError("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <main className="relative flex flex-col h-dvh overflow-hidden bg-white gap-8 pt-[calc(var(--safe-top)+12px)]">
      <Header showBack />

      <section className="flex justify-center">
        <div className="flex w-[360px]">
          <span className="text-title-01 text-gray-100 font-semibold leading-[1.4] tracking-[-0.5px]">
            프로필 수정
          </span>
        </div>
      </section>

      {/* profile image */}
      <section className="flex justify-center">
        <div className="flex flex-col w-[360px] gap-4">
          <span className="text-subtitle text-gray-100 font-semibold leading-[1.4] tracking-[-0.4px]">
            프로필 사진 (선택)
          </span>
          <ProfileImageUploader image={image} onChange={setImage} />
        </div>
      </section>

      {/* nickname */}
      <section className="flex justify-center">
        <div className="flex flex-col gap-4 w-[360px]">
          <span className="text-subtitle text-gray-100 font-semibold leading-[1.4] tracking-[-0.4px]">
            닉네임
          </span>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className="border border-primary-50 outline-none rounded-[20px] px-4 py-3 text-body-01 text-gray-70 leading-[1.4] tracking-[-0.35px]"
            />
            {/* error message */}
            {nicknameError && (
              <div className="flex gap-[5px]">
                <WarningOutline />
                <p className="text-body-02 leading-[1.4] tracking-[-0.3px] text-primary-60">
                  {nicknameError}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* button */}
      <section className="flex justify-center">
        <div className="flex flex-col items-center gap-2 w-[360px]">
          {profileError && (
            <p className="text-body-02 leading-[1.4] tracking-[-0.3px] text-primary-60">
              {profileError}
            </p>
          )}
          <CTAButton disabled={isNextDisabled} onClick={handleComplete}>
            저장
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
