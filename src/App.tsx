import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoadingPage from '@/pages/draw/LoadingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/draw/loading" element={<LoadingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
