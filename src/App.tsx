import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoadingPage from '@/pages/draw/LoadingPage';
import ResultPage from '@/pages/draw/ResultPage';
import RecommendPage from './pages/draw/RecommendPage';
import ConditionPage from './pages/draw/ConditionPage';
import PreferencePage from './pages/draw/PreferencePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/draw/loading" element={<LoadingPage />} />
        <Route path="/draw/result" element={<ResultPage />} />
        <Route path="/draw/recommend" element={<RecommendPage />} />
        <Route path="/draw/condition" element={<ConditionPage />} />
        <Route path="/draw/preference" element={<PreferencePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
