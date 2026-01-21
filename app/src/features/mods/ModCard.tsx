import { Link } from '@tanstack/react-router';
import type { Mod } from '../../api/types';

interface ModCardProps {
  mod: Mod;
}

export const ModCard = ({ mod }: ModCardProps) => {
  const authors = mod.authors && Array.isArray(mod.authors) ? mod.authors : [];
  const authorNames = authors.map((author) => author.name || 'Unknown').join(', ');
  const logoUrl = mod.logo?.thumbnailUrl;

  return (
    <Link
      // @ts-expect-error - Route will be available after route tree regeneration
      to="/mods/$modId"
      params={{ modId: String(mod.id) } as any}
      className="bg-gray-900 rounded-lg shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all p-6 border border-gray-800 hover:border-gray-700 cursor-pointer block"
    >
      <div className="flex items-start gap-4">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={mod.name}
            className="w-20 h-20 object-cover rounded shrink-0 border border-gray-800"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1 truncate">
                {mod.name}
              </h3>
              {authorNames && (
                <p className="text-sm text-gray-400 mb-2">
                  By: {authorNames}
                </p>
              )}
            </div>
            {mod.description && (
              <p className="text-sm text-gray-300 line-clamp-3">
                {mod.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 text-xs text-gray-400">
              <span>ID: {mod.id}</span>
              {mod.gameId && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>Game ID: {mod.gameId}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
