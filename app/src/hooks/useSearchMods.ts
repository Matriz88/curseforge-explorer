import { useQuery } from '@tanstack/react-query';
import { useApiKey } from './useApiKey';
import { courseforgeApi } from '../api/courseforge';
import type { PaginatedResponse, Mod } from '../api/types';
import { API } from '../config/constants';

interface UseSearchModsParams {
  gameId: number;
  searchFilter?: string;
  sortField?: number;
  sortOrder?: 'asc' | 'desc';
  index?: number;
  pageSize?: number;
}

export const useSearchMods = (params: UseSearchModsParams) => {
  const { apiKey } = useApiKey();
  const index = params.index ?? API.DEFAULT_PAGE_INDEX;
  const pageSize = params.pageSize ?? API.DEFAULT_PAGE_SIZE;

  return useQuery<PaginatedResponse<Mod>, Error>({
    queryKey: ['mods', 'search', apiKey, params.gameId, params.searchFilter, params.sortField, params.sortOrder],
    queryFn: () => courseforgeApi.searchMods(apiKey, {
      gameId: params.gameId,
      searchFilter: params.searchFilter,
      sortField: params.sortField,
      sortOrder: params.sortOrder,
      index,
      pageSize,
    }),
    enabled: !!apiKey && apiKey.length > 0 && !!params.gameId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
