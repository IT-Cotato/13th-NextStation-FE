import CloseIcon from '@/assets/close.svg?react';
import StationTitle from '@/pages/draw/components/StationTitle';
import ArrowPrev from '@/assets/arrow-prev.svg?react';
import ArrowNext from '@/assets/arrow-next.svg?react';

function ResultPage() {
  return (
    <main className="relative flex flex-col h-dvh overflow-hidden bg-gray-10 gap-8 pt-[calc(var(--safe-top)+12px)]">
      {/* close */}
      <div className='flex justify-end px-4'>
         <CloseIcon className="size-6" />
      </div>

      {/* title */}
      <section className='flex justify-center'>
        <StationTitle
          line={6}
          stationName="보문역"
        />
      </section>

      {/* Description */}
      <section className='flex flex-1 justify-center'>
        <div className='flex flex-col w-[355px] self-stretch rounded-t-[48px] px-3 pt-6 gap-6 bg-white'>
          <div className='flex flex-col gap-4 items-center'>
            <div className='w-full flex px-20 gap-2'>
              {/* 호선 칩 */}

            </div>
            <div className='w-[330px] rounded-lg px-4 py-5 gap-[10px] bg-primary-10'>
              <p className='text-body-01 text-gray-100 leading-[1.4] tracking-[-0.025em] text-start'>
                성북천을 따라 천천히 걷고, <br />
                대학가와 오래된 주거 골목 사이의 <br />
                조용한 생활감을 느낄 수 있는 역이에요.
              </p>
            </div>
          </div>

          <div className='w-[330px] flex flex-col gap-2 items-start'>
            <h3 className='text-title-02 font-semibold text-gray-80 leading-none tracking-[-0.025em]'>보문역에선!</h3>
            <div className='w-full rounded-lg px-4 py-5 gap-[10px] border-2 border-gray-30'>
              <p className='text-body-01 text-gray-100 leading-[1.4] tracking-[-0.025em] text-start'>
                1. 성북천을 따라 가볍게 산책하기 <br />
                2. 보문동 골목과 생활 상권 둘러보기 <br />
                3. 성신여대 . 안암 방향으로 이어지는 대학가 카페 들르기 <br />
                4. 조용한 동네 분위기를 기록하거나 사진 남기기
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 버튼 */}
      <section className='absolute bottom-[calc(var(--safe-bottom)+64px)] z-10 flex w-full items-center justify-between px-5'>
        {/* feature/main 머지 후 버튼 컴포넌트로 대체하기 */}
        <button
            type="button"
            className='
              flex items-center justify-center gap-2 px-6 py-4 rounded-full 
              bg-linear-to-r from-primary-50 to-secondary-50 border-[2px] border-secondary-30 
              shadow-[0_0_8px_var(--color-secondary-50)]
              active:from-[#EF9E8C] active:to-[#E5989F] active:border-secondary-50
            '
          >
            <ArrowPrev className='size-[24px]'/>
            <h2 className='whitespace-nowrap text-title-01 font-semibold text-gray-10 leading-none tracking-[-0.025em]'>랜덤뽑기</h2>
          </button>
          <button
            type="button"
            className='
              flex items-center justify-center gap-2 px-6 py-4 rounded-full
              bg-linear-to-r from-secondary-50 to-primary-50 border-[2px] border-secondary-30
              shadow-[0_0_8px_var(--color-secondary-50)]
              active:from-[#EF9E8C] active:to-[#E5989F] active:border-secondary-50
            '
          >
            <h2 className='whitespace-nowrap text-title-01 font-semibold text-gray-10 leading-none tracking-[-0.025em]'>맞춤추천</h2>
            <ArrowNext className='size-[24px]'/>
          </button>
      </section>     
    </main>
  )
}
export default ResultPage