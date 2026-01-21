import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { useApiKey } from '../../hooks/useApiKey';
import { ModDetail } from '../../features/mods/ModDetail';

function ModDetailPage() {
  const { apiKey } = useApiKey();
  const { modId } = Route.useParams();
  const location = useLocation();

  if (!apiKey) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-950/50 border border-yellow-800/50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-400 mb-2">API Key Required</h2>
          <p className="text-yellow-300">
            Please enter your API key in the header to view mod details.
          </p>
        </div>
      </div>
    );
  }

  // Check if we're on a child route (like /files)
  const isChildRoute = location.pathname.includes('/files');

  if (isChildRoute) {
    return <Outlet />;
  }

  return <ModDetail modId={modId} />;
}

export const Route = createFileRoute('/mods/$modId')({
  component: ModDetailPage,
});
