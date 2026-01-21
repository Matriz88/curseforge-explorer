import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useSearchMods } from '../../hooks/useSearchMods';
import { useCurseForgeGame } from '../../hooks/useCurseForgeGame';
import { ModsList } from '../mods/ModsList';
import { SortField } from '../../api/types';

interface GameDetailProps {
  gameId: string;
}

const SORT_FIELD_OPTIONS = [
  { value: SortField.Featured, label: 'Featured' },
  { value: SortField.Popularity, label: 'Popularity' },
  { value: SortField.LastUpdated, label: 'Last Updated' },
  { value: SortField.Name, label: 'Name' },
  { value: SortField.Author, label: 'Author' },
  { value: SortField.TotalDownloads, label: 'Total Downloads' },
  { value: SortField.Category, label: 'Category' },
  { value: SortField.GameVersion, label: 'Game Version' },
  { value: SortField.EarlyAccess, label: 'Early Access' },
  { value: SortField.FeaturedReleased, label: 'Featured Released' },
  { value: SortField.ReleasedDate, label: 'Released Date' },
  { value: SortField.Rating, label: 'Rating' },
];

export const GameDetail = ({ gameId }: GameDetailProps) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [activeSearchFilter, setActiveSearchFilter] = useState<string | undefined>(undefined);
  const [sortField, setSortField] = useState<number>(SortField.Featured);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const numericGameId = parseInt(gameId, 10);

  const { data: game, isLoading: isLoadingGame, isError: isErrorGame, error: gameError } = useCurseForgeGame(gameId);
  
  const { data: modsData, isLoading: isLoadingMods, isError: isErrorMods, error: modsError } = useSearchMods({
    gameId: numericGameId,
    searchFilter: activeSearchFilter,
    sortField,
    sortOrder,
  });

  const handleSearch = () => {
    setActiveSearchFilter(searchFilter.trim() || undefined);
  };

  const handleClearSearch = () => {
    setSearchFilter('');
    setActiveSearchFilter(undefined);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isLoadingGame) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading game...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isErrorGame) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-950/50 border border-red-800/50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Error loading game</h2>
          <p className="text-red-300">
            {gameError instanceof Error ? gameError.message : 'An unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Game not found</p>
        </div>
      </div>
    );
  }

  const imageUrl = game.assets?.iconUrl ?? game.assets?.tileUrl ?? game.assets?.coverUrl;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2" aria-hidden="true">
              ›
            </span>
          </li>
          <li>
            <span className="text-gray-300">Search Mod</span>
          </li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="flex items-start gap-4 mb-6">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={game.name}
              className="w-24 h-24 object-cover rounded shrink-0 border border-gray-800"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{game.name}</h1>
            <div className="flex flex-wrap gap-2 text-sm text-gray-400">
              <span>ID: {game.id}</span>
              {game.slug && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>Slug: {game.slug}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Search Mods</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by mod name, author, or both..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 focus:border-blue-500 transition-colors"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <button
              type="button"
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Search
            </button>
            
            <select
              value={sortField}
              onChange={(e) => setSortField(Number(e.target.value))}
              className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
            >
              {SORT_FIELD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {isLoadingMods ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Searching mods...</p>
          </div>
        </div>
      ) : isErrorMods ? (
        <div className="bg-red-950/50 border border-red-800/50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Error searching mods</h2>
          <p className="text-red-300">
            {modsError instanceof Error ? modsError.message : 'An unknown error occurred'}
          </p>
        </div>
      ) : activeSearchFilter === undefined ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Enter a search term and click Search to find mods</p>
        </div>
      ) : modsData && modsData.data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No mods found matching your search</p>
        </div>
      ) : (
        <>
          {modsData && modsData.pagination && (
            <div className="mb-4 text-sm text-gray-400">
              Showing {modsData.data.length} of {modsData.pagination.totalCount} mods
            </div>
          )}
          <ModsList mods={modsData?.data ?? []} />
        </>
      )}
    </div>
  );
};
