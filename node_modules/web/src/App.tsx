import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingLayout from './layouts/LandingLayout';
import LandingPage from './pages/LandingPage';
import GameMapPage from './pages/GameMapPage';
import HousePage from './pages/HousePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        
        {/* En el futuro GameLayout envolverá esto */}
        <Route path="/game/map" element={<GameMapPage />} />
        <Route path="/game/house" element={<HousePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
