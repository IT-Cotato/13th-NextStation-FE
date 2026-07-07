import Line1Icon from '@/assets/subway/subway1.svg?react';
import Line2Icon from '@/assets/subway/subway2.svg?react';
import Line3Icon from '@/assets/subway/subway3.svg?react';
import Line4Icon from '@/assets/subway/subway4.svg?react';
import Line5Icon from '@/assets/subway/subway5.svg?react';
import Line6Icon from '@/assets/subway/subway6.svg?react';
import Line7Icon from '@/assets/subway/subway7.svg?react';
import Line8Icon from '@/assets/subway/subway8.svg?react';
import Line9Icon from '@/assets/subway/subway9.svg?react';

type SubwayLine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface StationTitleProps {
  line: SubwayLine;
  stationName: string;
}

const LINE_STYLES = {
  1: {
    border: 'border-subway-1-light',
    shadow: 'shadow-[0_0_25px_var(--color-subway-1-light)]',
    icon: Line1Icon,
  },
  2: {
    border: 'border-subway-2-light',
    shadow: 'shadow-[0_0_25px_var(--color-subway-2-light)]',
    icon: Line2Icon,
  },
  3: {
    border: 'border-subway-3-light',
    shadow: 'shadow-[0_0_25px_var(--color-subway-3-light)]',
    icon: Line3Icon,
  },
  4: {
    border: 'border-subway-4-light',
    shadow: 'shadow-[0_0_25px_var(--color-subway-4-light)]',
    icon: Line4Icon,
  },
  5: {
    border: 'border-subway-5-light',
    shadow: 'shadow-[0_0_25px_var(--color-subway-5-light)]',
    icon: Line5Icon,
  },
  6: {
    border: 'border-subway-6-light',
    shadow: 'shadow-[0_0_25px_var(--color-subway-6-light)]',
    icon: Line6Icon,
  },
  7: {
    border: 'border-subway-7-light',
    shadow: 'shadow-[0_0_25px_var(--color-subway-7-light)]',
    icon: Line7Icon,
  },
  8: {
    border: 'border-subway-8-light',
    shadow: 'shadow-[0_0_25px_var(--color-subway-8-light)]',
    icon: Line8Icon,
  },
  9: {
    border: 'border-subway-9-light',
    shadow: 'shadow-[0_0_25px_var(--color-subway-9-light)]',
    icon: Line9Icon,
  }
} as const;

export default function StationTitle({ line, stationName }: StationTitleProps) {
  const { border, shadow, icon:Icon } = LINE_STYLES[line];
  return (
      <div className={`
          flex w-[316px] items-center justify-start rounded-full gap-6 
          bg-white border-[10px] py-3 pl-3 pr-9
          ${border} ${shadow}
        `}
      >
        <Icon className="size-[52px] shrink-0"/>

        <div className='flex w-full flex-col items-center text-center gap-[5px]'>
          <p className='whitespace-nowrap text-body-02 text-gray-80 leading-none tracking-[-0.025em]'>Next Station</p>
          <h2 className='whitespace-nowrap text-title-01 font-semibold text-gray-90 leading-none tracking-[-0.025em]'>{stationName}</h2>
        </div>
      </div>
  )
}