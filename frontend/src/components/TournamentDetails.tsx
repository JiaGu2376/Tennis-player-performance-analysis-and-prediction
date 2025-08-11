import { Link, useParams, useNavigate } from 'react-router-dom';
import type { FC } from 'react';
import PlayerImage from './PlayerImage';

interface TournamentDetails {
  name: string;
  location: string;
  surface: 'Hard' | 'Clay' | 'Grass' | 'Carpet';
  category: 'Grand Slam' | 'Masters 1000' | 'ATP 500' | 'ATP 250' | 'WTA 1000' | 'WTA 500' | 'WTA 250';
  startDate: string;
  endDate: string;
  description: string;
  venue: string;
  prizemoney: string;
  currentPlayers: Array<{
    name: string;
    image: string;
    seed?: number;
    country: string;
    rank: number;
    tour: 'ATP' | 'WTA';
  }>;
  previousWinners: Array<{
    year: number;
    winner: string;
    winnerImage: string;
    runner: string;
    runnerImage: string;
    score: string;
    tour: 'ATP' | 'WTA';
    type: 'Singles' | 'Doubles';
  }>;
}

// This would typically come from an API
const getTournamentData = (tournamentName: string): TournamentDetails => {
  // Sample data for Indian Wells
  return {
    name: 'BNP Paribas Open - Indian Wells',
    location: 'Indian Wells, California, USA',
    surface: 'Hard',
    category: 'Masters 1000',
    startDate: '2025-03-06',
    endDate: '2025-03-17',
    description: 'The BNP Paribas Open is one of the most prestigious tennis tournaments outside of the Grand Slams. Often called the "Fifth Grand Slam," it features world-class facilities and attracts the top players from both ATP and WTA tours. The tournament is played at the Indian Wells Tennis Garden, which boasts the second-largest tennis stadium in the world.',
    venue: 'Indian Wells Tennis Garden',
    prizemoney: '$8,800,000',
    currentPlayers: [
      {
        name: 'Novak Djokovic',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
        seed: 1,
        country: 'Serbia',
        rank: 1,
        tour: 'ATP'
      },
      {
        name: 'Carlos Alcaraz',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
        seed: 2,
        country: 'Spain',
        rank: 2,
        tour: 'ATP'
      },
      {
        name: 'Iga Świątek',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Iga_%C5%9Awi%C4%85tek_%2851669411976%29.jpg/200px-Iga_%C5%9Awi%C4%85tek_%2851669411976%29.jpg',
        seed: 1,
        country: 'Poland',
        rank: 1,
        tour: 'WTA'
      }
    ],
    previousWinners: [
      {
        year: 2024,
        winner: 'Jannik Sinner',
        winnerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jannik_Sinner_%2852425461875%29.jpg/200px-Jannik_Sinner_%2852425461875%29.jpg',
        runner: 'Daniil Medvedev',
        runnerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Daniil_Medvedev_%2852425461890%29.jpg/200px-Daniil_Medvedev_%2852425461890%29.jpg',
        score: '7-6(4), 6-4',
        tour: 'ATP',
        type: 'Singles'
      },
      {
        year: 2024,
        winner: 'Iga Świątek',
        winnerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Iga_%C5%9Awi%C4%85tek_%2851669411976%29.jpg/200px-Iga_%C5%9Awi%C4%85tek_%2851669411976%29.jpg',
        runner: 'Maria Sakkari',
        runnerImage: '',
        score: '6-4, 6-0',
        tour: 'WTA',
        type: 'Singles'
      }
    ]
  };
};

const TournamentDetails: FC = () => {
  const { tournamentName } = useParams<{ tournamentName: string }>();
  const navigate = useNavigate();
  const tournament = getTournamentData(tournamentName || '');

  return (
    <div className="min-h-screen w-full bg-background text-text">
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-neutral-100 hover:text-green-300 transition mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Matches</span>
        </button>

        <div className="bg-green-900/50 rounded-lg p-8 shadow-md mb-6">
          <h1 className="text-4xl font-medium font-ttcommons text-neutral-100 mb-2">{tournament.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-300 mb-4">
            <span>{tournament.location}</span>
            <span>•</span>
            <span>{tournament.surface} Court</span>
            <span>•</span>
            <span>{tournament.category}</span>
            <span>•</span>
            <span>Prize Money: {tournament.prizemoney}</span>
          </div>
          <p className="text-neutral-200 leading-relaxed mb-4">{tournament.description}</p>
          <div className="text-sm text-neutral-300">
            <div className="font-medium mb-1">Tournament Dates</div>
            <div>{new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-900/50 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Current Players</h2>
            <div className="space-y-4">
              {tournament.currentPlayers.map((player) => (
                <div key={player.name} className="flex items-center space-x-4 bg-green-900/30 p-3 rounded-md">
                  <PlayerImage src={player.image} alt={player.name} className="w-12 h-12" />
                  <div className="flex-1">
                    <Link to={`/player/${encodeURIComponent(player.name)}`} className="font-medium text-green-300 hover:underline">
                      {player.name}
                    </Link>
                    <div className="text-sm text-neutral-400">{player.country}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-300">Rank #{player.rank}</div>
                    {player.seed && (
                      <div className="text-xs text-neutral-400">Seed #{player.seed}</div>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    player.tour === 'ATP' ? 'bg-blue-600/20 text-blue-300' : 'bg-pink-600/20 text-pink-300'
                  }`}>
                    {player.tour}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-900/50 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Previous Winners</h2>
            <div className="space-y-4">
              {tournament.previousWinners.map((result) => (
                <div key={`${result.year}-${result.tour}-${result.type}`} className="bg-green-900/30 p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-lg text-neutral-100">{result.year}</div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        result.type === 'Singles' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {result.type}
                      </span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        result.tour === 'ATP' ? 'bg-blue-600/20 text-blue-300' : 'bg-pink-600/20 text-pink-300'
                      }`}>
                        {result.tour}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <PlayerImage src={result.winnerImage} alt={result.winner} className="w-10 h-10" />
                    <div>
                      <Link to={`/player/${encodeURIComponent(result.winner)}`} className="font-medium text-green-300 hover:underline">
                        {result.winner}
                      </Link>
                      <div className="text-xs text-neutral-400">Winner</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PlayerImage src={result.runnerImage} alt={result.runner} className="w-10 h-10" />
                    <div>
                      <Link to={`/player/${encodeURIComponent(result.runner)}`} className="font-medium text-neutral-200 hover:underline">
                        {result.runner}
                      </Link>
                      <div className="text-xs text-neutral-400">Runner-up</div>
                    </div>
                  </div>
                  <div className="text-sm text-neutral-300 mt-2">
                    Final Score: {result.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
