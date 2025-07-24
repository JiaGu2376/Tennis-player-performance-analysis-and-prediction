import type { FC } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export const topPlayers = {
  ATP: [
    {
      name: 'Novak Djokovic',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
      rank: 1,
      winRate: 84.2,
      country: 'SRB',
      points: 11045,
      bio: 'Serbian professional tennis player, considered one of the greatest of all time. Holds the record for most Grand Slam singles titles.',
      tour: 'ATP'
    },
    {
      name: 'Carlos Alcaraz',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
      rank: 2,
      winRate: 82.5,
      country: 'ESP',
      points: 8805,
      bio: 'Spanish tennis prodigy, youngest world No. 1 in history. Known for his explosive playing style and incredible athleticism.',
      tour: 'ATP'
    },
    {
      name: 'Jannik Sinner',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jannik_Sinner_%2852425461875%29.jpg/200px-Jannik_Sinner_%2852425461875%29.jpg',
      rank: 3,
      winRate: 80.1,
      country: 'ITA',
      points: 8270,
      bio: 'Italian tennis star, known for his powerful baseline game and exceptional consistency.',
      tour: 'ATP'
    },
    {
      name: 'Daniil Medvedev',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Daniil_Medvedev_%2852425461890%29.jpg/200px-Daniil_Medvedev_%2852425461890%29.jpg',
      rank: 4,
      winRate: 79.8,
      country: 'RUS',
      points: 7490,
      bio: 'Russian tennis player known for his unique playing style and strong defensive skills.',
      tour: 'ATP'
    },
    {
      name: 'Alexander Zverev',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Alexander_Zverev_%2851635591102%29.jpg/200px-Alexander_Zverev_%2851635591102%29.jpg',
      rank: 5,
      winRate: 78.5,
      country: 'GER',
      points: 6515,
      bio: 'German tennis player with a powerful serve and aggressive baseline game.',
      tour: 'ATP'
    },
    {
      name: 'Andrey Rublev',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Andrey_Rublev_%2852425454895%29.jpg/200px-Andrey_Rublev_%2852425454895%29.jpg',
      rank: 6,
      winRate: 77.9,
      country: 'RUS',
      points: 5965,
      bio: 'Russian tennis player known for his powerful forehand and intense playing style.',
      tour: 'ATP'
    },
    {
      name: 'Holger Rune',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Holger_Rune_%2851972681843%29.jpg/200px-Holger_Rune_%2851972681843%29.jpg',
      rank: 7,
      winRate: 76.8,
      country: 'DEN',
      points: 5465,
      bio: 'Danish tennis prodigy with an aggressive all-court game.',
      tour: 'ATP'
    },
    {
      name: 'Stefanos Tsitsipas',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Stefanos_Tsitsipas_%2851635591117%29.jpg/200px-Stefanos_Tsitsipas_%2851635591117%29.jpg',
      rank: 8,
      winRate: 76.2,
      country: 'GRE',
      points: 5090,
      bio: 'Greek tennis star with an all-court game and elegant one-handed backhand.',
      tour: 'ATP'
    }
  ],
  WTA: [
    {
      name: 'Iga Świątek',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Iga_%C5%9Awi%C4%85tek_%2852425455190%29.jpg/200px-Iga_%C5%9Awi%C4%85tek_%2852425455190%29.jpg',
      rank: 1,
      winRate: 85.3,
      country: 'POL',
      points: 9770,
      bio: 'Polish tennis champion known for her aggressive style and mental strength.',
      tour: 'WTA'
    },
    {
      name: 'Aryna Sabalenka',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Aryna_Sabalenka_%2851425035477%29.jpg/200px-Aryna_Sabalenka_%2851425035477%29.jpg',
      rank: 2,
      winRate: 83.1,
      country: 'BLR',
      points: 8195,
      bio: 'Belarusian power player with one of the most aggressive games on tour.',
      tour: 'WTA'
    },
    {
      name: 'Elena Rybakina',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Elena_Rybakina_%2851425995173%29.jpg/200px-Elena_Rybakina_%2851425995173%29.jpg',
      rank: 3,
      winRate: 81.7,
      country: 'KAZ',
      points: 7765,
      bio: 'Kazakhstani player with a powerful serve and aggressive baseline game.',
      tour: 'WTA'
    },
    {
      name: 'Coco Gauff',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coco_Gauff_%2851425031612%29.jpg/200px-Coco_Gauff_%2851425031612%29.jpg',
      rank: 4,
      winRate: 80.9,
      country: 'USA',
      points: 7160,
      bio: 'American tennis prodigy known for her athleticism and competitive spirit.',
      tour: 'WTA'
    },
    {
      name: 'Jessica Pegula',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jessica_Pegula_%2851425032797%29.jpg/200px-Jessica_Pegula_%2851425032797%29.jpg',
      rank: 5,
      winRate: 79.5,
      country: 'USA',
      points: 6640,
      bio: 'American player known for her consistent baseline game and mental toughness.',
      tour: 'WTA'
    },
    {
      name: 'Ons Jabeur',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ons_Jabeur_%2851425034782%29.jpg/200px-Ons_Jabeur_%2851425034782%29.jpg',
      rank: 6,
      winRate: 78.8,
      country: 'TUN',
      points: 6196,
      bio: 'Tunisian player known for her creative play and variety of shots.',
      tour: 'WTA'
    },
    {
      name: 'Markéta Vondroušová',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mark%C3%A9ta_Vondrou%C5%A1ov%C3%A1_%2851425035072%29.jpg/200px-Mark%C3%A9ta_Vondrou%C5%A1ov%C3%A1_%2851425035072%29.jpg',
      rank: 7,
      winRate: 77.4,
      country: 'CZE',
      points: 5705,
      bio: 'Czech player known for her left-handed play and tactical intelligence.',
      tour: 'WTA'
    },
    {
      name: 'Maria Sakkari',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Maria_Sakkari_%2851425035397%29.jpg/200px-Maria_Sakkari_%2851425035397%29.jpg',
      rank: 8,
      winRate: 76.9,
      country: 'GRE',
      points: 5265,
      bio: 'Greek player known for her athleticism and powerful groundstrokes.',
      tour: 'WTA'
    }
  ]
};

interface PlayerCarouselProps {
  tour?: 'ATP' | 'WTA';
}

const PlayerCarousel: FC<PlayerCarouselProps> = ({ tour = 'ATP' }) => {
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

  const players = topPlayers[tour];

  return (
    <div className="relative bg-green-900/50 rounded-lg p-6 shadow-md group">
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
          {players.map(player => (
            <div key={player.name} className="bg-green-900/30 p-4 rounded-md shadow-sm flex-none w-[300px] snap-start">
              <div className="flex items-center space-x-3">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-green-400"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-neutral-100 truncate block">
                        <Link to={`/player/${encodeURIComponent(player.name)}`} className="hover:underline text-green-300">{player.name}</Link>
                      </span>
                      <span className="text-xs text-neutral-400">{player.country}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-neutral-300 flex-shrink-0">Rank #{player.rank}</span>
                      <span className="text-xs text-neutral-400">{player.points} pts</span>
                    </div>
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
