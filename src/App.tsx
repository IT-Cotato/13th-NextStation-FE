import { Component, lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogDraftProvider } from "@/pages/course/contexts/LogDraftContext";
import "react-toastify/dist/ReactToastify.css";
import Toast from "@/pages/course/components/Toast";

const MainPage = lazy(() => import("@/pages/MainPage"));

// auth pages
const FinishPage = lazy(() => import("@/pages/auth/FinishPage"));
const KakaoCallbackPage = lazy(() => import("@/pages/auth/KakaoCallbackPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const PasswordResetPage = lazy(() => import("@/pages/auth/PasswordResetPage"));
const ProfileSetupPage = lazy(() => import("@/pages/auth/ProfileSetupPage"));
const SignUpPage = lazy(() => import("@/pages/auth/SignUpPage"));
const TermsAgreementPage = lazy(
  () => import("@/pages/auth/TermsAgreementPage"),
);
const WelcomePage = lazy(() => import("@/pages/auth/WelcomePage"));

// draw pages
const ConditionPage = lazy(() => import("@/pages/draw/ConditionPage"));
const LoadingPage = lazy(() => import("@/pages/draw/LoadingPage"));
const PreferencePage = lazy(() => import("@/pages/draw/PreferencePage"));
const RecommendPage = lazy(() => import("@/pages/draw/RecommendPage"));
const ResultPage = lazy(() => import("@/pages/draw/ResultPage"));

// course pages
const CourseMainPage = lazy(() => import("@/pages/course/MainPage"));
const CourseDetailPage = lazy(() => import("@/pages/course/DetailPage"));
const CreatePage = lazy(() => import("@/pages/course/CreatePage"));
const LogIntroPage = lazy(() => import("@/pages/course/LogIntroPage"));
const LogInfoPage = lazy(() => import("@/pages/course/LogInfoPage"));
const LogPlacePage = lazy(() => import("@/pages/course/LogPlacePage"));
const LogVisibilityPage = lazy(
  () => import("@/pages/course/LogVisibilityPage"),
);
const LikePage = lazy(() => import("@/pages/course/LikePage"));
const SavedPage = lazy(() => import("@/pages/course/SavedPage"));
const StampAcquiredPage = lazy(
  () => import("@/pages/course/StampAcquiredPage"),
);
const VerifyPage = lazy(() => import("@/pages/course/VerifyPage"));

// explore pages
const ExplorePage = lazy(() => import("@/pages/explore/ExplorePage"));
const PopularCoursesPage = lazy(
  () => import("@/pages/explore/PopularCoursesPage"),
);
const ConceptToursPage = lazy(() => import("@/pages/explore/ConceptToursPage"));
const ConceptDetailPage = lazy(
  () => import("@/pages/explore/ConceptDetailPage"),
);
const SearchResultsPage = lazy(
  () => import("@/pages/explore/SearchResultsPage"),
);
const LineCoursesPage = lazy(() => import("@/pages/explore/LineCoursesPage"));

// place pages
const DetailPage = lazy(() => import("./pages/place/DetailPage"));
const ReviewListPage = lazy(() => import("./pages/place/ReviewListPage"));

function RouteFallback() {
  return (
    <main className="flex h-dvh items-center justify-center bg-gray-10 text-body-01 text-gray-70">
      로딩 중...
    </main>
  );
}

// mypage
const MyPage = lazy(() => import("@/pages/mypage/MyPage"));
const ProfileEditPage = lazy(() => import("@/pages/mypage/ProfileEditPage"));
const UnwrittenJournalListPage = lazy(
  () => import("@/pages/mypage/UnwrittenJournalListPage"),
);

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
}

class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  state: RouteErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex h-dvh flex-col items-center justify-center gap-4 bg-gray-10 px-6 text-center">
          <div className="flex flex-col gap-2">
            <p className="text-title-02 font-semibold text-gray-100">
              페이지를 불러오지 못했어요
            </p>
            <p className="text-body-02 text-gray-70">
              네트워크 상태를 확인한 뒤 다시 시도해주세요.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-primary-50 px-5 py-3 text-body-01 text-white"
          >
            새로고침
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <LogDraftProvider>
      <BrowserRouter>
        <RouteErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<MainPage />} />

              {/* auth */}
              <Route path="/auth" element={<WelcomePage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route
                path="/auth/kakao/callback"
                element={<KakaoCallbackPage />}
              />
              <Route path="/auth/sign-up" element={<SignUpPage />} />
              <Route path="/auth/terms" element={<TermsAgreementPage />} />
              <Route
                path="/auth/reset-password"
                element={<PasswordResetPage />}
              />
              <Route path="/auth/profile" element={<ProfileSetupPage />} />
              <Route path="/auth/finish" element={<FinishPage />} />

              {/* draw */}
              <Route path="/draw/loading" element={<LoadingPage />} />
              <Route path="/draw/result" element={<ResultPage />} />
              <Route path="/draw/recommend" element={<RecommendPage />} />
              <Route path="/draw/condition" element={<ConditionPage />} />
              <Route path="/draw/preference" element={<PreferencePage />} />

              {/* course */}
              <Route path="/course" element={<CourseMainPage />} />
              <Route path="/course/like" element={<LikePage />} />
              <Route
                path="/course/:stationId/create"
                element={<CreatePage />}
              />
              <Route
                path="/course/:courseId?/verify"
                element={<VerifyPage />}
              />
              <Route path="/course/saved" element={<SavedPage />} />
              <Route path="/course/:courseId" element={<CourseDetailPage />} />
              <Route
                path="/course/:courseId/stamp"
                element={<StampAcquiredPage />}
              />
              <Route path="/course/:courseId/log" element={<LogIntroPage />} />
              <Route
                path="/course/:courseId/log/info"
                element={<LogInfoPage />}
              />
              <Route
                path="/course/:courseId/log/place"
                element={<LogPlacePage />}
              />
              <Route
                path="/course/:courseId/log/visibility"
                element={<LogVisibilityPage />}
              />

              {/* explore */}
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/explore/popular" element={<PopularCoursesPage />} />
              <Route path="/explore/concepts" element={<ConceptToursPage />} />
              <Route
                path="/explore/concepts/:conceptId"
                element={<ConceptDetailPage />}
              />
              <Route path="/explore/search" element={<SearchResultsPage />} />
              <Route path="/explore/lines" element={<LineCoursesPage />} />

              {/* place */}
              <Route path="/place/:placeId" element={<DetailPage />} />
              <Route
                path="/place/:placeId/reviews"
                element={<ReviewListPage />}
              />

              {/* mypage */}
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/edit" element={<ProfileEditPage />} />
              <Route
                path="/mypage/journal/unwritten"
                element={<UnwrittenJournalListPage />}
              />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>

        <Toast />
      </BrowserRouter>
    </LogDraftProvider>
  );
}

export default App;
