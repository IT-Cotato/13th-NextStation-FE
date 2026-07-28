import StationTitle from '@/components/StationTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import SubwayLineChip from '@/components/SubwayLineChip';
import Button from '@/components/Button';
import Header from '@/components/Header';
import type { RandomDrawResponseData } from '@/api/random';

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state as RandomDrawResponseData | undefined;

  if (!result) {
    navigate(`/draw/loading`);
    return null;
  }

  const { station } = result;
  const formattedDescription = station.description.replace(/,\s*/g, ",\n");

  return (
    <main className="relative flex flex-col h-dvh overflow-hidden bg-gray-10 gap-8 pt-[calc(var(--safe-top)+12px)]">
      <Header showClose onCloseClick={() => navigate('/')}/>

      {/* title */}
      <section className='flex justify-center'>
        <StationTitle
          line={station.line.id}
          stationName={station.stationName}
        />
      </section>

      {/* Description */}
      <section className='flex flex-1 justify-center'>
        <div className='flex flex-col w-[355px] self-stretch rounded-t-[48px] px-3 pt-6 gap-6 bg-white'>
          <div className='flex flex-col gap-4 items-center'>
            
            {/* 호선 칩 */}
            <div className='w-full flex px-20 gap-2 items-center justify-center'>
              <SubwayLineChip label={station.line.name} />
            </div>

            <div className='w-[330px] rounded-lg px-4 py-5 gap-[10px] bg-primary-10'>
              <p className='whitespace-pre-line text-body-01 text-gray-100 leading-[1.4] tracking-[-0.025em] text-start'>
                {formattedDescription}
              </p>
            </div>
          </div>

          <div className='w-[330px] flex flex-col gap-2 items-start'>
            <h3 className='text-title-02 font-semibold text-gray-80 leading-none tracking-[-0.025em]'>
              {station.stationName}에선!
            </h3>
            <div className='w-full rounded-lg px-4 py-5 gap-[10px] border-2 border-gray-30'>
              <p className='whitespace-pre-line text-body-01 text-gray-100 leading-[1.4] tracking-[-0.025em] text-start'>
                {station.todo}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 버튼 */}
      <section className='absolute bottom-[calc(var(--safe-bottom)+10px)] z-10 flex w-full items-center justify-between px-5'>
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