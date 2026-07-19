function StampAcquiredPage() {
  return (
     <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 items-center justify-center pt-[var(--safe-top)] gap-20">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-headline font-semibold text-gray-90 leading-[1.4] tracking-[-0.025em] text-center">
          00역 스탬프 획득!
        </h1>
        <p className="text-body-01 text-gray-70 leading-[1.4] tracking-[-0.025em] text center">
          오늘의 환승여행이 내 기록에 저장되었어요
        </p>
      </div>
      
      <div className="w-[250px] h-[250px]">
        {/* 스탬프 아이콘 */}
      </div>

    </main>
  )
}

export default StampAcquiredPage