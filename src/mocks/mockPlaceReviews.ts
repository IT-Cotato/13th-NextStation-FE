export interface Review {
  reviewId: number;
  writerId: number;
  writerNickname: string;
  writerProfileImageUrl: string;
  content: string;
  imageUrl: string | null;
  likeCount: number;
  isLike: boolean;
  createdAt: string;
}

export interface PlaceReviewsResponse {
  reviews: Review[];
}

export const mockPlaceReviews: PlaceReviewsResponse = {
  reviews: [
    {
      reviewId: 501,
      writerId: 1,
      writerNickname: "여행하는 토끼",
      writerProfileImageUrl:
        "https://d3mcojo3jv0dbr.cloudfront.net/2024/09/16/22/16/ab31a03112554208033909439.png",
      content: "골목이 조용해서 사진 찍기 좋았어요. 한옥 분위기가 너무 예뻐요!",
      imageUrl:
        "https://sampyo.co.kr/wp-content/uploads/2024/11/GettyImages-1025355974.jpg",
      likeCount: 11,
      isLike: false,
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
      imageUrl: null,
      likeCount: 1,
      isLike: false,
      createdAt: "2026-07-08T10:00:00",
    },
    {
      reviewId: 490,
      writerId: 3,
      writerNickname: "보문러버",
      writerProfileImageUrl:
        "https://media.bunjang.co.kr/product/382602621_1_1768910588_w%7Bres%7D.jpg",
      content:
        "보문역 코스 중 가장 기억에 남는 장소였어요, 다음에도 또 오고 싶어요!",
      imageUrl: null,
      likeCount: 7,
      isLike: true,
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
      imageUrl:
        "https://noblesse.com/shop/data/m/editor_new/2024/07/24/b31e0d3edb2feca8image1.jpg",
      likeCount: 1,
      isLike: true,
      createdAt: "2026-07-01T10:00:00",
    },
  ],
};
