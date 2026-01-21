import { createLazyFileRoute } from '@tanstack/react-router';
import { useApiKey } from '../hooks/useApiKey';
import { GamesList } from '../features/games/GamesList';

export const Route = createLazyFileRoute('/')({
  component: () => {
    const { apiKey } = useApiKey();

    if (!apiKey) {
      return <div />;
    }

    return <GamesList />;
  },
});
