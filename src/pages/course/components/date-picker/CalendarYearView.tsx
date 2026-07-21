type CalendarYearViewProps = {
  displayYear: number;
  selectedYear: number;
  onSelectYear: (year: number) => void;
  onClose: () => void;
  onConfirm: () => void;
};

const YEAR_OPTIONS = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];

export default function CalendarYearView({
  displayYear,
  selectedYear,
  onSelectYear,
  onClose,
  onConfirm,
}: CalendarYearViewProps) {
  return (
    <div className="flex flex-col w-full items-center gap-6">
      <div className="flex flex-col w-full gap-4 items-center">

        <h2 className="text-subtitle font-semibold text-gray-100 leading-[1.4] tracking-[-0.025em]">
          {displayYear}년
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {YEAR_OPTIONS.map((year) => {
            const isSelected = year === selectedYear;
            const currentYear = new Date().getFullYear();
            const isCurrentYear = year === currentYear;

            return (
              <button
                key={year}
                type="button"
                onClick={() => onSelectYear(year)}
                className={`flex items-center justify-center rounded-lg px-2 py-0.5 text-subtitle leading-[1.4] tracking-[-0.025em] text-center outline-none ${
                  isSelected
                    ? "bg-secondary-20 text-primary-60"
                    : isCurrentYear
                      ? "bg-gray-30 text-gray-70"
                      : "text-gray-70"
                }`}
              >
                {year}년
              </button>
            );
          })}
        </div>

      </div>

      <div className="flex w-[308px] h-[50px] items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex w-[150px] items-center justify-center h-10 rounded-lg py-3 bg-gray-20 border border-gray-40 text-title-02 font-semibold text-gray-60 leading-[1.4] tracking-[-0.025em] text-center"
          >
          취소
        </button>
        <button 
          type="button"
          onClick={onConfirm}
          className="flex w-[150px] items-center justify-center h-10 rounded-lg py-3 bg-linear-to-r from-secondary-50 to-primary-50 text-title-02 font-semibold text-gray-10 leading-[1.4] tracking-[-0.025em] text-center"
        >
          다음
        </button>
      </div>
    </div>
  )
}