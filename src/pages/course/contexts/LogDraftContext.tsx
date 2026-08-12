/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

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
  tags: string[];
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
  return stationName ? `${stationName} 환승여행 코스` : '환승여행 코스';
}

export const INITIAL_LOG_DRAFT: LogDraft = {
  stationId: null,
  stationName: null,
  logName: getDefaultLogName(null),
  tags: [],
  acquiredDate: null,
  selectedDate: null,
  selectedTime: null,
  review: '',
  photos: [],
  visibility: 'private',
  placeReviews: [],
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
    tags: string[];
    placeReviews: PlaceReviewDraft[];
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

export function LogDraftProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState<LogDraft>(INITIAL_LOG_DRAFT);
  const [initialLogName, setInitialLogName] = useState(
    INITIAL_LOG_DRAFT.logName,
  );

  const value = useMemo<LogDraftContextValue>(() => {
    const initializeFromStamp = ({
      memberStampId,
      stationId,
      stationName,
      acquiredDate,
      logName,
      tags,
      placeReviews,
    }: {
      memberStampId: number;
      stationId: number;
      stationName: string;
      acquiredDate: string;
      logName: string;
      tags: string[];
      placeReviews: PlaceReviewDraft[];
    }) => {
      setInitialLogName(logName);
      setDraft({
        ...INITIAL_LOG_DRAFT,
        memberStampId,
        stationId,
        stationName,
        acquiredDate,
        logName,
        tags,
        placeReviews,
      });
    };

    const setLogName = (value: string) => {
      setDraft((prev) => ({ ...prev, logName: value }));
    };

    const setAcquiredDate = (value: string | null) => {
      setDraft((prev) => ({ ...prev, acquiredDate: value }));
    };

    const setMemberStampId = (value: number | null) => {
      setDraft((prev) => ({ ...prev, memberStampId: value }));
    };

    const setSelectedDate = (value: string | null) => {
      setDraft((prev) => ({ ...prev, selectedDate: value }));
    };

    const setSelectedTime = (value: string | null) => {
      setDraft((prev) => ({ ...prev, selectedTime: value }));
    };

    const setReview = (value: string) => {
      setDraft((prev) => ({ ...prev, review: value }));
    };

    const setPhotos = (value: string[]) => {
      setDraft((prev) => ({ ...prev, photos: value }));
    };

    const setVisibility = (value: Visibility) => {
      setDraft((prev) => ({ ...prev, visibility: value }));
    };

    const updatePlaceReview = (
      placeId: number,
      updates: Partial<Pick<PlaceReviewDraft, 'review' | 'photo'>>
    ) => {
      setDraft((prev) => ({
        ...prev,
        placeReviews: prev.placeReviews.map((place) =>
          place.id === placeId ? { ...place, ...updates } : place
        ),
      }));
    };

    const isDirty =
      draft.logName !== initialLogName ||
      draft.selectedDate !== null ||
      draft.selectedTime !== null ||
      draft.review.trim() !== '' ||
      draft.photos.length > 0 ||
      draft.visibility !== 'private' ||
      draft.placeReviews.some(
        (place) => place.review.trim() !== '' || place.photo !== null
      );

    return {
      draft,
      initializeFromStamp,
      setLogName,
      setAcquiredDate,
      setMemberStampId,
      setSelectedDate,
      setSelectedTime,
      setReview,
      setPhotos,
      setVisibility,
      updatePlaceReview,
      isDirty,
    };
  }, [draft, initialLogName]);

  return (
    <LogDraftContext.Provider value={value}>{children}</LogDraftContext.Provider>
  );
}
