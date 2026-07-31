export interface PlaceReview {
  reviewId: number;
  writerId: number;
  writerNickname: string;
  writerProfileImageUrl: string;
  content: string;
  imageUrls: string[];
  createdAt: string;
}

export interface PlaceDetail {
  placeId: number;
  line: string;
  name: string;
  description: string;
  category: string;
  address: string;
  contactNumber: string;
  kakaoPlaceUrl: string;
  images: string[];
  reviews: PlaceReview[];
}

export const mockPlaceDetail: PlaceDetail = {
  placeId: 10,
  line: "6",
  name: "보문골한옥집",
  description: "한옥 분위기를 느낄 수 있는 따뜻한 공간",
  category: "식당",
  address: "서울 성북구 보문로 34길 12-3",
  contactNumber: "02-1234-5678",
  kakaoPlaceUrl: "https://place.map.kakao.com/9820479",
  images: [
    "https://cdn.animaltoday.co.kr/news/photo/202508/1723_2629_2641.jpeg",
    "https://t3.ftcdn.net/jpg/19/60/72/78/360_F_1960727844_zWgOJ0uuA2Xo9ihtbRjGnx1wn0gsqwRj.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJmb2vxGVzVI4iwKN-F9da_ee5O2djGArCR809PFo5gNIXbNvsb3MBNIQ&s=10",
  ],
  reviews: [
    {
      reviewId: 501,
      writerId: 1,
      writerNickname: "여행하는 토끼",
      writerProfileImageUrl:
        "https://d3mcojo3jv0dbr.cloudfront.net/2024/09/16/22/16/ab31a03112554208033909439.png",
      content: "골목이 조용해서 사진 찍기 좋았어요. 한옥 분위기가 너무 예뻐요!",
      imageUrls: ["https://s3.../example/1.jpg"],
      createdAt: "2026-07-08T10:00:00",
    },
    {
      reviewId: 498,
      writerId: 2,
      writerNickname: "산책좋아",
      writerProfileImageUrl:
        "https://i.pinimg.com/236x/9e/2d/d7/9e2dd7928c896b4aee2636f4274bd79a.jpg",
      content:
        "한옥 분위기가 따뜻해서 잠깐 머무르기 좋아요. 음식도 깔끔하고 맛있었어요.",
      imageUrls: [],
      createdAt: "2026-07-06T14:20:00",
    },
    {
      reviewId: 490,
      writerId: 3,
      writerNickname: "보문러버",
      writerProfileImageUrl:
        "https://media.bunjang.co.kr/product/382602621_1_1768910588_w%7Bres%7D.jpg",
      content:
        "보문역 코스 중 가장 기억에 남는 장소였어요, 다음에도 또 오고 싶어요!",
      imageUrls: ["https://s3.../example/2.jpg"],
      createdAt: "2026-06-20T09:00:00",
    },
    {
      reviewId: 489,
      writerId: 4,
      writerNickname: "식도락가",
      writerProfileImageUrl:
        "https://i.pinimg.com/236x/e4/b2/63/e4b2630d9dfc953681156b05899e32aa.jpg",
      content:
        "고즈넉한 한옥 분위기 속에서 힐링하고 왔습니다. 주차 공간도 생각보다 여유로워서 편하게 이용했어요. 재방문 의사 100%입니다!",
      imageUrls: ["https://s3.../example/3.jpg", "https://s3.../example/4.jpg"],
      createdAt: "2026-07-01T10:00:00",
    },
  ],
};
