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
  const [selectedPredictionIndex, setSelectedPredictionIndex] = useState(0);
  const [selectedUpcomingMatchIndex, setSelectedUpcomingMatchIndex] = useState(0);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const [selectedFeaturedPlayerIndex, setSelectedFeaturedPlayerIndex] = useState(0);

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
    {
      id: '2',
      player1: 'Jannik Sinner',
      player2: 'Daniil Medvedev',
      player1Image: playerImages['Jannik Sinner'] || defaultPlayerImage,
      player2Image: playerImages['Daniil Medvedev'] || defaultPlayerImage,
      predictedWinner: 'Jannik Sinner',
      confidence: 82,
      matchTime: '2024-03-21T17:30:00Z',
      tour: 'ATP',
      matchType: 'Singles',
      tournament: 'Miami Open'
    },
    {
      id: '3',
      player1: 'Stefanos Tsitsipas',
      player2: 'Alexander Zverev',
      player1Image: playerImages['Stefanos Tsitsipas'] || defaultPlayerImage,
      player2Image: playerImages['Alexander Zverev'] || defaultPlayerImage,
      predictedWinner: 'Alexander Zverev',
      confidence: 68,
      matchTime: '2024-03-22T19:00:00Z',
      tour: 'ATP',
      matchType: 'Singles',
      tournament: 'Miami Open'
    },
    {
      id: '4',
      player1: 'Iga Świątek',
      player2: 'Aryna Sabalenka',
      player1Image: defaultPlayerImage,
      player2Image: defaultPlayerImage,
      predictedWinner: 'Iga Świątek',
      confidence: 71,
      matchTime: '2024-03-23T16:00:00Z',
      tour: 'WTA',
      matchType: 'Singles',
      tournament: 'Miami Open'
    },
    {
      id: '5',
      player1: 'Coco Gauff',
      player2: 'Elena Rybakina',
      player1Image: defaultPlayerImage,
      player2Image: defaultPlayerImage,
      predictedWinner: 'Elena Rybakina',
      confidence: 65,
      matchTime: '2024-03-24T18:30:00Z',
      tour: 'WTA',
      matchType: 'Singles',
      tournament: 'Miami Open'
    }
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
    {
      id: '2',
      player1: 'Iga Świątek',
      player2: 'Aryna Sabalenka',
      player1Image: playerImages['Iga Świątek'] || defaultPlayerImage,
      player2Image: playerImages['Aryna Sabalenka'] || defaultPlayerImage,
      tournament: 'Miami Open',
      round: 'Quarter Final',
      dateTime: '2024-03-21T20:00:00Z',
      tour: 'WTA',
      matchType: 'Singles'
    },
    {
      id: '3',
      player1: 'Novak Djokovic',
      player2: 'Carlos Alcaraz',
      player1Partner: 'Jannik Sinner',
      player2Partner: 'Daniil Medvedev',
      player1Image: playerImages['Novak Djokovic'] || defaultPlayerImage,
      player2Image: playerImages['Carlos Alcaraz'] || defaultPlayerImage,
      player1PartnerImage: playerImages['Jannik Sinner'] || defaultPlayerImage,
      player2PartnerImage: playerImages['Daniil Medvedev'] || defaultPlayerImage,
      tournament: 'Miami Open',
      round: 'Doubles Quarter Final',
      dateTime: '2024-03-22T16:00:00Z',
      tour: 'ATP',
      matchType: 'Doubles'
    },
    {
      id: '4',
      player1: 'Coco Gauff',
      player2: 'Jessica Pegula',
      player1Partner: 'Ons Jabeur',
      player2Partner: 'Maria Sakkari',
      player1Image: playerImages['Coco Gauff'] || defaultPlayerImage,
      player2Image: playerImages['Jessica Pegula'] || defaultPlayerImage,
      tournament: 'Miami Open',
      round: 'Doubles Semi Final',
      dateTime: '2024-03-22T18:00:00Z',
      tour: 'WTA',
      matchType: 'Doubles'
    }
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
    {
      id: '2',
      winner: 'Carlos Alcaraz',
      loser: 'Alexander Zverev',
      winnerImage: playerImages['Carlos Alcaraz'] || defaultPlayerImage,
      loserImage: playerImages['Alexander Zverev'] || defaultPlayerImage,
      score: '7-6(4), 6-1',
      tournament: 'Indian Wells',
      date: '2024-03-16T00:00:00Z',
      tour: 'ATP',
      matchType: 'Singles'
    },
    {
      id: '3',
      winner: 'Iga Świątek',
      loser: 'Maria Sakkari',
      winnerImage: defaultPlayerImage,
      loserImage: defaultPlayerImage,
      score: '6-4, 6-0',
      tournament: 'Indian Wells',
      date: '2024-03-17T00:00:00Z',
      tour: 'WTA',
      matchType: 'Singles'
    },
    {
      id: '4',
      winner: 'Elena Rybakina',
      loser: 'Jessica Pegula',
      winnerImage: defaultPlayerImage,
      loserImage: defaultPlayerImage,
      score: '7-6(6), 6-4',
      tournament: 'Indian Wells',
      date: '2024-03-16T00:00:00Z',
      tour: 'WTA',
      matchType: 'Singles'
    },
    {
      id: '5',
      winner: 'Novak Djokovic',
      loser: 'Stefanos Tsitsipas',
      winnerImage: playerImages['Novak Djokovic'] || defaultPlayerImage,
      loserImage: playerImages['Stefanos Tsitsipas'] || defaultPlayerImage,
      score: '6-3, 7-6(3)',
      tournament: 'Indian Wells',
      date: '2024-03-15T00:00:00Z',
      tour: 'ATP',
      matchType: 'Singles'
    }
  ];

  const handleNavigation = (currentIndex: number, setIndex: (index: number) => void, items: any[], direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setIndex((currentIndex - 1 + items.length) % items.length);
    } else {
      setIndex((currentIndex + 1) % items.length);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-text">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-6xl font-medium font-ttcommons mb-8">Tennis Performance Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latest Predictions */}
          <div className="relative bg-green-900/50 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Latest Predictions</h2>
            <div className="flex items-center justify-center group">
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 text-neutral-100 rounded-full p-2 hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleNavigation(selectedPredictionIndex, setSelectedPredictionIndex, predictions, 'prev')}
              >
                ◀
              </button>
              <div className="bg-green-900/30 p-4 rounded-md shadow-sm w-[350px]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-4">
                    <PlayerImage src={predictions[selectedPredictionIndex].player1Image} alt={predictions[selectedPredictionIndex].player1} className="w-8 h-8 rounded-full" />
                    <span className="mx-2 text-neutral-200">vs</span>
                    <PlayerImage src={predictions[selectedPredictionIndex].player2Image} alt={predictions[selectedPredictionIndex].player2} className="w-8 h-8 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      predictions[selectedPredictionIndex].matchType === 'Singles' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {predictions[selectedPredictionIndex].matchType}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      predictions[selectedPredictionIndex].tour === 'ATP' ? 'bg-blue-600/20 text-blue-300' : 'bg-pink-600/20 text-pink-300'
                    }`}>
                      {predictions[selectedPredictionIndex].tour}
                    </span>
                  </div>
                </div>
                <div className="font-medium text-neutral-100 mb-2">
                  <Link to={`/player/${encodeURIComponent(predictions[selectedPredictionIndex].player1)}`} className="hover:underline text-green-300">{predictions[selectedPredictionIndex].player1}</Link> vs <Link to={`/player/${encodeURIComponent(predictions[selectedPredictionIndex].player2)}`} className="hover:underline text-green-300">{predictions[selectedPredictionIndex].player2}</Link>
                </div>
                <div className="text-sm text-neutral-300">
                  Predicted Winner: <Link to={`/player/${encodeURIComponent(predictions[selectedPredictionIndex].predictedWinner)}`} className="font-medium text-green-300 hover:underline">{predictions[selectedPredictionIndex].predictedWinner}</Link>
                  <div className="mt-1 bg-green-950/50 rounded-full h-2">
                    <div 
                      className="bg-neutral-100 h-2 rounded-full" 
                      style={{ width: `${predictions[selectedPredictionIndex].confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400">{predictions[selectedPredictionIndex].confidence}% confidence</span>
                </div>
              </div>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 text-neutral-100 rounded-full p-2 hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleNavigation(selectedPredictionIndex, setSelectedPredictionIndex, predictions, 'next')}
              >
                ▶
              </button>
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="relative bg-green-900/50 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Upcoming Matches</h2>
            <div className="flex items-center justify-center group">
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 text-neutral-100 rounded-full p-2 hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleNavigation(selectedUpcomingMatchIndex, setSelectedUpcomingMatchIndex, upcomingMatches, 'prev')}
              >
                ◀
              </button>
              <div className="bg-green-900/30 p-4 rounded-md shadow-sm w-[350px]">
                <div className="flex justify-between items-start">
                  <div className="text-sm text-neutral-300 font-medium mb-1">{upcomingMatches[selectedUpcomingMatchIndex].tournament}</div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      upcomingMatches[selectedUpcomingMatchIndex].matchType === 'Singles' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {upcomingMatches[selectedUpcomingMatchIndex].matchType}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      upcomingMatches[selectedUpcomingMatchIndex].tour === 'ATP' ? 'bg-blue-600/20 text-blue-300' : 'bg-pink-600/20 text-pink-300'
                    }`}>
                      {upcomingMatches[selectedUpcomingMatchIndex].tour}
                    </span>
                  </div>
                </div>
                {upcomingMatches[selectedUpcomingMatchIndex].matchType === 'Singles' ? (
                  <>
                    <div className="flex items-center space-x-2 mb-2">
                      <PlayerImage src={upcomingMatches[selectedUpcomingMatchIndex].player1Image} alt={upcomingMatches[selectedUpcomingMatchIndex].player1} className="w-8 h-8 rounded-full" />
                      <span className="font-medium text-neutral-200">vs</span>
                      <PlayerImage src={upcomingMatches[selectedUpcomingMatchIndex].player2Image} alt={upcomingMatches[selectedUpcomingMatchIndex].player2} className="w-8 h-8 rounded-full" />
                    </div>
                    <div className="font-medium text-neutral-100">
                      <Link to={`/player/${encodeURIComponent(upcomingMatches[selectedUpcomingMatchIndex].player1)}`} className="hover:underline text-green-300">{upcomingMatches[selectedUpcomingMatchIndex].player1}</Link>
                      <span className="mx-2">vs</span>
                      <Link to={`/player/${encodeURIComponent(upcomingMatches[selectedUpcomingMatchIndex].player2)}`} className="hover:underline text-green-300">{upcomingMatches[selectedUpcomingMatchIndex].player2}</Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex -space-x-2">
                        <PlayerImage src={upcomingMatches[selectedUpcomingMatchIndex].player1Image} alt={upcomingMatches[selectedUpcomingMatchIndex].player1} className="w-8 h-8 rounded-full" />
                        {upcomingMatches[selectedUpcomingMatchIndex].player1PartnerImage && (
                          <PlayerImage src={upcomingMatches[selectedUpcomingMatchIndex].player1PartnerImage} alt={upcomingMatches[selectedUpcomingMatchIndex].player1Partner || ''} className="w-8 h-8 rounded-full" />
                        )}
                      </div>
                      <span className="font-medium text-neutral-200">vs</span>
                      <div className="flex -space-x-2">
                        <PlayerImage src={upcomingMatches[selectedUpcomingMatchIndex].player2Image} alt={upcomingMatches[selectedUpcomingMatchIndex].player2} className="w-8 h-8 rounded-full" />
                        {upcomingMatches[selectedUpcomingMatchIndex].player2PartnerImage && (
                          <PlayerImage src={upcomingMatches[selectedUpcomingMatchIndex].player2PartnerImage} alt={upcomingMatches[selectedUpcomingMatchIndex].player2Partner || ''} className="w-8 h-8 rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="font-medium text-neutral-100">
                      <div>
                        <Link to={`/player/${encodeURIComponent(upcomingMatches[selectedUpcomingMatchIndex].player1)}`} className="hover:underline text-green-300">{upcomingMatches[selectedUpcomingMatchIndex].player1}</Link>
                        {upcomingMatches[selectedUpcomingMatchIndex].player1Partner && (
                          <>
                            <span className="mx-1">/</span>
                            <Link to={`/player/${encodeURIComponent(upcomingMatches[selectedUpcomingMatchIndex].player1Partner)}`} className="hover:underline text-green-300">{upcomingMatches[selectedUpcomingMatchIndex].player1Partner}</Link>
                          </>
                        )}
                      </div>
                      <div className="text-sm text-neutral-300">vs</div>
                      <div>
                        <Link to={`/player/${encodeURIComponent(upcomingMatches[selectedUpcomingMatchIndex].player2)}`} className="hover:underline text-green-300">{upcomingMatches[selectedUpcomingMatchIndex].player2}</Link>
                        {upcomingMatches[selectedUpcomingMatchIndex].player2Partner && (
                          <>
                            <span className="mx-1">/</span>
                            <Link to={`/player/${encodeURIComponent(upcomingMatches[selectedUpcomingMatchIndex].player2Partner)}`} className="hover:underline text-green-300">{upcomingMatches[selectedUpcomingMatchIndex].player2Partner}</Link>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="text-sm text-neutral-300 mt-1">
                  <span>{upcomingMatches[selectedUpcomingMatchIndex].round}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(upcomingMatches[selectedUpcomingMatchIndex].dateTime).toLocaleString()}</span>
                </div>
              </div>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 text-neutral-100 rounded-full p-2 hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleNavigation(selectedUpcomingMatchIndex, setSelectedUpcomingMatchIndex, upcomingMatches, 'next')}
              >
                ▶
              </button>
            </div>
          </div>

          {/* Recent Match Results */}
          <div className="relative bg-green-900/50 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Recent Match Results</h2>
            <div className="flex items-center justify-center group">
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 text-neutral-100 rounded-full p-2 hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleNavigation(selectedResultIndex, setSelectedResultIndex, recentResults, 'prev')}
              >
                ◀
              </button>
              <div className="bg-green-900/30 p-4 rounded-md shadow-sm w-[350px]">
                <div className="flex justify-between items-start">
                  <div className="text-sm text-neutral-300 font-medium mb-1">{recentResults[selectedResultIndex].tournament}</div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      recentResults[selectedResultIndex].matchType === 'Singles' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {recentResults[selectedResultIndex].matchType}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      recentResults[selectedResultIndex].tour === 'ATP' ? 'bg-blue-600/20 text-blue-300' : 'bg-pink-600/20 text-pink-300'
                    }`}>
                      {recentResults[selectedResultIndex].tour}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <PlayerImage src={recentResults[selectedResultIndex].winnerImage} alt={recentResults[selectedResultIndex].winner} className="w-8 h-8 rounded-full" />
                  <span className="text-xs text-neutral-400">def.</span>
                  <PlayerImage src={recentResults[selectedResultIndex].loserImage} alt={recentResults[selectedResultIndex].loser} className="w-8 h-8 rounded-full" />
                </div>
                <div>
                  <span className="font-medium text-neutral-100">
                    <Link to={`/player/${encodeURIComponent(recentResults[selectedResultIndex].winner)}`} className="hover:underline text-green-300">{recentResults[selectedResultIndex].winner}</Link>
                  </span>
                  <span className="text-neutral-300"> def. </span>
                  <span className="font-medium text-neutral-200">
                    <Link to={`/player/${encodeURIComponent(recentResults[selectedResultIndex].loser)}`} className="hover:underline text-green-300">{recentResults[selectedResultIndex].loser}</Link>
                  </span>
                </div>
                <div className="text-sm text-neutral-300 mt-1">
                  <span>{recentResults[selectedResultIndex].score}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(recentResults[selectedResultIndex].date).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 text-neutral-100 rounded-full p-2 hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleNavigation(selectedResultIndex, setSelectedResultIndex, recentResults, 'next')}
              >
                ▶
              </button>
            </div>
          </div>

          {/* Featured Players */}
          <div className="relative bg-green-900/50 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-neutral-100 mb-4">Featured Players</h2>
            <div className="flex items-center justify-center group">
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 text-neutral-100 rounded-full p-2 hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleNavigation(selectedFeaturedPlayerIndex, setSelectedFeaturedPlayerIndex, predictions, 'prev')}
              >
                ◀
              </button>
              <div className="bg-green-900/30 p-4 rounded-md shadow-sm w-[350px]">
                <PlayerCarousel tour={selectedTour} />
              </div>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-neutral-800 text-neutral-100 rounded-full p-2 hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleNavigation(selectedFeaturedPlayerIndex, setSelectedFeaturedPlayerIndex, predictions, 'next')}
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
