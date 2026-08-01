import BackIcon from '@/assets/back.svg?react';
import MoreIcon from '@/assets/like/more.svg?react';
import CTAButton from '@/components/CTAButton';
import ConfirmModal from '@/components/ConfirmModal';
import SelectDropdown from './components/SelectDropdown';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SubwayLine } from '@/components/LineBadge';
import LikeCard from './components/LikeCard';
import {
  deleteAllLikedCourses,
  deleteLikedCourses,
  getLikedCourses,
  type LikedCourse,
} from '@/api/member';
import { mockLikedCourses } from '@/mocks/mockLikedCourses';


function LikePage() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isAllSelectedMode, setIsAllSelectedMode] = useState(false);
  const [isUnlikeConfirmOpen, setIsUnlikeConfirmOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [excludedIds, setExcludedIds] = useState<number[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [likedCourses, setLikedCourses] = useState<LikedCourse[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingUnlike, setIsSubmittingUnlike] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDev = import.meta.env.DEV;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleToggleSelect = (courseId: number) => {
    if (isAllSelectedMode) {
      setExcludedIds((prev) =>
        prev.includes(courseId)
          ? prev.filter((id) => id !== courseId)
          : [...prev, courseId],
      );
      return;
    }

    setSelectedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const handleToggleSelectAll = () => {
    if (isAllSelectedMode) {
      setIsAllSelectedMode(false);
      setSelectedIds([]);
      setExcludedIds([]);
      return;
    }

    setIsAllSelectedMode(true);
    setSelectedIds([]);
    setExcludedIds([]);
  };

  const handleConfirmUnlike = async () => {
    try {
      setIsSubmittingUnlike(true);

      if (isAllSelectedMode) {
        await deleteAllLikedCourses(excludedIds);
        setLikedCourses((prev) =>
          prev.filter((course) => excludedIds.includes(course.courseId)),
        );
        setNextCursor(null);
        setHasNext(false);
      } else {
        await deleteLikedCourses(selectedIds);
        setLikedCourses((prev) =>
          prev.filter((course) => !selectedIds.includes(course.courseId)),
        );
      }

      setSelectedIds([]);
      setExcludedIds([]);
      setIsAllSelectedMode(false);
      setIsSelectMode(false);
      setIsUnlikeConfirmOpen(false);
      setError(null);
    } catch {
      setIsUnlikeConfirmOpen(false);
    } finally {
      setIsSubmittingUnlike(false);
    }
  };

  useEffect(() => {
    const fetchInitialCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getLikedCourses();

        if (isDev && data.courses.length === 0) {
          setLikedCourses(mockLikedCourses);
          setNextCursor(null);
          setHasNext(false);
          return;
        }

        setLikedCourses(data.courses);
        setNextCursor(data.nextCursor);
        setHasNext(data.hasNext);
      } catch {
        if (isDev) {
          setLikedCourses(mockLikedCourses);
          setNextCursor(null);
          setHasNext(false);
          setError(null);
          return;
        }

        setError('좋아요한 코스 목록을 불러오지 못했어요.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchInitialCourses();
  }, [isDev]);

  useEffect(() => {
    if (!loadMoreRef.current || !nextCursor || !hasNext) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting || isLoading) return;

        const fetchMoreCourses = async () => {
          try {
            setIsLoading(true);

            const data = await getLikedCourses(nextCursor);

            setLikedCourses((prev) => [...prev, ...data.courses]);
            setNextCursor(data.nextCursor);
            setHasNext(data.hasNext);
          } catch {
            setError('좋아요한 코스 목록을 더 불러오지 못했어요.');
          } finally {
            setIsLoading(false);
          }
        };

        void fetchMoreCourses();
      },
      {
        root: null,
        rootMargin: '120px',
        threshold: 0,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNext, nextCursor, isLoading]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isDropdownOpen]);

  const renderContent = () => {
    if (error && likedCourses.length === 0) {
      return (
        <section className="w-full px-4 py-6">
          <p className="text-body-02 text-gray-60">{error}</p>
        </section>
      );
    }

    if (!isLoading && likedCourses.length === 0) {
      return (
        <section className="w-full px-4 py-6">
          <p className="text-body-02 text-gray-60">
            아직 좋아요한 코스가 없어요.
          </p>
        </section>
      );
    }

    return (
      <>
        <section className="w-full grid grid-cols-3 gap-[5px] p-4">
          {likedCourses.map((course) => (
            <LikeCard
              key={course.courseId}
              courseId={course.courseId}
              courseName={course.name}
              stationName={course.stationName}
              lineId={course.line.id as SubwayLine}
              isSelectMode={isSelectMode}
              isSelected={
                isAllSelectedMode
                  ? !excludedIds.includes(course.courseId)
                  : selectedIds.includes(course.courseId)
              }
              onToggleSelect={() => handleToggleSelect(course.courseId)}
            />
          ))}
        </section>

        {error ? (
          <section className="w-full px-4 pb-4">
            <p className="text-body-02 text-gray-60">{error}</p>
          </section>
        ) : null}

        {isLoading ? (
          <section className="w-full px-4 pb-4">
            <p className="text-body-02 text-gray-60">불러오는 중...</p>
          </section>
        ) : null}

        <div ref={loadMoreRef} className="h-10 w-full" />
      </>
    );
  };

  return (
    <main className="flex flex-col h-dvh overflow-y-auto bg-gray-10 items-center pt-[var(--safe-top)] pb-[calc(var(--safe-bottom)+140px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <header className="grid w-full h-[50px] grid-cols-[40px_1fr_40px] items-center px-3">
        <div className='flex items-center justify-start'>
          <button
          type="button"
          onClick={handleBackClick}
          aria-label='뒤로가기'
          className="flex size-6 items-center justify-center outline-none"
        >
          <BackIcon className='size-6' />
        </button>
        </div>

        <div className='flex min-w-0 items-center justify-center'>
          <h3 className='text-title-02 font-semibold leading-none tracking-[-0.025em] text-center'>
            좋아요
          </h3>
        </div>

        <div ref={dropdownRef} className='relative flex items-center justify-end'>
          {isSelectMode ? (
            <button
              type="button"
              onClick={handleToggleSelectAll}
              className="whitespace-nowrap text-subtitle font-semibold text-gray-90 leading-[1.4] tracking-[-0.025em] outline-none"
            >
              모두 선택
            </button>
          ) : (
            <>
              <button
                type="button"
                aria-label='더보기'
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex size-6 items-center justify-center outline-none"
              >
                <MoreIcon className='size-6' />
              </button>

              {isDropdownOpen && (
                <SelectDropdown
                  onSelect={() => {
                    setIsSelectMode(true);
                    setIsAllSelectedMode(false);
                    setSelectedIds([]);
                    setExcludedIds([]);
                    setIsDropdownOpen(false);
                  }}
                />
              )}
            </>
          )}
        </div>
      </header>

      {isUnlikeConfirmOpen && (
        <ConfirmModal
          message={"게시물 좋아요를 취소하시나요?"}
          onClose={() => setIsUnlikeConfirmOpen(false)}
          onConfirm={handleConfirmUnlike}
        />
      )}

      {renderContent()}

      {isSelectMode && (
        <section className="absolute bottom-[calc(var(--safe-bottom)+10px)] z-10 flex w-full items-center justify-center">
          <CTAButton
            disabled={
              isSubmittingUnlike ||
              (isAllSelectedMode
                ? (!hasNext && excludedIds.length === likedCourses.length)
                : selectedIds.length === 0)
            }
            onClick={() => setIsUnlikeConfirmOpen(true)}
          >
            좋아요 취소
          </CTAButton>
        </section>
      )}
    </main>
  )
}

export default LikePage
