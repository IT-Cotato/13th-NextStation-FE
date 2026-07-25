export default function ReviewPreviewCard({
  writerProfileImageUrl,
  writerNickname,
  content,
}: {
  writerProfileImageUrl: string;
  writerNickname: string;
  content: string;
}) {
  return (
    <div className="flex justify-center">
      <div className="flex px-4 py-2.5 gap-2">
        {/* 프로필 사진 */}
        <div className="flex w-11 h-11 shrink-0 rounded-full border border-primary-20 overflow-hidden">
          <img
            src={writerProfileImageUrl}
            alt={`${writerNickname} 프로필 사진`}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col min-w-0 gap-2">
          {/* 닉네임 */}
          <span className="text-body-01 font-semibold leading-[1.4] tracking-[-0.35px]">
            {writerNickname}
          </span>
          {/* 리뷰 */}
          <p className="text-body-02 text-gray-70 line-clamp-2 min-w-0 leading-[1.4] tracking-[-0.3px]">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
