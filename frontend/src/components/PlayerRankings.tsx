import type { FC } from 'react';
import { Link } from 'react-router-dom';

const players = [
  {
    name: 'Novak Djokovic',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
    rank: 1,
    points: 12000,
    movement: 0,
  },
  {
    name: 'Carlos Alcaraz',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
    rank: 2,
    points: 9500,
    movement: 1,
  },
  {
    name: 'Jannik Sinner',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jannik_Sinner_%2852425461875%29.jpg/200px-Jannik_Sinner_%2852425461875%29.jpg',
    rank: 3,
    points: 8900,
    movement: -1,
  },
  // Add more players as needed
];

const PlayerRankings: FC = () => {
  return (
    <div className="min-h-screen w-full bg-background text-text">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-6xl font-medium mb-8 font-ttcommons">Player Rankings</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-background rounded-lg shadow-md">
            <thead>
              <tr className="text-text text-left text-xl">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">Points</th>
                <th className="py-3 px-4">Movement</th>
              </tr>
            </thead>
            <tbody>
              {players.sort((a, b) => a.rank - b.rank).map(player => (
                <tr key={player.name} className="border-b border-green-800 hover:bg-neutral-200/30 transition">
                  <td className="py-3 px-4 font-bold">{player.rank}</td>
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <img src={player.image} alt={player.name} className="w-8 h-8 rounded-full object-cover border-2 border-green-400" />
                    <Link to={`/player/${encodeURIComponent(player.name)}`} className="text-text hover:underline font-medium">{player.name}</Link>
                  </td>
                  <td className="py-3 px-4">{player.points.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {player.movement === 0 ? (
                      <span className="text-neutral-300">-</span>
                    ) : player.movement > 0 ? (
                      <span className="text-green-400">▲ {player.movement}</span>
                    ) : (
                      <span className="text-red-400">▼ {Math.abs(player.movement)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerRankings; 