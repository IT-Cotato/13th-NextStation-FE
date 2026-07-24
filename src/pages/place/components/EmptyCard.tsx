import Empty from "@/assets/empty.svg?react";

type EmptyCardVariant = "review" | "course";

export default function EmptyCard({
  variant = "review",
}: {
  variant?: EmptyCardVariant;
}) {
  return (
    <div className="flex flex-col w-[360px] h-[200px] bg-white rounded-lg items-center justify-center gap-[12.35px] pt-[27px] pb-[23px]">
      <Empty className="w-[85px] h-[83.649px]" />
      <div className="flex flex-col gap-2">
        <span className="text-gray-70 text-subtitle font-semibold text-center leading-[1.4] tracking-[-0.4px]">
          {variant === "review"
            ? "아직 등록된 리뷰가 없어요!"
            : "아직 코스가 없어요!"}
        </span>
        <p className="text-gray-60 text-caption text-center leading-none tracking-[-0.25px]">
          {variant === "review" ? (
            <>
              혹시 이 장소에 다녀오셨나요? <br />
              다녀오셨다면 여행 기록을 작성해보시면 어때요?
            </>
          ) : (
            "이 역의 다른 코스들을 둘러보는 건 어때요?"
          )}
        </p>
      </div>
    </div>
  );
}
