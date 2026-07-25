export interface PlaceReview {
  reviewId: number;
  writerId: number;
  writerNickname: string;
  writerProfileImageUrl: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export interface PlaceResponseItem {
  placeId: number;
  placeName: string;
  description: string;
  category: string;
  address: string;
  contactNumber: string;
  kakaoPlaceUrl: string;
  images: string[];
  reviews: PlaceReview[];
}

export interface Place {
  id: number;
  name: string;
  description: string;
  category: string;
  address: string;
  contactNumber: string;
  kakaoPlaceUrl: string;
  images: string[];
  reviews: PlaceReview[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Member_Id = 1;

// 장소 상세 조회
export async function getPlaceDetail(placeId: number): Promise<Place> {
  const response = await fetch(`${API_BASE_URL}/api/v1/places/${placeId}`, {
    headers: {
      "X-Member-Id": String(Member_Id),
    },
  });

  if (!response.ok) {
    throw new Error("장소 상세 조회 실패");
  }

  const json = await response.json();

  const item: PlaceResponseItem = json.data;

  return {
    id: item.placeId,
    name: item.placeName,
    description: item.description,
    category: item.category,
    address: item.address,
    contactNumber: item.contactNumber,
    kakaoPlaceUrl: item.kakaoPlaceUrl,
    images: item.images,
    reviews: item.reviews,
  };
}
