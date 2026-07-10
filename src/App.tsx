import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import WelcomePage from '@/pages/auth/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
