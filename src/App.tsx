import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "@/pages/MainPage";

// auth
import FinishPage from "@/pages/auth/FinishPage";
import LoginPage from "@/pages/auth/LoginPage";
import KakaoCallbackPage from "@/pages/auth/KakaoCallbackPage";
import PasswordResetPage from "@/pages/auth/PasswordResetPage";
import ProfileSetupPage from "@/pages/auth/ProfileSetupPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import TermsAgreementPage from "@/pages/auth/TermsAgreementPage";
import WelcomePage from "@/pages/auth/WelcomePage";

// draw
import LoadingPage from "@/pages/draw/LoadingPage";
import ResultPage from "@/pages/draw/ResultPage";
import RecommendPage from "@/pages/draw/RecommendPage";
import ConditionPage from "@/pages/draw/ConditionPage";
import PreferencePage from "@/pages/draw/PreferencePage";

// course
import CourseMainPage from "@/pages/course/MainPage";
import CourseVerifyPage from "@/pages/course/VerifyPage";
import SavedPage from "@/pages/course/SavedPage";
import CreatePage from "@/pages/course/CreatePage";
import LogIntroPage from "@/pages/course/LogIntroPage";
import LogInfoPage from "@/pages/course/LogInfoPage";
import LogPlacePage from "@/pages/course/LogPlacePage";
import LogVisibilityPage from "@/pages/course/LogVisibilityPage";
import StampAcquiredPage from "@/pages/course/StampAcquiredPage";
import { LogDraftProvider } from "@/pages/course/contexts/LogDraftContext";

// toast
import "react-toastify/dist/ReactToastify.css";
import Toast from "@/pages/course/components/Toast";

function App() {
  return (
    <LogDraftProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />

          {/* auth */}
          <Route path="/auth" element={<WelcomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/kakao/callback" element={<KakaoCallbackPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/terms" element={<TermsAgreementPage />} />
          <Route path="/auth/reset-password" element={<PasswordResetPage />} />
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
          <Route path="/course/create" element={<CreatePage />} />
          <Route path="/course/verify" element={<CourseVerifyPage />} />
          <Route path="/course/saved" element={<SavedPage />} />
          <Route
            path="/course/:courseId/stamp"
            element={<StampAcquiredPage />}
          />
          <Route
            path="/course/:courseId/log"
            element={<LogIntroPage />}
          />
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
        </Routes>

        <Toast />
      </BrowserRouter>
    </LogDraftProvider>
  );
}

export default App;
