import { useNavigate } from "react-router-dom";

type ProfileIconProps = {
  isLoggedIn: boolean;
  profileImageUrl?: string;
};

function ProfileIcon ({ isLoggedIn, profileImageUrl }: ProfileIconProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(isLoggedIn ? '/mypage' : '/auth');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        relative flex size-[45px] items-center justify-center overflow-hidden rounded-full p-0
        border border-white/70 bg-linear-to-b from-white/30 to-white/10
        shadow-[0_0_28px_rgba(118,118,118,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]
        backdrop-blur-[22px]
      "
      aria-label={isLoggedIn ? '프로필' : '로그인'}
    >
      <div className="pointer-events-none absolute inset-x-[6px] top-[4px] h-[10px] rounded-full bg-white/25 blur-sm" />
      {isLoggedIn && profileImageUrl ? (
        /* 임시로 가득 채우는 것으로 세팅 */
        <img
          src={profileImageUrl}
          alt=""
          className="relative z-10 h-full w-full object-cover"
        />
      ): (
        <svg
          viewBox="0 0 23 24"
          className="relative z-10 h-[24px] w-[23px] text-gray-70"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11.5" cy="5.5" r="5.5" fill="currentColor" />
          <path
            d="M11.5 13C17.1413 13 21.8339 16.8854 22.8125 22.0111C23.0196 23.0961 22.1046 24 21 24H2C0.895431 24 -0.0196041 23.0961 0.187507 22.0111C1.16608 16.8854 5.85869 13 11.5 13Z"
            fill="currentColor"
          />
        </svg>
      )}

    </button>
  )
}
export default ProfileIcon;
