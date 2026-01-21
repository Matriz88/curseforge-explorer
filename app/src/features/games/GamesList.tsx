import { useState } from 'react';
import { useCurseForgeGames } from '../../hooks/useCurseForgeGames';
import { GameCard } from './GameCard';
import { Pagination } from '../../components/ui/Pagination';
import { PAGINATION } from '../../config/constants';

export const GamesList = () => {
  const [currentPage, setCurrentPage] = useState<number>(PAGINATION.DEFAULT_PAGE_INDEX);
  const [pageSize, setPageSize] = useState<number>(PAGINATION.DEFAULT_PAGE_SIZE);

  const apiIndex = currentPage * pageSize;

  const { data, isLoading, error, isError } = useCurseForgeGames({
    index: apiIndex,
    pageSize,
  });

  const totalCount = data?.pagination?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(0);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading games...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-950/50 border border-red-800/50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Error loading games</h2>
          <p className="text-red-300">
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </p>
          <p className="text-sm text-red-400 mt-2">Please check your API key and try again.</p>
        </div>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No games found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Games</h2>
        <p className="text-gray-400">
          Showing {data.data.length} of {totalCount} games
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          disabled={isLoading}
        />
      )}
    </div>
  );
};
