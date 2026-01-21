import { createFileRoute } from '@tanstack/react-router';
import { useApiKey } from '../../hooks/useApiKey';
import { ModDetail } from '../../features/mods/ModDetail';

export const Route = createFileRoute('/mods/$modId')({
  component: () => {
    const { apiKey } = useApiKey();
    const { modId } = Route.useParams();

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

    return <ModDetail modId={modId} />;
  },
});
