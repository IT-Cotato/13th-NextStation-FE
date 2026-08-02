import { useMemo, useState, type PropsWithChildren } from 'react';
import {
  DEFAULT_LOG_NAME,
  INITIAL_LOG_DRAFT,
  LogDraftContext,
  type LogDraft,
  type LogDraftContextValue,
  type PlaceReviewDraft,
  type Visibility,
} from './logDraft';

export function LogDraftProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState<LogDraft>(INITIAL_LOG_DRAFT);

  const value = useMemo<LogDraftContextValue>(() => {
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
      draft.logName !== DEFAULT_LOG_NAME ||
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
  }, [draft]);

  return (
    <LogDraftContext.Provider value={value}>{children}</LogDraftContext.Provider>
  );
}
