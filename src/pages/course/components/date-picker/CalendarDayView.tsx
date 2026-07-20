import { useMemo } from "react";
import PrevIcon from '@/assets/arrow-prev(gray).svg?react';
import NextIcon from '@/assets/arrow-next(gray).svg?react';

type CalendarDayViewProps = {
  displayYear: number;
  displayMonth: number;
  selectedDay: number;
  highlightDate: string | null;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
  onClickYear: () => void;
  onClickMonth: () => void;
  onSelectDate: (date: string) => void;
};

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarDayView({
  displayYear,
  displayMonth,
  selectedDay,
  highlightDate,
  onChangeYear,
  onChangeMonth,
  onClickYear,
  onClickMonth,
  onSelectDate,
}: CalendarDayViewProps) {
  const firstDayOfMonth = new Date(displayYear, displayMonth - 1, 1).getDay();
  const daysInMonth = new Date(displayYear, displayMonth, 0).getDate();
  const [highlightYear, highlightMonth, highlightDay] =
    highlightDate?.split(".").map(Number) ?? [];

  const dateCells = useMemo(() => {
    return [
      ...Array.from({ length: firstDayOfMonth }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];
  }, [firstDayOfMonth, daysInMonth]);

  const handlePrevMonth = () => {
    if (displayMonth === 1) {
      onChangeYear(displayYear - 1);
      onChangeMonth(12);
      return;
    }

    onChangeMonth(displayMonth - 1);
  };

  const handleNextMonth = () => {
    if (displayMonth === 12) {
      onChangeYear(displayYear + 1);
      onChangeMonth(1);
      return;
    }

    onChangeMonth(displayMonth + 1);
  };

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <div className="flex gap-1">
        <button type="button" onClick={handlePrevMonth}>
           <PrevIcon className="size-4"/>
        </button>
        <div className="flex items-center">
          <button 
            type="button"
            onClick={onClickYear}
            className="flex rounded-sm px-2 py-[2px] items-center justify-center"
          >
            {displayYear}년
          </button>
          <button 
            type="button"
            onClick={onClickMonth}
            className="flex rounded-sm px-2 py-[2px] bg-gray-30 items-center justify-center"
          >
            {displayMonth}월
          </button>
        </div>
        <button type="button" onClick={handleNextMonth}>
          <NextIcon className="size-4"/>
        </button>
        
      </div>
      <div className="grid grid-cols-[repeat(7,28px)] gap-x-4 gap-y-1">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`flex h-6 w-7 items-center justify-center text-body-01 font-semibold leading-[1.4] tracking-[-0.025em] text-center outline-none ${
              index === 0 ? "text-primary-60" : "text-gray-60"
            }`}
          >
            {day}
          </div>
        ))}

        {dateCells.map((date, index) => {
          if (date === null) {
            return <div key={`empty-${index}`} className="h-6" />;
          }

          const dayOfWeek = index % 7;

          const isSelected = date === selectedDay;
          const isHighlightDate =
            displayYear === highlightYear &&
            displayMonth === highlightMonth &&
            date === highlightDay;

          return (
            <button
              key={date}
              type="button"
              onClick={() => {
                const nextDate = `${displayYear}.${String(displayMonth).padStart(2, "0")}.${String(date).padStart(2, "0")}`;
                onSelectDate(nextDate);
              }}
              className={`flex w-7 h-6 items-center justify-center rounded-[50px] text-body-01 leading-[1.4] tracking-[-0.025em] text-center ${
                isSelected
                  ? "bg-primary-50 text-white"
                  : isHighlightDate
                    ? "bg-gray-20 text-gray-100"
                      : dayOfWeek === 0
                        ? "text-primary-70"
                        : "text-gray-90"
              }`}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  )
}
