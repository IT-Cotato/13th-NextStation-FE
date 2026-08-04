import type { LikedCourse } from "@/api/member";

export const mockLikedCourses: LikedCourse[] = [
  {
    courseId: 1,
    name: "민성이랑 떠나는 신림 느좋투어 갈 이 떠날래?",
    stationId: 2,
    stationName: "신림역",
    line: {
      id: 2,
      name: "2호선",
      code: "LINE_2",
    },
  },
  {
    courseId: 2,
    name: "보문역 환승여행 코스",
    stationId: 6,
    stationName: "보문역",
    line: {
      id: 6,
      name: "6호선",
      code: "LINE_6",
    },
  },
  {
    courseId: 3,
    name: "친구랑 잠실나루 코스",
    stationId: 2,
    stationName: "잠실나루역",
    line: {
      id: 2,
      name: "2호선",
      code: "LINE_2",
    },
  },
  {
    courseId: 4,
    name: "혼자 걷는 신설동 코스",
    stationId: 1,
    stationName: "신설동역",
    line: {
      id: 1,
      name: "1호선",
      code: "LINE_1",
    },
  },
  {
    courseId: 5,
    name: "학교 끝나고 둘러보는 수유 코스",
    stationId: 4,
    stationName: "수유역",
    line: {
      id: 4,
      name: "4호선",
      code: "LINE_4",
    },
  },
  {
    courseId: 6,
    name: "아이랑 어린이대공원 코스",
    stationId: 7,
    stationName: "어린이대공원역",
    line: {
      id: 7,
      name: "7호선",
      code: "LINE_7",
    },
  },
];
