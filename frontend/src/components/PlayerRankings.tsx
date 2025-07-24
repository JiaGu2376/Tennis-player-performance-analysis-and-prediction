import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PlayerRankingsProps {
  initialTour?: 'ATP' | 'WTA';
}

// Define the player data structure
const defaultPlayerImage = '/default-avatar.png';
const topPlayers = {
  ATP: [
    {
      name: 'Novak Djokovic',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/200px-Novak_Djokovic_Queen%27s_Club_2018.jpg',
      rank: 1,
      points: 11000,
      country: 'Serbia',
      winRate: 85,
      tour: 'ATP'
    },
    {
      name: 'Carlos Alcaraz',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg/200px-Carlos_Alcaraz_%28ESP%29_%2852424771144%29.jpg',
      rank: 2,
      points: 10000,
      country: 'Spain',
      winRate: 82,
      tour: 'ATP'
    },
    {
      name: 'Jannik Sinner',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jannik_Sinner_%2852425461875%29.jpg/200px-Jannik_Sinner_%2852425461875%29.jpg',
      rank: 3,
      points: 8900,
      country: 'Italy',
      winRate: 80,
      tour: 'ATP'
    },
    {
      name: 'Daniil Medvedev',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Daniil_Medvedev_%2852425461890%29.jpg/200px-Daniil_Medvedev_%2852425461890%29.jpg',
      rank: 4,
      points: 8500,
      country: 'Russia',
      winRate: 78,
      tour: 'ATP'
    },
    {
      name: 'Alexander Zverev',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Alexander_Zverev_%2851635591102%29.jpg/200px-Alexander_Zverev_%2851635591102%29.jpg',
      rank: 5,
      points: 7800,
      country: 'Germany',
      winRate: 76,
      tour: 'ATP'
    },
    {
      name: 'Stefanos Tsitsipas',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Stefanos_Tsitsipas_%2851635591117%29.jpg/200px-Stefanos_Tsitsipas_%2851635591117%29.jpg',
      rank: 6,
      points: 7200,
      country: 'Greece',
      winRate: 75,
      tour: 'ATP'
    },
    {
      name: 'Andrey Rublev',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Andrey_Rublev_%2852425454895%29.jpg/200px-Andrey_Rublev_%2852425454895%29.jpg',
      rank: 7,
      points: 6800,
      country: 'Russia',
      winRate: 74,
      tour: 'ATP'
    },
    {
      name: 'Holger Rune',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Holger_Rune_%2851972681843%29.jpg/200px-Holger_Rune_%2851972681843%29.jpg',
      rank: 8,
      points: 6500,
      country: 'Denmark',
      winRate: 73,
      tour: 'ATP'
    },
    {
      name: 'Hubert Hurkacz',
      image: defaultPlayerImage,
      rank: 9,
      points: 6200,
      country: 'Poland',
      winRate: 72,
      tour: 'ATP'
    },
    {
      name: 'Taylor Fritz',
      image: defaultPlayerImage,
      rank: 10,
      points: 5900,
      country: 'USA',
      winRate: 71,
      tour: 'ATP'
    },
    {
      name: 'Casper Ruud',
      image: defaultPlayerImage,
      rank: 11,
      points: 5600,
      country: 'Norway',
      winRate: 70,
      tour: 'ATP'
    },
    {
      name: 'Frances Tiafoe',
      image: defaultPlayerImage,
      rank: 12,
      points: 5300,
      country: 'USA',
      winRate: 69,
      tour: 'ATP'
    },
    {
      name: 'Tommy Paul',
      image: defaultPlayerImage,
      rank: 13,
      points: 5000,
      country: 'USA',
      winRate: 68,
      tour: 'ATP'
    },
    {
      name: 'Karen Khachanov',
      image: defaultPlayerImage,
      rank: 14,
      points: 4700,
      country: 'Russia',
      winRate: 67,
      tour: 'ATP'
    },
    {
      name: 'Alex de Minaur',
      image: defaultPlayerImage,
      rank: 15,
      points: 4400,
      country: 'Australia',
      winRate: 66,
      tour: 'ATP'
    },
    {
      name: 'Cameron Norrie',
      image: defaultPlayerImage,
      rank: 16,
      points: 4100,
      country: 'Great Britain',
      winRate: 65,
      tour: 'ATP'
    },
    {
      name: 'Ben Shelton',
      image: defaultPlayerImage,
      rank: 17,
      points: 3800,
      country: 'USA',
      winRate: 64,
      tour: 'ATP'
    },
    {
      name: 'Lorenzo Musetti',
      image: defaultPlayerImage,
      rank: 18,
      points: 3500,
      country: 'Italy',
      winRate: 63,
      tour: 'ATP'
    },
    {
      name: 'Grigor Dimitrov',
      image: defaultPlayerImage,
      rank: 19,
      points: 3200,
      country: 'Bulgaria',
      winRate: 62,
      tour: 'ATP'
    },
    {
      name: 'Nicolas Jarry',
      image: defaultPlayerImage,
      rank: 20,
      points: 2900,
      country: 'Chile',
      winRate: 61,
      tour: 'ATP'
    }
  ],
  WTA: [
    {
      name: 'Iga Świątek',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Iga_%C5%9Awi%C4%85tek_%2852425455190%29.jpg/200px-Iga_%C5%9Awi%C4%85tek_%2852425455190%29.jpg',
      rank: 1,
      points: 10500,
      country: 'Poland',
      winRate: 87,
      tour: 'WTA'
    },
    {
      name: 'Aryna Sabalenka',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Aryna_Sabalenka_%2851425035477%29.jpg/200px-Aryna_Sabalenka_%2851425035477%29.jpg',
      rank: 2,
      points: 9500,
      country: 'Belarus',
      winRate: 83,
      tour: 'WTA'
    },
    {
      name: 'Elena Rybakina',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Elena_Rybakina_%2851425995173%29.jpg/200px-Elena_Rybakina_%2851425995173%29.jpg',
      rank: 3,
      points: 8800,
      country: 'Kazakhstan',
      winRate: 81,
      tour: 'WTA'
    },
    {
      name: 'Coco Gauff',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coco_Gauff_%2851425031612%29.jpg/200px-Coco_Gauff_%2851425031612%29.jpg',
      rank: 4,
      points: 8400,
      country: 'USA',
      winRate: 79,
      tour: 'WTA'
    },
    {
      name: 'Jessica Pegula',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jessica_Pegula_%2851425032797%29.jpg/200px-Jessica_Pegula_%2851425032797%29.jpg',
      rank: 5,
      points: 7900,
      country: 'USA',
      winRate: 77,
      tour: 'WTA'
    },
    {
      name: 'Ons Jabeur',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ons_Jabeur_%2851425034782%29.jpg/200px-Ons_Jabeur_%2851425034782%29.jpg',
      rank: 6,
      points: 7300,
      country: 'Tunisia',
      winRate: 76,
      tour: 'WTA'
    },
    {
      name: 'Markéta Vondroušová',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mark%C3%A9ta_Vondrou%C5%A1ov%C3%A1_%2851425035072%29.jpg/200px-Mark%C3%A9ta_Vondrou%C5%A1ov%C3%A1_%2851425035072%29.jpg',
      rank: 7,
      points: 6900,
      country: 'Czech Republic',
      winRate: 75,
      tour: 'WTA'
    },
    {
      name: 'Maria Sakkari',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Maria_Sakkari_%2851425035397%29.jpg/200px-Maria_Sakkari_%2851425035397%29.jpg',
      rank: 8,
      points: 6600,
      country: 'Greece',
      winRate: 74,
      tour: 'WTA'
    },
    {
      name: 'Karolína Muchová',
      image: defaultPlayerImage,
      rank: 9,
      points: 6300,
      country: 'Czech Republic',
      winRate: 73,
      tour: 'WTA'
    },
    {
      name: 'Petra Kvitová',
      image: defaultPlayerImage,
      rank: 10,
      points: 6000,
      country: 'Czech Republic',
      winRate: 72,
      tour: 'WTA'
    },
    {
      name: 'Barbora Krejčíková',
      image: defaultPlayerImage,
      rank: 11,
      points: 5700,
      country: 'Czech Republic',
      winRate: 71,
      tour: 'WTA'
    },
    {
      name: 'Madison Keys',
      image: defaultPlayerImage,
      rank: 12,
      points: 5400,
      country: 'USA',
      winRate: 70,
      tour: 'WTA'
    },
    {
      name: 'Beatriz Haddad Maia',
      image: defaultPlayerImage,
      rank: 13,
      points: 5100,
      country: 'Brazil',
      winRate: 69,
      tour: 'WTA'
    },
    {
      name: 'Belinda Bencic',
      image: defaultPlayerImage,
      rank: 14,
      points: 4800,
      country: 'Switzerland',
      winRate: 68,
      tour: 'WTA'
    },
    {
      name: 'Liudmila Samsonova',
      image: defaultPlayerImage,
      rank: 15,
      points: 4500,
      country: 'Russia',
      winRate: 67,
      tour: 'WTA'
    },
    {
      name: 'Victoria Azarenka',
      image: defaultPlayerImage,
      rank: 16,
      points: 4200,
      country: 'Belarus',
      winRate: 66,
      tour: 'WTA'
    },
    {
      name: 'Caroline Garcia',
      image: defaultPlayerImage,
      rank: 17,
      points: 3900,
      country: 'France',
      winRate: 65,
      tour: 'WTA'
    },
    {
      name: 'Ekaterina Alexandrova',
      image: defaultPlayerImage,
      rank: 18,
      points: 3600,
      country: 'Russia',
      winRate: 64,
      tour: 'WTA'
    },
    {
      name: 'Veronika Kudermetova',
      image: defaultPlayerImage,
      rank: 19,
      points: 3300,
      country: 'Russia',
      winRate: 63,
      tour: 'WTA'
    },
    {
      name: 'Jelena Ostapenko',
      image: defaultPlayerImage,
      rank: 20,
      points: 3000,
      country: 'Latvia',
      winRate: 62,
      tour: 'WTA'
    }
  ]
};

const PlayerRankings: FC<PlayerRankingsProps> = ({ initialTour = 'ATP' }) => {
  const [selectedTour, setSelectedTour] = useState<'ATP' | 'WTA'>(initialTour);

  // Get players for selected tour and add mock movement data
  const players = topPlayers[selectedTour].map(player => ({
    ...player,
    movement: Math.floor(Math.random() * 3) - 1, // Random movement between -1, 0, 1
  }));

  return (
    <div className="min-h-screen w-full bg-background text-text">
      <div className="max-w-3xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-medium font-ttcommons">Player Rankings</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedTour('ATP')}
              className={`px-4 py-2 rounded-full transition ${
                selectedTour === 'ATP'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ATP Tour
            </button>
            <button
              onClick={() => setSelectedTour('WTA')}
              className={`px-4 py-2 rounded-full transition ${
                selectedTour === 'WTA'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              WTA Tour
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-green-900/50 rounded-lg shadow-md">
            <thead>
              <tr className="text-neutral-100 text-left text-xl border-b border-green-800/50">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Points</th>
                <th className="py-3 px-4">Win Rate</th>
                <th className="py-3 px-4">Movement</th>
              </tr>
            </thead>
            <tbody>
              {players.sort((a, b) => a.rank - b.rank).map(player => (
                <tr key={player.name} className="border-b border-green-800/30 hover:bg-green-800/40 transition">
                  <td className="py-3 px-4 font-bold text-neutral-100">#{player.rank}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full object-cover border-2 border-green-400" />
                      <Link to={`/player/${encodeURIComponent(player.name)}`} className="text-green-300 hover:underline font-medium">{player.name}</Link>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-neutral-300">{player.country}</td>
                  <td className="py-3 px-4 text-neutral-100">{player.points.toLocaleString()}</td>
                  <td className="py-3 px-4 text-neutral-100">{player.winRate}%</td>
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