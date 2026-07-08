import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoadingPage from '@/pages/draw/LoadingPage';
import ResultPage from '@/pages/draw/ResultPage';
import RecommendPage from './pages/draw/RecommendPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/draw/loading" element={<LoadingPage />} />
        <Route path="/draw/result" element={<ResultPage />} />
        <Route path="/draw/recommend" element={<RecommendPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
