import { Link, useParams, useNavigate } from 'react-router-dom';
import type { FC } from 'react';
import PlayerImage from './PlayerImage';
import { normalizeRouteParam } from '../utils/routeUtils';

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

// Tournament data mapping
// This would typically come from an API
const getTournamentData = (tournamentName: string): TournamentDetails | null => {
  // Tournament data mapping
  const tournaments: Record<string, Omit<TournamentDetails, 'currentPlayers' | 'previousWinners'>> = {
  'australian-open': {
    name: 'Australian Open',
    location: 'Melbourne, Victoria, Australia',
    surface: 'Hard',
    category: 'Grand Slam',
    startDate: '2025-01-20',
    endDate: '2025-02-02',
    description: 'The Australian Open is one of the four Grand Slam tennis tournaments. Known as the "Happy Slam," it features the world\'s top players competing at Melbourne Park.',
    venue: 'Melbourne Park',
    prizemoney: '$86,500,000',
  },
  'roland-garros': {
    name: 'Roland Garros',
    location: 'Paris, France',
    surface: 'Clay',
    category: 'Grand Slam',
    startDate: '2025-05-26',
    endDate: '2025-06-09',
    description: 'Roland Garros, also known as the French Open, is one of the four Grand Slam tennis tournaments. Famous for its clay courts, it is the premier clay-court tennis championship in the world.',
    venue: 'Stade Roland Garros',
    prizemoney: '$79,500,000',
  },
  'wimbledon': {
    name: 'Wimbledon',
    location: 'London, United Kingdom',
    surface: 'Grass',
    category: 'Grand Slam',
    startDate: '2025-07-01',
    endDate: '2025-07-14',
    description: 'The Championships, Wimbledon is the oldest tennis tournament in the world and widely regarded as the most prestigious. It is the only Grand Slam still played on grass courts.',
    venue: 'All England Lawn Tennis and Croquet Club',
    prizemoney: '$82,000,000',
  },
  'us-open': {
    name: 'US Open',
    location: 'New York City, USA',
    surface: 'Hard',
    category: 'Grand Slam',
    startDate: '2025-08-25',
    endDate: '2025-09-07',
    description: 'The US Open is the modern version of the oldest tennis championship in the United States. It is chronologically the fourth and final Grand Slam tournament of the year.',
    venue: 'USTA Billie Jean King National Tennis Center',
    prizemoney: '$81,000,000',
  },
  'indian-wells': {
    name: 'BNP Paribas Open - Indian Wells',
    location: 'Indian Wells, California, USA',
    surface: 'Hard',
    category: 'Masters 1000',
    startDate: '2025-03-06',
    endDate: '2025-03-17',
    description: 'The BNP Paribas Open is one of the most prestigious tennis tournaments outside of the Grand Slams. Often called the "Fifth Grand Slam," it features world-class facilities and attracts the top players from both ATP and WTA tours.',
    venue: 'Indian Wells Tennis Garden',
    prizemoney: '$8,800,000',
  },
  'miami-open': {
    name: 'Miami Open',
    location: 'Miami Gardens, Florida, USA',
    surface: 'Hard',
    category: 'Masters 1000',
    startDate: '2025-03-20',
    endDate: '2025-03-31',
    description: 'The Miami Open is one of the most important tournaments in professional tennis, featuring the world\'s top-ranked players competing in the Miami Gardens area.',
    venue: 'Hard Rock Stadium',
    prizemoney: '$8,800,000',
  },
  'monte-carlo': {
    name: 'Monte Carlo Masters',
    location: 'Roquebrune-Cap-Martin, France',
    surface: 'Clay',
    category: 'Masters 1000',
    startDate: '2025-04-07',
    endDate: '2025-04-14',
    description: 'The Monte Carlo Masters is one of the oldest and most prestigious clay-court tennis tournaments, featuring spectacular views of the Mediterranean Sea.',
    venue: 'Monte Carlo Country Club',
    prizemoney: '$5,950,000',
  },
  'madrid-open': {
    name: 'Madrid Open',
    location: 'Madrid, Spain',
    surface: 'Clay',
    category: 'Masters 1000',
    startDate: '2025-05-01',
    endDate: '2025-05-12',
    description: 'The Madrid Open is a significant clay-court tournament that takes place in the Spanish capital, featuring both ATP and WTA tours.',
    venue: 'Caja Mágica',
    prizemoney: '$7,705,780',
  },
  'rome-masters': {
    name: 'Italian Open',
    location: 'Rome, Italy',
    surface: 'Clay',
    category: 'Masters 1000',
    startDate: '2025-05-14',
    endDate: '2025-05-21',
    description: 'The Italian Open, also known as the Rome Masters, is one of the most important clay court tennis tournaments in the world, leading up to the French Open.',
    venue: 'Foro Italico',
    prizemoney: '$7,705,780',
  },
};

  const defaultPlayers = [
    {
      name: 'Novak Djokovic',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
      seed: 1,
      country: 'SRB',
      rank: 1,
      tour: 'ATP' as const
    },
    {
      name: 'Carlos Alcaraz',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
      seed: 2,
      country: 'ESP',
      rank: 2,
      tour: 'ATP' as const
    }
  ];

  const defaultPreviousWinners = [
    {
      year: 2024,
      winner: 'Carlos Alcaraz',
      winnerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
      runner: 'Daniil Medvedev',
      runnerImage: 'path/to/medvedev.jpg',
      score: '6-3, 6-2',
      tour: 'ATP' as const,
      type: 'Singles' as const
    }
  ];

  const normalizedTournamentName = tournamentName.toLowerCase().replace(/\s+/g, '-');
  const tournament = tournaments[normalizedTournamentName];

  if (!tournament) {
    throw new Error(`Tournament ${tournamentName} not found`);
  }

  return {
    ...tournament,
    currentPlayers: defaultPlayers,
    previousWinners: defaultPreviousWinners
  };
};

const Tournaments: FC = () => {
  const { tournamentName } = useParams<{ tournamentName: string }>();
  const navigate = useNavigate();

  if (!tournamentName) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Tournament name is required</p>
        <button
          onClick={() => navigate('/matches')}
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          Back to Matches
        </button>
      </div>
    );
  }

  const tournament = getTournamentData(tournamentName);

  if (!tournament) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Tournament not found</p>
        <button
          onClick={() => navigate('/matches')}
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          Back to Matches
        </button>
      </div>
    );
  }

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

export default Tournaments;
