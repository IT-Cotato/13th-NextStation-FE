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

  return (
    <div className="flex w-[360px] px-[10px] py-4 gap-[10px] bg-white border border-primary-50 rounded-lg">
      {mode === "date" && (
        <CalendarDayView
          selectedDate={selectedDate}
          onClickYear={() => setMode("year")}
          onClickMonth={() => setMode("month")}
          onSelectDate={(date) => {
            onConfirm(date);
            onClose();
          }}
        />
      )}

      {mode === "year" && (
        <CalendarYearView
          selectedDate={selectedDate}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}

      {mode === "month" && (
        <CalendarMonthView
          selectedDate={selectedDate}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </div>
  )
}