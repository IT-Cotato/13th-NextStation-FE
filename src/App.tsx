import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import FinishPage from '@/pages/auth/FinishPage';
import LoginPage from '@/pages/auth/LoginPage';
import PasswordFindPage from '@/pages/auth/PasswordFindPage';
import PasswordResetPage from '@/pages/auth/PasswordResetPage';
import ProfileSetupPage from '@/pages/auth/ProfileSetupPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import WelcomePage from '@/pages/auth/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<WelcomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/find" element={<PasswordFindPage />} />
        <Route path="/auth/reset-password" element={<PasswordResetPage />} />
        <Route path="/auth/profile" element={<ProfileSetupPage />} />
        <Route path="/auth/finish" element={<FinishPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
