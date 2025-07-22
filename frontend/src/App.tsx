import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PlayerProfile from './components/PlayerProfile';
import PlayerRankings from './components/PlayerRankings';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/player/:playerName" element={<PlayerProfile />} />
        <Route path="/players" element={<PlayerRankings />} />
      </Routes>
    </>
  );
}

export default App;
