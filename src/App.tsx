import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/auth/LoginPage';
import WelcomePage from '@/pages/auth/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<WelcomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
