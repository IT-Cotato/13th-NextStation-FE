import Line1Icon from '@/assets/subway/line-1.svg?react';
import Line2Icon from '@/assets/subway/line-2.svg?react';
import Line3Icon from '@/assets/subway/line-3.svg?react';
import Line4Icon from '@/assets/subway/line-4.svg?react';
import Line5Icon from '@/assets/subway/line-5.svg?react';
import Line6Icon from '@/assets/subway/line-6.svg?react';
import Line7Icon from '@/assets/subway/line-7.svg?react';
import Line8Icon from '@/assets/subway/line-8.svg?react';
import Line9Icon from '@/assets/subway/line-9.svg?react';

const lineIconMap = {
  '1': Line1Icon,
  '2': Line2Icon,
  '3': Line3Icon,
  '4': Line4Icon,
  '5': Line5Icon,
  '6': Line6Icon,
  '7': Line7Icon,
  '8': Line8Icon,
  '9': Line9Icon,
} as const

export default function LineBadge({ line }: { line: string }) {
  const Icon = lineIconMap[line as keyof typeof lineIconMap]

  if (!Icon) return null

  return <Icon className="size-4" />
}