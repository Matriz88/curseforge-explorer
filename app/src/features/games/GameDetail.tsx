import { useState } from 'react';
import { useSearchMods } from '../../hooks/useSearchMods';
import { useCurseForgeGame } from '../../hooks/useCurseForgeGame';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ModsList } from '../mods/ModsList';
import { Pagination } from '../../components/ui/Pagination';
import { SortField } from '../../api/types';
import { PAGINATION } from '../../config/constants';

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
  const [activeSearchFilter, setActiveSearchFilter] = useState<string>('');
  const [sortField, setSortField] = useState<number>(SortField.TotalDownloads);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(PAGINATION.DEFAULT_PAGE_INDEX);
  const [pageSize, setPageSize] = useState<number>(PAGINATION.DEFAULT_PAGE_SIZE);

  const numericGameId = parseInt(gameId, 10);
  const apiIndex = currentPage * pageSize;

  const {
    data: game,
    isLoading: isLoadingGame,
    isError: isErrorGame,
    error: gameError,
  } = useCurseForgeGame(gameId);

  const {
    data: modsData,
    isLoading: isLoadingMods,
    isError: isErrorMods,
    error: modsError,
  } = useSearchMods({
    gameId: numericGameId,
    searchFilter: activeSearchFilter,
    sortField,
    sortOrder,
    index: apiIndex,
    pageSize,
  });

  const handleSearch = () => {
    setActiveSearchFilter(searchFilter.trim());
    setCurrentPage(PAGINATION.DEFAULT_PAGE_INDEX);
  };

  const handleClearSearch = () => {
    setSearchFilter('');
    setActiveSearchFilter('');
    setCurrentPage(PAGINATION.DEFAULT_PAGE_INDEX);
  };

  const handleSortFieldChange = (newSortField: number) => {
    setSortField(newSortField);
    setCurrentPage(PAGINATION.DEFAULT_PAGE_INDEX);
  };

  const handleSortOrderChange = (newSortOrder: 'asc' | 'desc') => {
    setSortOrder(newSortOrder);
    setCurrentPage(PAGINATION.DEFAULT_PAGE_INDEX);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(PAGINATION.DEFAULT_PAGE_INDEX);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const coverUrl = game.assets?.coverUrl;

  const totalCount = modsData?.pagination?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      {coverUrl && (
        <div className="w-full mb-6">
          <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden">
            <img
              src={coverUrl}
              alt={`${game.name} cover`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: game?.name || 'Loading...' }]} />

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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
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
                onChange={(e) => handleSortFieldChange(Number(e.target.value))}
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
                onChange={(e) => handleSortOrderChange(e.target.value as 'asc' | 'desc')}
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
              <p className="text-gray-400">Loading mods...</p>
            </div>
          </div>
        ) : isErrorMods ? (
          <div className="bg-red-950/50 border border-red-800/50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-400 mb-2">Error loading mods</h2>
            <p className="text-red-300">
              {modsError instanceof Error ? modsError.message : 'An unknown error occurred'}
            </p>
          </div>
        ) : modsData && modsData.data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {activeSearchFilter.trim() !== ''
                ? 'No mods found matching your search'
                : 'No mods available'}
            </p>
          </div>
        ) : (
          <>
            {modsData && modsData.pagination && (
              <div className="mb-4 text-sm text-gray-400">
                Showing {modsData.data.length} of {modsData.pagination.totalCount} mods
              </div>
            )}
            <ModsList mods={modsData?.data ?? []} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              disabled={isLoadingMods}
            />
          </>
        )}
      </div>
    </>
  );
};
