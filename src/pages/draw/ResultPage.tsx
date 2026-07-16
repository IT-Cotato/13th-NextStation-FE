import StationTitle from '@/components/StationTitle';
import { useNavigate } from 'react-router-dom';
import SubwayLineChip from '@/components/SubwayLineChip';
import Button from '@/components/Button';
import Header from '@/components/Header';

function ResultPage() {
  const navigate = useNavigate();

  return (
    <main className="relative flex flex-col h-dvh overflow-hidden bg-gray-10 gap-8 pt-[calc(var(--safe-top)+12px)]">
      <Header showClose onCloseClick={() => navigate('/')}/>

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
            
            {/* 호선 칩 */}
            <div className='w-full flex px-20 gap-2'>
              <SubwayLineChip label="6호선" />
              <SubwayLineChip label="우이신설선" />
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
        <Button
          direction="left"
          onClick={() => navigate('/draw/loading')}
        >
          다시 뽑기
        </Button>
        <Button
          direction="right"
          onClick={() => navigate('/course/verify')}
        >
          코스 확인하기
        </Button>
      </section>     
    </main>
  )
}
export default ResultPage