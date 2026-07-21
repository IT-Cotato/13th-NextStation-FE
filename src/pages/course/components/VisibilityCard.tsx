import SelectedIcon from '@/assets/selected.svg?react';
import UnSelectedIcon from '@/assets/unselected.svg?react';

type VisibilityType = 'private' | 'public';

interface VisibilityCardProps {
  type: VisibilityType;
  selected: boolean;
  onClick?: () => void;
}

const visibilityContent = {
  private: {
    title: '나만 보기',
    description: '내 여행 다이어리에만 저장돼요.',
  },
  public: {
    title: '전체 공개',
    description: '다른 환승여행 사용자들이 볼 수 있어요.',
  },
} satisfies Record<VisibilityType, { title: string; description: string }>;

export default function VisibilityCard({
  type,
  selected,
  onClick,
}: VisibilityCardProps) {
  const { title, description } = visibilityContent[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-[360px] rounded-lg items-center justify-between px-5 py-3 text-left outline-none ${
        selected ? 'border border-primary-50 bg-secondary-10' : 'bg-white'
      }`}
    >
      <div className="flex flex-col items-start justify-center gap-1">
        <p className="text-subtitle-02 font-semibold text-gray-100 leading-[1.4] tracking-[-0.025em]">
          {title}
        </p>
        <p className="text-body-01 text-gray-70 leading-[1.4] tracking-[-0.025em]">
          {description}
        </p>
      </div>
      {selected ? (
        <SelectedIcon className='size-5 shrink-0' />
      ): (
        <UnSelectedIcon className='size-5 shrink-0' />
      )}
    </button>
  )
}