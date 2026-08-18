import { LINES, stationsByLine } from "@/data/stationsByLine";
import * as motion from "motion/react-client";
import type { Dispatch, SetStateAction } from "react";
import CategoryTabs from "./CategoryTabs";

// MainPage 호선 카테고리

export default function StationCategory({
  selectedLine,
  onSelectLine,
  selectedStation,
  onSelectStation,
}: {
  selectedLine: string;
  onSelectLine: Dispatch<SetStateAction<string>>;
  selectedStation: string;
  onSelectStation: Dispatch<SetStateAction<string>>;
}) {
  const stations = stationsByLine[selectedLine] ?? [];

  const handleSelectLine = (line: string) => {
    onSelectLine(line);
    onSelectStation("전체");
  };

  return (
    // 탭과 카테고리가 담길 컨테이너
    <div className="flex flex-col w-full pt-4 bg-gray-10">
      {/* 상단 메뉴 (호선 탭) */}
      <nav className="border-b border-gray-40 px-[10px]">
        <ul className="flex w-full overflow-x-auto overflow-y-hidden p-0 m-0 list-none font-semibold [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {LINES.map((item) => (
            // 탭 버튼 자체
            <motion.li
              className="w-[70px] shrink-0 px-2 pb-2 relative bg-gray-10 flex justify-center items-center min-w-0 select-none"
              key={item}
              initial={false}
              animate={{
                color: item === selectedLine ? "#DB868D" : "#909090", // HEX 값을 필요로 함
              }}
              onClick={() => handleSelectLine(item)}
            >
              <span className="text-subtitle font-semibold leading-[1.4] tracking-[-0.4px]">
                {item}
              </span>

              {/* 탭 메뉴 밑의 밑줄 */}
              {item === selectedLine ? (
                <motion.div
                  className="flex items-center absolute left-0 right-0 -bottom-[0.5px] h-0.5 bg-secondary-60"
                  layoutId="underline"
                  id="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* 역 목록 */}
      <div className="px-[10px] py-3">
        <CategoryTabs
          categories={["전체", ...stations]}
          selected={selectedStation}
          onSelect={onSelectStation}
        />
      </div>
    </div>
  );
}
