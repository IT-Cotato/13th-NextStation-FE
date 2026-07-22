
import { useLogDraft } from "../contexts/logDraft";

const tags = ['문화공간', '카페', '산책'];

export default function LogPreviewCard() {
  const { draft } = useLogDraft();
  const displayDate = draft.selectedDate ?? draft.acquiredDate;

  const placeLabels = draft.placeReviews.map((place) => place.label);
  const previewImage = draft.photos[0];

  const maxVisiblePlaces = 3;
  const visiblePlaces = placeLabels.slice(0, maxVisiblePlaces);
  const hiddenCount = placeLabels.length - visiblePlaces.length;

  return (
    <div className="flex flex-col w-[360px] items-center justify-center rounded-lg p-3 gap-3 bg-white">
      <div className="flex w-full items-center justify-center gap-2">
        <div className="w-[108px] h-[108px] shrink-0 rounded-md bg-primary-20">
          {previewImage ? (
            <img
              src={previewImage}
              alt={`${draft.logName} 대표 사진`}
              className="h-full w-full object-cover rounded-md"
            />
          ) : null}
        </div>

        <div className="flex flex-col w-full gap-2 bg-white items-start">
          {/* 기록 제목 및 시간 */}
          <h3 className="text-title-02 font-semibold text-gray-100 leading-[1.4] tracking-[-0.025em]">
            [보문역] {draft.logName}
          </h3>

          <div className="flex gap-2 items-center justify-center text-body-02 text-gray-70 leading-[1.4] tracking-[-0.025em]">
            <p>{displayDate ?? '날짜 미입력'}</p>
            <div className="w-1 h-1 rounded-full bg-gray-50"/>
            <p>{draft.selectedTime ? `${draft.selectedTime} 소요` : '시간 미입력'}</p>
          </div>

          <div className="flex items-center justify-center gap-1">
            {tags.map((tag) => (
            <div 
              key={tag}
              className="flex items-center justify-center rounded-lg px-2 py-1 bg-gray-20"
            >
              <p className="text-caption text-gray-80 leading-none tracking-[-0.025em]">
                {tag}
              </p>
            </div>
            ))}
          </div>
        </div>
      </div>

      {/* 장소 해시태그 */}
      <div className="flex w-full gap-1 overflow-hidden">
        {visiblePlaces.map((label) => (
          <div
            key={label}
            className="flex rounded-lg items-center justify-center px-4 py-2 bg-gray-10"
          >
            <p className="text-body-02 text-gray-70 leading-[1.4] tracking-[-0.025em]">
              {label}
            </p>
          </div>
        ))}

        {hiddenCount > 0 && (
          <div className="flex shrink-0 items-center justify-center rounded-lg bg-gray-10 px-4 py-2">
            <p className="text-body-02 leading-[1.4] tracking-[-0.025em] text-gray-70">
              +{hiddenCount}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
