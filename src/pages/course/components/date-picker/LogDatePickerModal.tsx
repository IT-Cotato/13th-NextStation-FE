import { useState } from "react";
import CalendarDayView from "./CalendarDayView";
import CalendarYearView from "./CalendarYearView";
import CalendarMonthView from "./CalendarMonthView";
import { getDisplayDateParts } from "@/utils/logDate";

type CalendarMode = "date" | "year" | "month";

type LogDatePickerModalProps = {
  defaultDate: string | null;
  selectedDate: string | null;
  onClose: () => void;
  onConfirm: (date: string) => void;
}

export default function LogDatePickerModal({
  defaultDate,
  selectedDate,
  onClose,
  onConfirm,
}: LogDatePickerModalProps) {
  const [mode, setMode] = useState<CalendarMode>("date");
  const baseDate = selectedDate ?? defaultDate;
  const today = new Date();
  const initialDate = baseDate
    ? getDisplayDateParts(baseDate)
    : {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
      };

  const [draftYear, setDraftYear] = useState(initialDate.year);
  const [draftMonth, setDraftMonth] = useState(initialDate.month);
  const [draftDay, setDraftDay] = useState(initialDate.day);

  return (
    <div className="flex w-[360px] mx-auto px-[10px] py-4 gap-[10px] bg-white border border-primary-50 rounded-lg">
      {mode === "date" && (
        <CalendarDayView
          displayYear={draftYear}
          displayMonth={draftMonth}
          selectedDay={draftDay}
          highlightDate={defaultDate}
          onChangeYear={setDraftYear}
          onChangeMonth={setDraftMonth}
          onClickYear={() => setMode("year")}
          onClickMonth={() => setMode("month")}
          onSelectDate={(date) => {
            setDraftDay(Number(date.split(".")[2]));
            onConfirm(date);
            onClose();
          }}
        />
      )}

      {mode === "year" && (
        <CalendarYearView
          displayYear={draftYear}
          selectedYear={draftYear}
          onSelectYear={setDraftYear}
          onClose={onClose}
          onConfirm={() => setMode("date")}
        />
      )}

      {mode === "month" && (
        <CalendarMonthView
          displayMonth={draftMonth}
          selectedMonth={draftMonth}
          onSelectMonth={setDraftMonth}
          onClose={onClose}
          onConfirm={() => setMode("date")}
        />
      )}
    </div>
  )
}
