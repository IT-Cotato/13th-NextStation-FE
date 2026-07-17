type CalendarMonthViewProps = {
  displayMonth: number;
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
  onClose: () => void;
  onConfirm: () => void;
};

const MONTH_OPTIONS = [
  1, 2, 3, 4,
  5, 6, 7, 8,
  9, 10, 11, 12,
];

export default function CalendarMonthView({
  displayMonth,
  selectedMonth,
  onSelectMonth,
  onClose,
  onConfirm,
}: CalendarMonthViewProps) {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="text-subtitle font-semibold text-gray-100 leading-[1.4] tracking-[-0.025em]">
          {displayMonth}월
        </h2>

        <div className="grid grid-cols-4 gap-x-6 gap-y-4">
          {MONTH_OPTIONS.map((month) => {
            const isSelected = month === selectedMonth;
            const isCurrentMonth = month === currentMonth;

            return (
              <button
                key={month}
                type="button"
                onClick={() => onSelectMonth(month)}
                className={`inline-flex items-center justify-center rounded-[20px] px-2 py-0.5 text-subtitle leading-[1.4] tracking-[-0.025em] text-center outline-none ${
                  isSelected
                    ? "bg-secondary-20 text-primary-60"
                    : isCurrentMonth
                      ? "bg-gray-30 text-gray-70"
                      : "text-gray-70"
                }`}
              >
                {month}월
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex h-[50px] w-[308px] items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-[150px] items-center justify-center rounded-lg border border-gray-40 bg-gray-20 py-3 text-title-02 font-semibold leading-[1.4] tracking-[-0.025em] text-gray-60"
        >
          취소
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="flex h-10 w-[150px] items-center justify-center rounded-lg bg-linear-to-r from-secondary-50 to-primary-50 py-3 text-title-02 font-semibold leading-[1.4] tracking-[-0.025em] text-gray-10"
        >
          다음
        </button>
      </div>
    </div>
  );
}
