import { createContext, useContext } from 'react';

export type Visibility = 'private' | 'public';

export interface PlaceReviewDraft {
  id: number;
  label: string;
  review: string;
  photo: string | null;
}

export interface LogDraft {
  stationId: number | null;
  stationName: string | null;
  logName: string;
  acquiredDate: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  review: string;
  photos: string[];
  visibility: Visibility;
  placeReviews: PlaceReviewDraft[];
  memberStampId: number | null;
}

export function getDefaultLogName(stationName: string | null) {
  return stationName ? `${stationName} 환승여행 코스` : "환승여행 코스";
}

const DEFAULT_PLACE_REVIEWS: PlaceReviewDraft[] = [
  { id: 1, label: '보문숲길도서관', review: '', photo: null },
  { id: 2, label: '보문골한옥집', review: '', photo: null },
  { id: 3, label: '코무', review: '', photo: null },
  { id: 4, label: '성북천 산책로', review: '', photo: null },
];

export const INITIAL_LOG_DRAFT: LogDraft = {
  stationId: null,
  stationName: null,
  logName: getDefaultLogName(null),
  acquiredDate: null,
  selectedDate: null,
  selectedTime: null,
  review: '',
  photos: [],
  visibility: 'private',
  placeReviews: DEFAULT_PLACE_REVIEWS,
  memberStampId: null,
};

export interface LogDraftContextValue {
  draft: LogDraft;
  setLogName: (value: string) => void;
  initializeFromStamp: (value: {
    memberStampId: number;
    stationId: number;
    stationName: string;
    acquiredDate: string;
    logName: string;
  }) => void;
  setAcquiredDate: (value: string | null) => void;
  setMemberStampId: (value: number | null) => void;
  setSelectedDate: (value: string | null) => void;
  setSelectedTime: (value: string | null) => void;
  setReview: (value: string) => void;
  setPhotos: (value: string[]) => void;
  setVisibility: (value: Visibility) => void;
  updatePlaceReview: (
    placeId: number,
    updates: Partial<Pick<PlaceReviewDraft, 'review' | 'photo'>>
  ) => void;
  isDirty: boolean;
}

export const LogDraftContext = createContext<LogDraftContextValue | null>(null);

export function useLogDraft() {
  const context = useContext(LogDraftContext);

  if (!context) {
    throw new Error('useLogDraft must be used within a LogDraftProvider');
  }

  return context;
}
