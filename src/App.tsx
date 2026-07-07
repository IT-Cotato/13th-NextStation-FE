import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoadingPage from '@/pages/draw/LoadingPage';
import ResultPage from '@/pages/draw/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/draw/loading" element={<LoadingPage />} />
        <Route path="/draw/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
