import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingLayout from './layouts/LandingLayout';
import HomePage from './landing/pages/HomePage';
import GameMapPage from './pages/GameMapPage';
import HousePage from './pages/HousePage';
import PlayerCreationModal from './modules/profile/components/PlayerCreationModal';

function AppContent() {
  const navigate = useNavigate();
  const [showCreation, setShowCreation] = useState(false);

  useEffect(() => {
    const handleStartGame = () => setShowCreation(true);
    window.addEventListener('start-game', handleStartGame);
    return () => window.removeEventListener('start-game', handleStartGame);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        
        {/* En el futuro GameLayout envolverá esto */}
        <Route path="/game/map" element={<GameMapPage />} />
        <Route path="/game/house" element={<HousePage />} />
      </Routes>

      {showCreation && (
        <PlayerCreationModal onComplete={() => {
          setShowCreation(false);
          navigate('/game/map');
        }} />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
