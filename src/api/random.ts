import type { SubwayLine } from "@/types/subway";
export interface RandomStationLineResponse {
  id: SubwayLine;
  name: string;
  code: string;
}

export interface RandomStationResponse {
  stationId: number;
  stationName: string;
  description: string;
  todos: string[];
  lines: RandomStationLineResponse[];
}

export interface RandomCoursePlaceResponse {
  placeId: number;
  placeName: string;
  description: string;
  categoryCode: string;
  categoryName: string;
  imageUrl: string | null;
  xCoordinate: number;
  yCoordinate: number;
}

export interface RandomCourseResponse {
  name: string;
  places: RandomCoursePlaceResponse[];
}

export interface RandomDrawResponseData {
  station: RandomStationResponse;
  course: RandomCourseResponse;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MEMBER_ID = 1;

export class RandomDrawNotFoundError extends Error {
  constructor(message = "뽑기 대상 역이 없음") {
    super(message);
    this.name = "RandomDrawNotFoundError";
  }
}

export async function drawRandomStation(): Promise<RandomDrawResponseData> {
  const response = await fetch(`${API_BASE_URL}/api/v1/random`, {
    method: "POST",
    headers: {
      "X-Member-Id": String(MEMBER_ID),
    },
  });

  if (response.status === 404) {
    throw new RandomDrawNotFoundError();
  }

  if (!response.ok) {
    throw new Error("랜덤 뽑기 실패");
  }

  const json = await response.json();
  const data = json.data;

  return {
    station: {
      stationId: data.station.stationId,
      stationName: data.station.stationName,
      description: data.station.description,
      todos: data.station.todos ?? [],
      lines: (data.station.lines ?? []).map((line: RandomStationLineResponse) => ({
        id: line.id,
        name: line.name,
        code: line.code,
      })),
    },
    course: {
      name: data.course.name,
      places: (data.course.places ?? []).map((place: RandomCoursePlaceResponse) => ({
        placeId: place.placeId,
        placeName: place.placeName,
        description: place.description,
        categoryCode: place.categoryCode,
        categoryName: place.categoryName,
        imageUrl: place.imageUrl,
        xCoordinate: place.xCoordinate,
        yCoordinate: place.yCoordinate,
      })),
    },
  };
}
