import type { FC } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const topPlayers = [
  {
    name: 'Novak Djokovic',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
    rank: 1,
    winRate: 84.2,
    bio: 'Serbian professional tennis player, considered one of the greatest of all time.',
  },
  {
    name: 'Carlos Alcaraz',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
    rank: 2,
    winRate: 82.5,
    bio: 'Spanish tennis prodigy, youngest world No. 1 in history.',
  },
  {
    name: 'Jannik Sinner',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jannik_Sinner_%2852425461875%29.jpg/200px-Jannik_Sinner_%2852425461875%29.jpg',
    rank: 3,
    winRate: 80.1,
    bio: 'Italian tennis star, known for his powerful baseline game.',
  },
  // Add more players as needed
];

const PlayerCarousel: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 320; // Card width + gap

  const next = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  const prev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= scrollAmount;
    }
  };

  return (
    <div className="relative bg-green-900/50 rounded-lg p-6 shadow-md group">
      <h2 className="text-xl font-semibold text-neutral-100 mb-4">Player Profiles</h2>
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-green-700 hover:bg-green-600 text-neutral-100 w-8 h-8 rounded-full flex items-center justify-center shadow transition opacity-0 group-hover:opacity-100 md:opacity-0 focus:opacity-100 z-10"
          aria-label="Previous player"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-green-700 hover:bg-green-600 text-neutral-100 w-8 h-8 rounded-full flex items-center justify-center shadow transition opacity-0 group-hover:opacity-100 md:opacity-0 focus:opacity-100 z-10"
          aria-label="Next player"
        >
          →
        </button>

        {/* Player Cards Container */}
        <div ref={containerRef} className="overflow-x-auto flex gap-4 pb-2 snap-x snap-mandatory">
          {topPlayers.map(player => (
            <div key={player.name} className="bg-green-900/30 p-4 rounded-md shadow-sm flex-none w-[300px] snap-start">
              <div className="flex items-center space-x-3">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-green-400"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-neutral-100 truncate">
                      <Link to={`/player/${encodeURIComponent(player.name)}`} className="hover:underline text-green-300">{player.name}</Link>
                    </span>
                    <span className="text-sm text-neutral-300 flex-shrink-0">Rank #{player.rank}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-300">Win Rate</span>
                      <span className="font-medium text-neutral-100">{player.winRate}%</span>
                    </div>
                    <div className="text-sm text-neutral-300 line-clamp-2">{player.bio}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerCarousel;
