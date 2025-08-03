import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PlayerProfile from './components/PlayerProfile';
import PlayerRankings from './components/PlayerRankings';
import Dashboard from './components/Dashboard';
import Matches from './components/Matches';
import Tournaments from './components/Tournaments';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/player/:playerName" element={<PlayerProfile />} />
        <Route path="/players" element={<PlayerRankings />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/tournament/:tournamentName" element={<Tournaments />} />
      </Routes>
    </>
  );
}

export default App;
