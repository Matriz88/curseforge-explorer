import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useApiKey } from '../../../hooks/useApiKey';
import { ModFilesPage } from '../../../features/mods/ModFilesPage';
import { PAGINATION } from '../../../config/constants';

function ModFilesPageRoute() {
  const { apiKey } = useApiKey();
  const { modId } = Route.useParams();
  const navigate = useNavigate({ from: '/mods/$modId/files' });
  const search = Route.useSearch();

  if (!apiKey) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-950/50 border border-yellow-800/50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-2">API Key Required</h2>
          <p className="text-yellow-300">
            Please enter your API key in the header to view mod files.
          </p>
        </div>
      </div>
    );
  }

  const handleParamsChange = (params: { index?: number; pageSize?: number }) => {
    navigate({
      search: {
        index: params.index ?? PAGINATION.DEFAULT_PAGE_INDEX,
        pageSize: params.pageSize ?? PAGINATION.DEFAULT_PAGE_SIZE,
      },
    });
  };

  return (
    <ModFilesPage
      modId={modId}
      initialIndex={search.index}
      initialPageSize={search.pageSize}
      onParamsChange={handleParamsChange}
    />
  );
}

export const Route = createFileRoute('/mods/$modId/files')({
  component: ModFilesPageRoute,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      index:
        typeof search.index === 'number'
          ? search.index
          : typeof search.index === 'string'
            ? parseInt(search.index, 10)
            : PAGINATION.DEFAULT_PAGE_INDEX,
      pageSize:
        typeof search.pageSize === 'number'
          ? search.pageSize
          : typeof search.pageSize === 'string'
            ? parseInt(search.pageSize, 10)
            : PAGINATION.DEFAULT_PAGE_SIZE,
    };
  },
});
