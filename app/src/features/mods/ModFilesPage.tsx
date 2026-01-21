import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useModFiles } from '../../hooks/useModFiles';
import { useCurseForgeMod } from '../../hooks/useCurseForgeMod';
import { useCurseForgeGame } from '../../hooks/useCurseForgeGame';
import { ModFilesList } from './ModFilesList';
import { Pagination } from '../../components/ui/Pagination';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { PAGINATION } from '../../config/constants';

interface ModFilesPageProps {
  modId: string;
  initialIndex?: number;
  initialPageSize?: number;
  onParamsChange: (params: { index?: number; pageSize?: number }) => void;
}

export const ModFilesPage = ({
  modId,
  initialIndex,
  initialPageSize,
  onParamsChange,
}: ModFilesPageProps) => {
  const effectivePageSize = initialPageSize ?? PAGINATION.DEFAULT_PAGE_SIZE;
  const initialPage =
    initialIndex !== undefined
      ? Math.floor(initialIndex / effectivePageSize)
      : PAGINATION.DEFAULT_PAGE_INDEX;

  const [internalState, setInternalState] = useState({
    currentPage: initialPage,
    pageSize: effectivePageSize,
  });

  const pageSize = initialPageSize !== undefined ? initialPageSize : internalState.pageSize;
  const currentPage =
    initialIndex !== undefined
      ? Math.floor(initialIndex / pageSize)
      : internalState.currentPage;
  const apiIndex = currentPage * pageSize;

  const { data: mod, isLoading: isLoadingMod } = useCurseForgeMod(modId);
  const { data: game } = useCurseForgeGame(mod?.gameId ? String(mod.gameId) : '');

  const {
    data: filesData,
    isLoading: isLoadingFiles,
    isError: isErrorFiles,
    error: filesError,
  } = useModFiles({
    modId,
    index: apiIndex,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setInternalState((prev) => ({ ...prev, currentPage: newPage }));
    const apiIndexForRoute = newPage * pageSize;
    onParamsChange({ index: apiIndexForRoute, pageSize });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setInternalState((prev) => ({
      ...prev,
      pageSize: newPageSize,
      currentPage: 0,
    }));
    onParamsChange({ index: 0, pageSize: newPageSize });
  };

  if (isLoadingMod) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading mod details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!mod) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Mod not found</p>
        </div>
      </div>
    );
  }

  const totalCount = filesData?.pagination?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          {
            label: game?.name || 'Loading...',
            to: '/games/$gameId',
            params: { gameId: String(mod.gameId) },
          },
          { label: mod.name, to: '/mods/$modId', params: { modId } },
          { label: 'Files' },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mod Files</h1>
            <p className="text-gray-400">
              Exploring files for <span className="text-white font-medium">{mod.name}</span>
            </p>
          </div>
          <Link
            to="/mods/$modId"
            params={{ modId }}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back to Mod Details
          </Link>
        </div>
      </div>

      {/* Files List */}
      {isLoadingFiles ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading files...</p>
          </div>
        </div>
      ) : isErrorFiles ? (
        <div className="bg-red-950/50 border border-red-800/50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Error loading files</h2>
          <p className="text-red-300">
            {filesError instanceof Error ? filesError.message : 'An unknown error occurred'}
          </p>
        </div>
      ) : filesData && filesData.data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No files found</p>
        </div>
      ) : (
        <>
          {filesData && filesData.pagination && (
            <div className="mb-4 text-sm text-gray-400">
              Showing {filesData.data.length} of {filesData.pagination.totalCount} files
            </div>
          )}
          <ModFilesList files={filesData?.data ?? []} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            disabled={isLoadingFiles}
          />
        </>
      )}
    </div>
  );
};
