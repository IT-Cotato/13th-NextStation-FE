const TAG_LABELS: Record<string, string> = {
  NATURE: "자연과함께",
  ALLEY_TRIP: "골목여행",
  MARKET: "시장구경",
  HOTPLACE: "핫플레이스",
  PHOTO_SPOT: "사진찍기좋은",
  SHOPPING: "쇼핑",
  EXPERIENCE: "체험",
  BUDGET: "가성비",
  INDOOR: "실내위주",
};

export function formatExploreTag(tag: string): string {
  const normalizedTag = tag.startsWith("#") ? tag.slice(1) : tag;
  return `#${TAG_LABELS[normalizedTag] ?? normalizedTag}`;
}
