import { useQuery } from '@tanstack/react-query';
import { useApiKey } from './useApiKey';
import { courseforgeApi } from '../api/courseforge';
import type { PaginatedResponse, Game } from '../api/types';
import { API } from '../config/constants';

interface UseCurseForgeGamesParams {
  index?: number;
  pageSize?: number;
}

export const useCurseForgeGames = (params?: UseCurseForgeGamesParams) => {
  const { apiKey } = useApiKey();
  const index = params?.index ?? API.DEFAULT_PAGE_INDEX;
  const pageSize = params?.pageSize ?? API.DEFAULT_PAGE_SIZE;

  return useQuery<PaginatedResponse<Game>, Error>({
    queryKey: ['games', apiKey, index, pageSize],
    queryFn: () => courseforgeApi.getGames(apiKey, { index, pageSize }),
    enabled: !!apiKey && apiKey.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
