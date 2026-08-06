export type SubwayLine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const LINE_STYLES: Record<SubwayLine, string> = {
  "1": "bg-subway-1-dark text-subway-1-light",
  "2": "bg-subway-2-dark text-subway-2-light",
  "3": "bg-subway-3-dark text-subway-3-light",
  "4": "bg-subway-4-dark text-subway-4-light",
  "5": "bg-subway-5-dark text-subway-5-light",
  "6": "bg-subway-6-dark text-subway-6-light",
  "7": "bg-subway-7-dark text-subway-7-light",
  "8": "bg-subway-8-dark text-subway-8-light",
  "9": "bg-subway-9-dark text-subway-9-light",
};

export default function LineBadge({ line }: { line: SubwayLine }) {
  return (
    <div className={`flex px-[6px] rounded-full w-fit ${LINE_STYLES[line]}`}>
      <span className="flex items-center justify-center text-body-01 font-semibold leading-[1.4]">
        {line}
      </span>
    </div>
  );
}
