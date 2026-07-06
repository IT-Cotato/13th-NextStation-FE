import Badge from '@/assets/badge.svg?react';
import ArrowLeft from '@/assets/arrow-l.svg?react';
import ArrowRight from '@/assets/arrow-r.svg?react';
import DoorLeft from '@/assets/door_L.svg?react';
import DoorRight from '@/assets/door_R.svg?react';
import ArrowPrev from '@/assets/arrow-prev.svg?react';
import ArrowNext from '@/assets/arrow-next.svg?react';

function MainPage() {
  return (
    <main className="relative h-dvh overflow-hidden bg-gray-10">
      {/* title */}
      <section className='absolute left-1/2 top-[119px] -translate-x-1/2'>
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

      {/* divider */}
    <div className="absolute left-0 top-[234px] h-[10px] w-full bg-gray-20" />

    {/* Door */}
    <section className='absolute left-1/2 top-[244px] h-[600px] w-[calc(100vw-40px)] max-w-[390px] -translate-x-1/2'>
      <DoorLeft className="absolute left-0 top-0 h-[600px] w-1/2" />
      <DoorRight className="absolute right-0 top-0 h-[600px] w-1/2" />
      
      {/* 랜덤뽑기 버튼 */}
      <button className='absolute left-1/4 top-[340px] z-10 flex -translate-x-1/2 items-center justify-center gap-2 px-6 py-4 rounded-full bg-linear-to-r from-primary-50 to-secondary-50 border-[2px] border-secondary-30 shadow-[0_0_8px_var(--color-secondary-50)]'>
        <ArrowPrev className='size-[24px]'/>
        <h2 className='whitespace-nowrap text-title-01 font-semibold text-gray-10 leading-none tracking-[-0.025em]'>랜덤뽑기</h2>
      </button>

      <button className='absolute left-3/4 top-[340px] z-10 flex -translate-x-1/2 items-center justify-center gap-2 px-6 py-4 rounded-full bg-linear-to-r from-secondary-50 to-primary-50 border-[2px] border-secondary-30 shadow-[0_0_8px_var(--color-secondary-50)]'>
        <h2 className='whitespace-nowrap text-title-01 font-semibold text-gray-10 leading-none tracking-[-0.025em]'>맞춤추천</h2>
        <ArrowNext className='size-[24px]'/>
      </button>
      
    </section>
      
    </main>
  )

}

export default MainPage