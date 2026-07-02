import Badge from '@/assets/badge.svg?react';
import ArrowLeft from '@/assets/arrow-l.svg?react';
import ArrowRight from '@/assets/arrow-r.svg?react';

function MainPage() {
  return (
    <main className="min-h-dvh px-[var(--spacing-page-x)] py-[var(--spacing-page-y)] bg-gray-10 flex flex-col items-center justify-center">
      {/* title */}
      <div className="h-[95px] w-[350px] rounded-full bg-linear-to-r from-secondary-30 to-primary-10 p-[10px] shadow-[0_0_20px_var(--color-primary-30)]">
        <div className="relative h-full w-full rounded-full bg-white flex items-center justify-between">
          <Badge className="absolute left-[12px] top-[12px] size-[52px]"/>
          <ArrowLeft className='absolute left-[87px] top-[30.88px] h-[12.35px] w-[31px]'/>
          <div className='absolute left-[141px] top-[16.5px] flex w-[106px] flex-col items-center gap-[5px]'>
            <p className='whitespace-nowrap text-body-02 text-gray-80 leading-none tracking-[-0.025em]'>Next Station</p>
            <h2 className='whitespace-nowrap text-title-01 font-semibold text-gray-90 leading-none tracking-[-0.025em]'>오늘의 환승역</h2>

          </div>
          <ArrowRight className='absolute left-[279px] top-[30.88px] h-[12.35px] w-[31px]'/>
          
        </div>
      </div>
      
    </main>
  )

}

export default MainPage