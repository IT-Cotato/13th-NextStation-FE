import Badge from '@/assets/badge.svg?react';
import ArrowLeft from '@/assets/titleL.svg?react';
import ArrowRight from '@/assets/titleR.svg?react';
import DoorLeft from '@/assets/door_L.svg?react';
import DoorRight from '@/assets/door_R.svg?react';
import ProfileIcon from '@/components/ProfileIcon';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

function MainPage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 gap-8 pt-[calc(var(--safe-top)+12px)]">

      {/* 프로필 아이콘 */}
      <div className='flex justify-end px-5'>
        <ProfileIcon isLoggedIn={false} />
      </div>

      {/* title */}
      <section className='flex justify-center'>
        <div className="h-[95px] w-[calc(100vw-40px)] max-w-[350px] rounded-full bg-linear-to-r from-secondary-30 to-primary-10 p-[10px] shadow-[0_0_20px_var(--color-primary-30)]">
          <div className="h-full w-full rounded-full bg-white flex items-center justify-center gap-[26px]">
            <Badge className="size-[52px]"/>
            <ArrowLeft className='h-[12.35px] w-[31px]'/>
            <div className='flex w-[106px] flex-col items-center gap-[5px]'>
              <p className='whitespace-nowrap text-body-02 text-gray-80 leading-none tracking-[-0.025em]'>Next Station</p>
              <h2 className='whitespace-nowrap text-title-01 font-semibold text-gray-90 leading-none tracking-[-0.025em]'>오늘의 환승역</h2>
            </div>
            <ArrowRight className='h-[12.35px] w-[31px]'/>
          </div>
        </div>
      </section>

    {/* Door */}
    <section className='flex justify-center'>
      <div className='flex w-full'>
        {/* 왼쪽 문 */}
        <div className="relative h-full w-1/2">
          <DoorLeft className="h-full w-full" />
          <Button
            direction="left"
            onClick={() => navigate('/draw/loading')}
            className="absolute left-5 top-[56%] z-10"
          >
            랜덤뽑기
          </Button>
        </div>
        {/* 오른쪽 문 */}
        <div className="relative h-full w-1/2">
          <DoorRight className="h-full w-full" />
          <Button
            direction="right"
            onClick={() => navigate('/draw/recommend')}
            className="absolute right-5 top-[56%] z-10"
          >
            맞춤추천
          </Button>
        </div>
      </div>      
    </section>
      
    </main>
  )

}

export default MainPage
