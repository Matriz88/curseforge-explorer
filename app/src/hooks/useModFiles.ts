import { useQuery } from '@tanstack/react-query';
import { useApiKey } from './useApiKey';
import { curseforgeApi } from '../api/curseforge';
import type { PaginatedResponse, ModFile, GetModFilesParams } from '../api/types';
import { API } from '../config/constants';

export const useModFiles = (params: Omit<GetModFilesParams, 'modId'> & { modId: string }) => {
  const { apiKey } = useApiKey();
  const index = params.index ?? API.DEFAULT_PAGE_INDEX;
  const pageSize = params.pageSize ?? API.DEFAULT_PAGE_SIZE;

  return useQuery<PaginatedResponse<ModFile>, Error>({
    queryKey: ['modFiles', apiKey, params.modId, index, pageSize],
    queryFn: async () => {
      return curseforgeApi.getModFiles(apiKey, {
        modId: params.modId,
        index,
        pageSize,
      });
    },
    enabled: !!apiKey && apiKey.length > 0 && !!params.modId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
