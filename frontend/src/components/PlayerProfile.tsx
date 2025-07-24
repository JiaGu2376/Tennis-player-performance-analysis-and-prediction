import type { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const mockPlayers: Record<string, any> = {
  'Novak Djokovic': {
    name: 'Novak Djokovic',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
    rank: 1,
    winRate: 84.2,
    bio: 'Serbian professional tennis player, considered one of the greatest of all time.',
    recentMatches: [
      { opponent: 'Carlos Alcaraz', result: 'W', score: '6-3, 6-4', tournament: 'Indian Wells', date: '2024-03-17T00:00:00Z' },
      { opponent: 'Jannik Sinner', result: 'L', score: '4-6, 6-3, 5-7', tournament: 'Australian Open', date: '2024-01-28T00:00:00Z' },
    ],
  },
  'Carlos Alcaraz': {
    name: 'Carlos Alcaraz',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
    rank: 2,
    winRate: 82.5,
    bio: 'Spanish tennis prodigy, youngest world No. 1 in history.',
    recentMatches: [
      { opponent: 'Novak Djokovic', result: 'L', score: '3-6, 4-6', tournament: 'Indian Wells', date: '2024-03-17T00:00:00Z' },
      { opponent: 'Daniil Medvedev', result: 'W', score: '7-5, 6-2', tournament: 'Miami Open', date: '2024-03-21T00:00:00Z' },
    ],
  },
  // Add more players as needed
};

const tournamentDescriptions: Record<string, { description: string; level: string }> = {
  'Indian Wells': {
    description: 'The Indian Wells Masters, also known as the BNP Paribas Open, is an annual tennis tournament held in Indian Wells, California. It is one of the most prestigious events outside the Grand Slams.',
    level: 'Masters 1000',
  },
  'Australian Open': {
    description: 'The Australian Open is the first of the four Grand Slam tennis tournaments held each year, taking place in Melbourne, Australia.',
    level: 'Grand Slam',
  },
  'Miami Open': {
    description: 'The Miami Open is a professional tennis tournament held in Miami, Florida, and is part of the ATP Tour Masters 1000 and WTA 1000 events.',
    level: 'Masters 1000',
  },
};

const PlayerProfile: FC = () => {
  const { playerName } = useParams<{ playerName: string }>();
  const player = playerName ? mockPlayers[decodeURIComponent(playerName)] : null;
  const [tournamentPopup, setTournamentPopup] = useState<string | null>(null);

  if (!player) {
    return (
      <div className="min-h-screen w-full bg-background text-text flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Player Not Found</h2>
          <Link to="/" className="text-green-400 hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background text-text">
      <div className="max-w-2xl mx-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => window.location.href = '/players'}
            className="bg-green-700 hover:bg-green-600 text-neutral-100 px-4 py-2 rounded font-medium shadow transition"
          >
            ← Back to Player Rankings
          </button>
        </div>
        <div className="flex items-center space-x-6 mb-6">
          <img src={player.image} alt={player.name} className="w-24 h-24 rounded-full object-cover border-4 border-green-400" />
          <div>
            <h2 className="text-5xl font-medium mb-1 font-ttcommons">{player.name}</h2>
            <div className="mb-1">Rank #{player.rank}</div>
            <div className="">Win Rate: <span className="font-medium">{player.winRate}%</span></div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Bio</h3>
          <p className="text-text">{player.bio}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Recent Matches</h3>
          <div className="space-y-2">
            {player.recentMatches.map((match: any, idx: number) => (
              <div key={idx} className="bg-green-900/40 p-3 rounded flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-neutral-100">
                    vs <Link to={`/player/${encodeURIComponent(match.opponent)}`} className="hover:underline text-green-300">{match.opponent}</Link>
                  </span>
                  <span className={match.result === 'W' ? 'text-green-400' : 'text-red-400'}>{match.result}</span>
                  <span className="text-neutral-200">{match.score}</span>
                </div>
                <div className="flex flex-col md:items-end md:text-right mt-2 md:mt-0">
                  <button
                    type="button"
                    className="text-green-300 text-sm font-medium hover:underline focus:outline-none"
                    onClick={() => setTournamentPopup(match.tournament)}
                  >
                    {match.tournament}
                  </button>
                  <span className="text-neutral-400 text-xs">{new Date(match.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {tournamentPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-900 rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-neutral-300 hover:text-neutral-100 text-xl font-bold focus:outline-none"
              onClick={() => setTournamentPopup(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h4 className="text-lg font-semibold text-green-300 mb-1">{tournamentPopup}</h4>
            <div className="text-green-400 text-sm mb-2 font-medium">
              {tournamentDescriptions[tournamentPopup]?.level || 'Unknown Level'}
            </div>
            <p className="text-neutral-100">{tournamentDescriptions[tournamentPopup]?.description || 'No description available.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerProfile; 