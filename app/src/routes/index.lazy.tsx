import { createLazyFileRoute } from '@tanstack/react-router';
import { useApiKey } from '../hooks/useApiKey';
import { GamesList } from '../features/games/GamesList';
import { ApiKeyGuide } from '../components/layout/ApiKeyGuide';

export const Route = createLazyFileRoute('/')({
  component: () => {
    const { apiKey } = useApiKey();

    if (!apiKey) {
      return <ApiKeyGuide />;
    }

    return <GamesList />;
  },
});
