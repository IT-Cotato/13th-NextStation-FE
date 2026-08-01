import CardActionButton from "./CardActionButton";
import { useNavigate } from "react-router-dom";
import Selected from "@/assets/selected.svg?react";
import Unselected from "@/assets/unselected.svg?react";
import { STATION_STAMP_MAP } from "@/constants/stationStampMap";
import { DISABLED_LINE_STAMP_MAP } from "@/constants/disabledLineStampMap";

export default function SavedCourseCard({
  id,
  name,
  line,
  stationName,
  isCompleted,
  onCompletedClick,
  isDeleteMode,
  isSelect,
  handleSelected,
}: {
  id: number;
  name: string;
  line: string;
  stationName: string;
  isCompleted: boolean;
  onCompletedClick: (id: number) => void;
  isDeleteMode: boolean;
  isSelect: boolean;
  handleSelected: (targetId: number) => void;
}) {
  const navigate = useNavigate();
  const StampIcon = isCompleted
    ? STATION_STAMP_MAP[stationName]
    : DISABLED_LINE_STAMP_MAP[line];

  return (
    <div
      className={`${isSelect ? "border border-primary-50 bg-secondary-10" : "border border-white bg-white"} flex w-[361px] p-3 gap-4 rounded-lg`}
      onClick={() => {
        if (isDeleteMode) handleSelected(id);
      }}
    >
      <div>{StampIcon ? <StampIcon className="w-16 h-16" /> : null}</div>
      <div className="flex flex-col flex-1 gap-2.5">
        <span className="text-black text-subtitle font-semibold leading-[1.4] tracking-[-0.4px]">
          {name}
        </span>
        <div className="flex gap-1">
          <CardActionButton
            onClick={() => {
              if (!isDeleteMode) navigate(`/course/${id}/verify`);
            }}
          >
            코스 확인
          </CardActionButton>
          <CardActionButton
            onClick={() => {
              if (!isDeleteMode) onCompletedClick(id);
            }}
          >
            여행 완료
          </CardActionButton>
        </div>
      </div>
      {isDeleteMode && (
        <button className="flex items-center justify-center outline-none">
          {isSelect ? <Selected /> : <Unselected />}
        </button>
      )}
    </div>
  );
}
