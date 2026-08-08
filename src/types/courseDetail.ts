import type { SubwayLine } from "@/types/subway";

export interface CourseDetailImage {
  id: number;
  src: string;
  alt: string;
}

export interface CourseDetailPlaceData {
  id: number;
  name: string;
  description: string;
  imageUrl?: string | null;
  imagePosition: "left" | "right";
}

export interface CourseDetailData {
  id: number;
  line: SubwayLine;
  stationName: string;
  title: string;
  subtitle: string;
  viewCount: number;
  saveCount: number;
  authorName: string;
  authorId?: number;
  authorProfileImageUrl?: string | null;
  visitedAt: string;
  isMine?: boolean;
  isLiked?: boolean;
  review: string;
  duration: string;
  tags: string[];
  images: CourseDetailImage[];
  places: CourseDetailPlaceData[];
}
