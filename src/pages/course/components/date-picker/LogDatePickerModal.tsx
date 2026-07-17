import { useState } from "react";
import CalendarDayView from "./CalendarDayView";
import CalendarYearView from "./CalendarYearView";
import CalendarMonthView from "./CalendarMonthView";

type CalendarMode = "date" | "year" | "month";

type LogDatePickerModalProps = {
  selectedDate: string | null;
  onClose: () => void;
  onConfirm: (date: string) => void;
}

export default function LogDatePickerModal({
  selectedDate,
  onClose,
  onConfirm,
}: LogDatePickerModalProps) {
  const [mode, setMode] = useState<CalendarMode>("date");

  const today = new Date();

  const initialYear = selectedDate
    ? Number(selectedDate.split(".")[0])
    : today.getFullYear();

  const initialMonth = selectedDate
    ? Number(selectedDate.split(".")[1])
    : today.getMonth() + 1;

  const initialDay = selectedDate
    ? Number(selectedDate.split(".")[2])
    : today.getDate();

  const [draftYear, setDraftYear] = useState(initialYear);
  const [draftMonth, setDraftMonth] = useState(initialMonth);
  const [draftDay, setDraftDay] = useState(initialDay);

  return (
    <div className="flex w-[360px] px-[10px] py-4 gap-[10px] bg-white border border-primary-50 rounded-lg">
      {mode === "date" && (
        <CalendarDayView
          displayYear={draftYear}
          displayMonth={draftMonth}
          selectedDay={draftDay}
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
