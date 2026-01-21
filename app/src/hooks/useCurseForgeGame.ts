import { useQuery } from '@tanstack/react-query';
import { useApiKey } from './useApiKey';
import { curseforgeApi } from '../api/curseforge';
import type { Game } from '../api/types';

export const useCurseForgeGame = (gameId: string) => {
  const { apiKey } = useApiKey();

  return useQuery<Game, Error>({
    queryKey: ['game', apiKey, gameId],
    queryFn: () => curseforgeApi.getGame(apiKey, gameId),
    enabled: !!apiKey && apiKey.length > 0 && !!gameId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
