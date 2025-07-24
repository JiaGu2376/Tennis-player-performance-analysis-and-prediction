import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PlayerCarousel from './PlayerCarousel';

interface Player {
  name: string;
  image: string;
  rank: number;
  winRate: number;
  tour: 'ATP' | 'WTA';
  country: string;
  points: number;
  bio: string;
}

interface MatchPrediction {
  id: string;
  player1: string;
  player2: string;
  player1Image: string;
  player2Image: string;
  predictedWinner: string;
  confidence: number;
  matchTime: string;
  tour: 'ATP' | 'WTA';
  matchType: 'Singles' | 'Doubles';
  tournament: string;
}

interface UpcomingMatch {
  id: string;
  player1: string;
  player2: string;
  player1Image: string;
  player2Image: string;
  tournament: string;
  round: string;
  dateTime: string;
  tour: 'ATP' | 'WTA';
  matchType: 'Singles' | 'Doubles';
  player1Partner?: string;
  player2Partner?: string;
  player1PartnerImage?: string;
  player2PartnerImage?: string;
}

interface MatchResult {
  id: string;
  winner: string;
  loser: string;
  winnerImage: string;
  loserImage: string;
  score: string;
  tournament: string;
  date: string;
  tour: 'ATP' | 'WTA';
  matchType: 'Singles' | 'Doubles';
}

const Dashboard: FC = () => {
  const [selectedTour, setSelectedTour] = useState<'ATP' | 'WTA'>('ATP');
  // Player images from Wikimedia Commons
  const playerImages: { [key: string]: string } = {
    'Novak Djokovic': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
    'Carlos Alcaraz': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
    'Jannik Sinner': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jannik_Sinner_%2852425461875%29.jpg/200px-Jannik_Sinner_%2852425461875%29.jpg',
    'Daniil Medvedev': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Daniil_Medvedev_%2852425461890%29.jpg/200px-Daniil_Medvedev_%2852425461890%29.jpg',
    'Alexander Zverev': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Alexander_Zverev_%2851635591102%29.jpg/200px-Alexander_Zverev_%2851635591102%29.jpg',
    'Stefanos Tsitsipas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Stefanos_Tsitsipas_%2851635591117%29.jpg/200px-Stefanos_Tsitsipas_%2851635591117%29.jpg'
  };

  const defaultPlayerImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/200px-Portrait_Placeholder.png';

  const PlayerImage: FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
      <div className={`relative ${className}`}>
        <img
          src={hasError ? defaultPlayerImage : src}
          alt={alt}
          className={`w-full h-full object-cover rounded-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-neutral-200 rounded-full animate-pulse" />
        )}
      </div>
    );
  };

  // Sample data
  const predictions: MatchPrediction[] = [
    {
      id: '1',
      player1: 'Novak Djokovic',
      player2: 'Carlos Alcaraz',
      player1Image: playerImages['Novak Djokovic'] || defaultPlayerImage,
      player2Image: playerImages['Carlos Alcaraz'] || defaultPlayerImage,
      predictedWinner: 'Novak Djokovic',
      confidence: 75,
      matchTime: '2024-03-20T15:00:00Z',
      tour: 'ATP',
      matchType: 'Singles',
      tournament: 'Miami Open'
    },
    // Add more predictions...
  ];

  const upcomingMatches: UpcomingMatch[] = [
    {
      id: '1',
      player1: 'Jannik Sinner',
      player2: 'Daniil Medvedev',
      player1Image: playerImages['Jannik Sinner'] || defaultPlayerImage,
      player2Image: playerImages['Daniil Medvedev'] || defaultPlayerImage,
      tournament: 'Miami Open',
      round: 'Semi Final',
      dateTime: '2024-03-21T18:00:00Z',
      tour: 'ATP',
      matchType: 'Singles'
    },
    // Add more matches...
  ];

  const recentResults: MatchResult[] = [
    {
      id: '1',
      winner: 'Jannik Sinner',
      loser: 'Daniil Medvedev',
      winnerImage: playerImages['Jannik Sinner'] || defaultPlayerImage,
      loserImage: playerImages['Daniil Medvedev'] || defaultPlayerImage,
      score: '6-4, 6-4',
      tournament: 'Indian Wells',
      date: '2024-03-17T00:00:00Z',
      tour: 'ATP',
      matchType: 'Singles'
    },
    // Add more results...
  ];

  // Tour selector component
  const TourSelector = () => (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={() => setSelectedTour('ATP')}
        className={`px-4 py-2 rounded-full ${
          selectedTour === 'ATP'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ATP Tour
      </button>
      <button
        onClick={() => setSelectedTour('WTA')}
        className={`px-4 py-2 rounded-full ${
          selectedTour === 'WTA'
            ? 'bg-pink-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        WTA Tour
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-background text-text">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-6xl font-medium font-ttcommons mb-8">Tennis Performance Dashboard</h1>
        
        {/* Tour Selector */}
        <TourSelector />

        {/* Top row - Predictions and Matches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Latest Predictions */}
          <div className="bg-green-900/50 rounded-lg p-6 shadow-md md:col-span-1">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">{selectedTour} Latest Predictions</h2>
            <div className="space-y-4">
              {predictions.filter(pred => pred.tour === selectedTour).map(pred => (
                <div key={pred.id} className="bg-green-900/30 p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <PlayerImage src={pred.player1Image} alt={pred.player1} className="w-8 h-8 rounded-full" />
                        <span className="mx-2 text-neutral-200">vs</span>
                        <PlayerImage src={pred.player2Image} alt={pred.player2} className="w-8 h-8 rounded-full" />
                      </div>
                      <span className="font-medium text-neutral-100">
                        <Link to={`/player/${encodeURIComponent(pred.player1)}`} className="hover:underline text-green-300">{pred.player1}</Link> vs <Link to={`/player/${encodeURIComponent(pred.player2)}`} className="hover:underline text-green-300">{pred.player2}</Link>
                      </span>
                    </div>
                    <span className="text-sm text-neutral-300">{new Date(pred.matchTime).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm text-neutral-300">
                    Predicted Winner: <Link to={`/player/${encodeURIComponent(pred.predictedWinner)}`} className="font-medium text-green-300 hover:underline">{pred.predictedWinner}</Link>
                    <div className="mt-1 bg-green-950/50 rounded-full h-2">
                      <div 
                        className="bg-neutral-100 h-2 rounded-full" 
                        style={{ width: `${pred.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-400">{pred.confidence}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="bg-green-900/50 rounded-lg p-6 shadow-md md:col-span-1">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">{selectedTour} Upcoming Matches</h2>
            <div className="space-y-4">
              {upcomingMatches.filter(match => match.tour === selectedTour).map(match => (
                <div key={match.id} className="bg-green-900/30 p-4 rounded-md shadow-sm">
                  <div className="text-sm text-neutral-300 font-medium mb-1">{match.tournament}</div>
                  <div className="flex items-center space-x-2 mb-2">
                    <PlayerImage src={match.player1Image} alt={match.player1} className="w-8 h-8 rounded-full" />
                    <span className="font-medium text-neutral-200">vs</span>
                    <PlayerImage src={match.player2Image} alt={match.player2} className="w-8 h-8 rounded-full" />
                  </div>
                  <div className="font-medium text-neutral-100">
                    <Link to={`/player/${encodeURIComponent(match.player1)}`} className="hover:underline text-green-300">{match.player1}</Link> vs <Link to={`/player/${encodeURIComponent(match.player2)}`} className="hover:underline text-green-300">{match.player2}</Link>
                  </div>
                  <div className="text-sm text-neutral-300 mt-1">
                    <span>{match.round}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(match.dateTime).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second row - Recent Results */}
        <div className="bg-green-900/50 rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold text-neutral-100 mb-4">{selectedTour} Recent Match Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentResults.filter(result => result.tour === selectedTour).map(result => (
                <div key={result.id} className="bg-green-900/30 p-4 rounded-md shadow-sm">
                  <div className="text-sm text-neutral-300 font-medium mb-1">{result.tournament}</div>
                  <div className="flex items-center space-x-2 mb-2">
                    <PlayerImage src={result.winnerImage} alt={result.winner} className="w-8 h-8 rounded-full" />
                    <span className="text-xs text-neutral-400">def.</span>
                    <PlayerImage src={result.loserImage} alt={result.loser} className="w-8 h-8 rounded-full" />
                  </div>
                  <div>
                    <span className="font-medium text-neutral-100">
                      <Link to={`/player/${encodeURIComponent(result.winner)}`} className="hover:underline text-green-300">{result.winner}</Link>
                    </span>
                    <span className="text-neutral-300"> def. </span>
                    <span className="font-medium text-neutral-200">
                      <Link to={`/player/${encodeURIComponent(result.loser)}`} className="hover:underline text-green-300">{result.loser}</Link>
                    </span>
                  </div>
                  <div className="text-sm text-neutral-300 mt-1">
                    <span>{result.score}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(result.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Third row - Player Profiles */}
          <Link to="/players" className="block group mt-6">
            <div className="group-hover:bg-green-900/20 group-hover:rounded-lg transition-colors">
              <PlayerCarousel tour={selectedTour} />
            </div>
          </Link>
        </div>
      </div>
    );
};

export default Dashboard; 