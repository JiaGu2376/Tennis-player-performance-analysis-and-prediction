import type { FC } from 'react';
import { useParams, Link } from 'react-router-dom';

const mockPlayers: Record<string, any> = {
  'Novak Djokovic': {
    name: 'Novak Djokovic',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
    rank: 1,
    winRate: 84.2,
    bio: 'Serbian professional tennis player, considered one of the greatest of all time.',
    recentMatches: [
      { opponent: 'Carlos Alcaraz', result: 'W', score: '6-3, 6-4' },
      { opponent: 'Jannik Sinner', result: 'L', score: '4-6, 6-3, 5-7' },
    ],
  },
  'Carlos Alcaraz': {
    name: 'Carlos Alcaraz',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
    rank: 2,
    winRate: 82.5,
    bio: 'Spanish tennis prodigy, youngest world No. 1 in history.',
    recentMatches: [
      { opponent: 'Novak Djokovic', result: 'L', score: '3-6, 4-6' },
      { opponent: 'Daniil Medvedev', result: 'W', score: '7-5, 6-2' },
    ],
  },
  // Add more players as needed
};

const PlayerProfile: FC = () => {
  const { playerName } = useParams<{ playerName: string }>();
  const player = playerName ? mockPlayers[decodeURIComponent(playerName)] : null;

  if (!player) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Player Not Found</h2>
        <Link to="/" className="text-green-400 hover:underline">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex items-center space-x-6 mb-6">
        <img src={player.image} alt={player.name} className="w-24 h-24 rounded-full object-cover border-4 border-green-400" />
        <div>
          <h2 className="text-3xl font-bold text-neutral-100 mb-1">{player.name}</h2>
          <div className="text-green-300 font-semibold mb-1">Rank #{player.rank}</div>
          <div className="text-neutral-300">Win Rate: <span className="font-medium">{player.winRate}%</span></div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-neutral-100 mb-2">Bio</h3>
        <p className="text-neutral-200">{player.bio}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-neutral-100 mb-2">Recent Matches</h3>
        <div className="space-y-2">
          {player.recentMatches.map((match: any, idx: number) => (
            <div key={idx} className="bg-green-900/40 p-3 rounded flex justify-between items-center">
              <span className="text-neutral-100">vs {match.opponent}</span>
              <span className={match.result === 'W' ? 'text-green-400' : 'text-red-400'}>{match.result}</span>
              <span className="text-neutral-200">{match.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile; 