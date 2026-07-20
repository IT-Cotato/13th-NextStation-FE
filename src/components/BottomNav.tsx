import { useNavigate } from "react-router-dom"
import DrawIcon from '@/assets/bottomNav/draw.svg?react';
import CourseIcon from '@/assets/bottomNav/course.svg?react';
import GoToMainIcon from '@/assets/bottomNav/goToMain.svg?react';
import SaveIcon from '@/assets/bottomNav/save.svg?react';
import SelectedSaveIcon from '@/assets/bottomNav/selectedSave.svg?react';
import ExploreIcon from '@/assets/bottomNav/explore.svg?react';
import SelectedExploreIcon from '@/assets/bottomNav/selectedExplore.svg?react';
import MypageIcon from '@/assets/bottomNav/mypage.svg?react';
import SelectedMypageIcon from '@/assets/bottomNav/selectedMypage.svg?react';


type BottomNavProps = {
  mode: 'main' | 'course'
  activeTab?: 'save' | 'explore' | 'profile'
}
export default function BottomNav({ mode, activeTab = 'save' }: BottomNavProps) {
  const navigate = useNavigate();

  return (
    <nav className="absolute left-1/2 bottom-[50px] z-50 -translate-x-1/2">
      {mode === 'main' ? (
        <div className="flex items-center rounded-[42px] p-1 gap-1 bg-white/20 border border-gray-10 shadow-[0_0_28px_0_rgba(118,118,118,0.25)] backdrop-blur-[20px]">
          <button className="flex flex-col items-center rounded-[38px] px-10 py-2 gap-1 bg-gray-40/20 border border-gray-10 text-body-02 font-semibold text-gray-90 leading-none tracking-[-0.025em] text-center outline-none">
            <DrawIcon className="size-[30px]"/>
            뽑기
          </button>
          <button
            onClick={() => navigate(`/course`)}
            className="flex flex-col items-center rounded-[38px] px-10 py-2 gap-1 text-body-02 font-semibold text-gray-60 leading-none tracking-[-0.025em] text-center outline-none"
          >
            <CourseIcon className="size-[30px]"/>
            코스
          </button>
        </div>
      ): (
        // 코스 Nav
        <div className="flex items-center gap-4">

          <button 
            onClick={() => navigate(`/`)}
            className="flex items-center justify-center w-[64px] h-[64px] rounded-[38px] border border-gray-10 bg-white/20 shadow-[0_0_28px_0_rgba(118,118,118,0.25)] backdrop-blur-[20px]"
          >
            <GoToMainIcon className="size-9"/>
          </button>

          <div className="flex items-center rounded-[42px] px-1 py-[5px] gap-2 bg-white/20 border border-gray-10 shadow-[0_0_28px_0_rgba(118,118,118,0.25)] backdrop-blur-[20px]">
            <button
              onClick={() => navigate(`/course`)}
              className={`flex flex-col items-center rounded-[38px] px-6 py-2 gap-1 text-body-02 font-semibold leading-none tracking-[-0.025em] text-center outline-none
                ${activeTab === 'save'
                  ? 'bg-gray-40/20 border border-gray-10 text-gray-90'
                  : 'text-gray-60'
                }`}
            >
              {activeTab === 'save' ? (
                <SelectedSaveIcon className="size-[30px]"/>
              ): (
                 <SaveIcon className="size-[30px]"/>
              )}
              저장
            </button>

            <button
              onClick={() => navigate(`/explore`)}
              className={`flex flex-col items-center rounded-[38px] px-6 py-2 gap-1 text-body-02 font-semibold leading-none tracking-[-0.025em] text-center outline-none
                ${activeTab === 'explore'
                  ? 'bg-gray-40/20 border border-gray-10 text-gray-90'
                  : 'text-gray-60'
                }`}
            >
              {activeTab === 'explore' ? (
                <SelectedExploreIcon className="size-[30px]"/>
              ) : (
                <ExploreIcon className="size-[30px]"/>
              )}
              둘러보기
            </button>
            <button
              onClick={() => navigate(`/mypage`)}
              className={`flex flex-col items-center rounded-[38px] px-6 py-2 gap-1 text-body-02 font-semibold leading-none tracking-[-0.025em] text-center outline-none
                ${activeTab === 'profile'
                  ? 'bg-gray-40/20 border border-gray-10 text-gray-90'
                  : 'text-gray-60'
                }`}
            >
              {activeTab === 'profile' ? (
                <SelectedMypageIcon className="size-[30px]"/>
              ) : (
                <MypageIcon className="size-[30px]"/>
              )}
              프로필
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}