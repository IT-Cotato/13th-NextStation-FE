export interface StationResponseItem {
  stationId: number;
  stationName: string;
  lines: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const normalizeLines = (lines: string[]): string[] => {
  return lines
    .map((line) => {
      const match = line.match(/^([1-9])호선$/);
      return match ? match[1] : null;
    })
    .filter((line): line is string => line !== null);
};

// 출발역 검색
export async function searchStations(keyword: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/stations?keyword=${encodeURIComponent(keyword)}`
  );

  if (!response.ok) {
    throw new Error('역 검색 요청 실패');
  }

  const json = await response.json();

  return (json.data ?? []).map((item: StationResponseItem) => ({
    id: item.stationId,
    name: item.stationName,
    lines: normalizeLines(item.lines ?? []),
  }));
}

export interface Station {
  id: number;
  name: string;
  lines: string[];
}

export interface DepartureStationResponseItem {
  id: number;
  stationId: number;
  stationName: string;
  lines: string[];
  orderNum: number;
  createdAt: string;
}

export interface DepartureStation {
  departureStationId: number;
  stationId: number;
  name: string;
  lines: string[];
}

const MEMBER_ID = 1;

// 출발역 즐겨찾기 목록 조회
export async function getDepartureStations(): Promise<DepartureStation[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/departure-stations`, {
    headers: {
      'X-Member-Id': String(MEMBER_ID),
    },
  });

  if (!response.ok) {
    throw new Error('출발역 즐겨찾기 조회 실패');
  }

  const json = await response.json();

  return (json.data ?? []).map((item: DepartureStationResponseItem) => ({
    departureStationId: item.id,
    stationId: item.stationId,
    name: item.stationName,
    lines: normalizeLines(item.lines ?? []),
  }));
}

// 출발역 즐겨찾기 추가
export async function createDepartureStation(stationId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/departure-stations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Member-Id': String(MEMBER_ID),
    },
    body: JSON.stringify({ stationId }),
  });

  if (!response.ok) {
    throw new Error('출발역 즐겨찾기 추가 실패');
  }
}

// 출발역 즐겨찾기 삭제
export async function deleteDepartureStation(departureStationId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/departure-stations/${departureStationId}`, {
    method: 'DELETE',
    headers: {
      'X-Member-Id': String(MEMBER_ID),
    },
  });

  if (!response.ok) {
    throw new Error('출발역 즐겨찾기 삭제 실패');
  }
}
