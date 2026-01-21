import { Link } from '@tanstack/react-router';
import type { Game } from '../../api/types';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const imageUrl = game.assets?.iconUrl ?? game.assets?.tileUrl ?? game.assets?.coverUrl;

  return (
    <Link
      to="/games/$gameId"
      params={{ gameId: String(game.id) }}
      className="bg-gray-900 rounded-lg shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all p-6 border border-gray-800 hover:border-gray-700 cursor-pointer block"
    >
      <div className="flex items-start gap-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={game.name}
            className="w-20 h-20 object-cover rounded shrink-0 border border-gray-800"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">{game.name}</h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-400">
            <span>ID: {game.id}</span>
            {game.slug && <span className="text-gray-600">•</span>}
            {game.slug && <span className="truncate">Slug: {game.slug}</span>}
          </div>
          {game.dateModified && (
            <p className="text-xs text-gray-500 mt-2">
              Modified: {new Date(game.dateModified).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
