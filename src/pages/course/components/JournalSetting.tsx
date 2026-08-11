export default function JournalSetting({
  handleEdit,
  handleDelete,
}: {
  handleEdit: () => void;
  handleDelete: () => void;
}) {
  return (
    <div className="flex flex-col items-start w-[96px] px-5 py-4 gap-3 rounded-lg border border-white bg-white/50 shadow-[0_0_28px_0_rgba(118,118,118,0.25)]">
      <button
        className="text-body-01 font-semibold leading-[1.4] tracking-[-0.35px] text-gray-70"
        onClick={handleEdit}
      >
        수정
      </button>
      <button
        className="text-body-01 font-semibold leading-[1.4] tracking-[-0.35px] text-gray-70"
        onClick={handleDelete}
      >
        삭제
      </button>
    </div>
  );
}
