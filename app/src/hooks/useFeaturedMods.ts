import { useQuery } from '@tanstack/react-query';
import { useApiKey } from './useApiKey';
import { curseforgeApi } from '../api/curseforge';
import type { Mod } from '../api/types';

interface UseFeaturedModsParams {
  gameId: number;
  enabled?: boolean;
}

export const useFeaturedMods = (params: UseFeaturedModsParams) => {
  const { apiKey } = useApiKey();

  return useQuery<Mod[], Error>({
    queryKey: ['mods', 'featured', apiKey, params.gameId],
    queryFn: () => curseforgeApi.getFeaturedMods(apiKey, params.gameId),
    enabled:
      (params.enabled !== undefined ? params.enabled : true) &&
      !!apiKey &&
      apiKey.length > 0 &&
      !!params.gameId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
