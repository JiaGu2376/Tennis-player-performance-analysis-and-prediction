import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

interface MatchFilter {
  tour?: 'ATP' | 'WTA' | 'ALL';
  matchType?: 'Singles' | 'Doubles' | 'ALL';
  searchQuery: string;
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
}

interface MatchVideoInfo {
  url: string;
  platform: 'YouTube' | 'Vimeo' | 'Other';
  thumbnail?: string;
}

interface ArchiveMatch extends MatchResult {
  videoInfo?: MatchVideoInfo;
  highlights?: string[];
  venue?: string;
  surface?: 'Hard' | 'Clay' | 'Grass' | 'Indoor';
  round?: string;
}

const Matches: FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');
  const [filters, setFilters] = useState<MatchFilter>({
    tour: 'ALL',
    matchType: 'ALL',
    searchQuery: ''
  });

  const defaultPlayerImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/200px-Portrait_Placeholder.png';

  // Mock data for upcoming matches with predictions
  const upcomingMatchesWithPredictions = [
    {
      id: '1',
      player1: 'Novak Djokovic',
      player2: 'Carlos Alcaraz',
      player1Image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
      player2Image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
      predictedWinner: 'Novak Djokovic',
      confidence: 75,
      matchTime: '2024-03-20T15:00:00Z',
      tour: 'ATP',
      matchType: 'Singles',
      tournament: 'Miami Open',
      round: 'Final'
    },
    {
      id: '2',
      player1: 'Jannik Sinner',
      player2: 'Daniil Medvedev',
      player1Image: defaultPlayerImage,
      player2Image: defaultPlayerImage,
      predictedWinner: 'Jannik Sinner',
      confidence: 82,
      matchTime: '2024-03-21T17:30:00Z',
      tour: 'ATP',
      matchType: 'Singles',
      tournament: 'Miami Open',
      round: 'Semi Final'
    }
  ];

  const recentResults = [
    {
      id: '1',
      winner: 'Jannik Sinner',
      loser: 'Daniil Medvedev',
      winnerImage: defaultPlayerImage,
      loserImage: defaultPlayerImage,
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
      winnerImage: defaultPlayerImage,
      loserImage: defaultPlayerImage,
      score: '7-6(4), 6-1',
      tournament: 'Indian Wells',
      date: '2024-03-16T00:00:00Z',
      tour: 'ATP',
      matchType: 'Singles'
    }
  ];

  // Mock archive data
  const archiveMatches: ArchiveMatch[] = [
    {
      id: '101',
      winner: 'Novak Djokovic',
      loser: 'Carlos Alcaraz',
      winnerImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
      loserImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
      score: '7-6(5), 6-3, 6-3',
      tournament: 'Australian Open',
      date: '2024-01-28T00:00:00Z',
      tour: 'ATP',
      matchType: 'Singles',
      round: 'Final',
      surface: 'Hard',
      venue: 'Rod Laver Arena',
      videoInfo: {
        url: 'https://youtube.com/watch?v=example1',
        platform: 'YouTube',
        thumbnail: 'https://example.com/thumbnail1.jpg'
      },
      highlights: [
        'Match point and celebration',
        'Best rallies compilation',
        'Post-match interview'
      ]
    },
    {
      id: '102',
      winner: 'Iga Świątek',
      loser: 'Aryna Sabalenka',
      winnerImage: 'default-player.jpg',
      loserImage: 'default-player.jpg',
      score: '6-3, 3-6, 6-3',
      tournament: 'Roland Garros',
      date: '2024-06-08T00:00:00Z',
      tour: 'WTA',
      matchType: 'Singles',
      round: 'Final',
      surface: 'Clay',
      venue: 'Court Philippe-Chatrier',
      videoInfo: {
        url: 'https://youtube.com/watch?v=example2',
        platform: 'YouTube',
        thumbnail: 'https://example.com/thumbnail2.jpg'
      }
    }
  ];

  const handleFilterChange = (key: keyof MatchFilter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-medium font-ttcommons">Tennis Matches</h1>
          <div className="flex space-x-4">
            <button
              className={`px-5 py-2 rounded-full font-sans text-base font-semibold transition border-2 ${
                activeTab === 'upcoming'
                  ? 'bg-green-900 text-white border-green-900'
                  : 'bg-transparent text-green-900 border-green-900 hover:bg-green-900/10'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Matches
            </button>
            <button
              className={`px-5 py-2 rounded-full font-sans text-base font-semibold transition border-2 ${
                activeTab === 'results'
                  ? 'bg-green-900 text-white border-green-900'
                  : 'bg-transparent text-green-900 border-green-900 hover:bg-green-900/10'
              }`}
              onClick={() => setActiveTab('results')}
            >
              Match Results
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-green-900/50 rounded-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <select
              className="bg-background text-text px-4 py-2 rounded-lg border-2 border-green-900"
              value={filters.tour}
              onChange={(e) => handleFilterChange('tour', e.target.value)}
            >
              <option value="ALL">All Tours</option>
              <option value="ATP">ATP</option>
              <option value="WTA">WTA</option>
            </select>
            <select
              className="bg-background text-text px-4 py-2 rounded-lg border-2 border-green-900"
              value={filters.matchType}
              onChange={(e) => handleFilterChange('matchType', e.target.value)}
            >
              <option value="ALL">All Types</option>
              <option value="Singles">Singles</option>
              <option value="Doubles">Doubles</option>
            </select>
            <input
              type="text"
              placeholder="Search matches, players, or tournaments..."
              className="flex-1 bg-background text-text px-4 py-2 rounded-lg border-2 border-green-900"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            />
          </div>
        </div>

        {activeTab === 'upcoming' ? (
          <div className="space-y-6">
            <div className="bg-green-900/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-neutral-100 mb-4">Upcoming Matches with Predictions</h2>
              <div className="grid gap-4">
                {upcomingMatchesWithPredictions.map(match => (
                  <div key={match.id} className="bg-green-900/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-neutral-300 font-medium">{match.tournament} • {match.round}</div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          match.matchType === 'Singles' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                        }`}>
                          {match.matchType}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          match.tour === 'ATP' ? 'bg-blue-600/20 text-blue-300' : 'bg-pink-600/20 text-pink-300'
                        }`}>
                          {match.tour}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={match.player1Image}
                            alt={match.player1}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-medium text-neutral-200">vs</span>
                          <img
                            src={match.player2Image}
                            alt={match.player2}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                        <div className="mb-2">
                          <Link to={`/player/${encodeURIComponent(match.player1)}`} className="font-medium text-green-300 hover:underline">
                            {match.player1}
                          </Link>
                          <span className="text-neutral-300"> vs </span>
                          <Link to={`/player/${encodeURIComponent(match.player2)}`} className="font-medium text-green-300 hover:underline">
                            {match.player2}
                          </Link>
                        </div>
                        <div className="text-sm">
                          <div className="text-neutral-300 mb-1">
                            Predicted Winner: <span className="text-green-300">{match.predictedWinner}</span>
                          </div>
                          <div className="relative h-2 bg-green-950/50 rounded-full">
                            <div 
                              className="absolute top-0 left-0 h-2 bg-neutral-100 rounded-full" 
                              style={{ width: `${match.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs text-neutral-400">{match.confidence}% confidence</span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-neutral-300">
                        {new Date(match.matchTime).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-900/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-neutral-100 mb-4">Recent Results</h2>
              <div className="grid gap-4">
                {recentResults.map(match => (
                  <div key={match.id} className="bg-green-900/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-neutral-300 font-medium">{match.tournament}</div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          match.matchType === 'Singles' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                        }`}>
                          {match.matchType}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          match.tour === 'ATP' ? 'bg-blue-600/20 text-blue-300' : 'bg-pink-600/20 text-pink-300'
                        }`}>
                          {match.tour}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={match.winnerImage}
                            alt={match.winner}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-xs text-neutral-400">def.</span>
                          <img
                            src={match.loserImage}
                            alt={match.loser}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <Link to={`/player/${encodeURIComponent(match.winner)}`} className="font-medium text-green-300 hover:underline">
                            {match.winner}
                          </Link>
                          <span className="text-neutral-300"> def. </span>
                          <Link to={`/player/${encodeURIComponent(match.loser)}`} className="font-medium text-green-300 hover:underline">
                            {match.loser}
                          </Link>
                        </div>
                        <div className="text-sm text-neutral-300 mt-1">
                          <span>{match.score}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(match.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-900/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-neutral-100 mb-4">Match Archive</h2>
              <div className="grid gap-4">
                {archiveMatches.map(match => (
                  <div key={match.id} className="bg-green-900/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-neutral-300 font-medium">{match.tournament}</div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          match.matchType === 'Singles' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                        }`}>
                          {match.matchType}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          match.tour === 'ATP' ? 'bg-blue-600/20 text-blue-300' : 'bg-pink-600/20 text-pink-300'
                        }`}>
                          {match.tour}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <img
                            src={match.winnerImage}
                            alt={match.winner}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-xs text-neutral-400">def.</span>
                          <img
                            src={match.loserImage}
                            alt={match.loser}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <Link to={`/player/${encodeURIComponent(match.winner)}`} className="font-medium text-green-300 hover:underline">
                            {match.winner}
                          </Link>
                          <span className="text-neutral-300"> def. </span>
                          <Link to={`/player/${encodeURIComponent(match.loser)}`} className="font-medium text-green-300 hover:underline">
                            {match.loser}
                          </Link>
                        </div>
                        <div className="text-sm text-neutral-300 mt-1">
                          <span>{match.score}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(match.date).toLocaleDateString()}</span>
                          {match.round && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{match.round}</span>
                            </>
                          )}
                          {match.surface && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{match.surface}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {match.videoInfo && (
                        <a
                          href={match.videoInfo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-3 py-1 bg-green-800/30 rounded hover:bg-green-800/50 transition"
                        >
                          <span className="text-sm text-neutral-100">Watch Highlights</span>
                          <svg className="w-4 h-4 text-neutral-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
