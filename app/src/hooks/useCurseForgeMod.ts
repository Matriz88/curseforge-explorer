import { useQuery } from '@tanstack/react-query';
import { useApiKey } from './useApiKey';
import { courseforgeApi } from '../api/courseforge';
import type { ModDetail } from '../api/types';

export const useCurseForgeMod = (modId: string) => {
  const { apiKey } = useApiKey();

  return useQuery<ModDetail, Error>({
    queryKey: ['mod', apiKey, modId],
    queryFn: () => courseforgeApi.getMod(apiKey, modId),
    enabled: !!apiKey && apiKey.length > 0 && !!modId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
