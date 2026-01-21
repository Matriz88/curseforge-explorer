import { createApiClient } from './client';
import type { PaginatedResponse, Game, Mod, ModDetail } from './types';
import { API } from '../config/constants';

export interface GetGamesParams {
  index?: number;
  pageSize?: number;
}

export interface SearchModsParams {
  gameId: number;
  searchFilter?: string;
  sortField?: number;
  sortOrder?: 'asc' | 'desc';
  index?: number;
  pageSize?: number;
}

export const courseforgeApi = {
  getGames: async (apiKey: string, params?: GetGamesParams): Promise<PaginatedResponse<Game>> => {
    const client = createApiClient(apiKey);
    const response = await client.get<PaginatedResponse<Game>>('/games', {
      params: {
        index: params?.index ?? API.DEFAULT_PAGE_INDEX,
        pageSize: params?.pageSize ?? API.DEFAULT_PAGE_SIZE,
      },
    });
    return response.data;
  },
  
  getGame: async (apiKey: string, gameId: string): Promise<Game> => {
    const client = createApiClient(apiKey);
    const response = await client.get<Game | { data: Game }>(`/games/${gameId}`);
    const data = response.data;
    if (data && typeof data === 'object' && 'data' in data && !('id' in data)) {
      return (data as { data: Game }).data;
    }
    return data as Game;
  },
  
  getMods: async (apiKey: string) => {
    const client = createApiClient(apiKey);
    const response = await client.get('/mods');
    return response.data;
  },
  
  getMod: async (apiKey: string, modId: string): Promise<ModDetail> => {
    const client = createApiClient(apiKey);
    const response = await client.get<{ data: ModDetail }>(`/mods/${modId}`);
    return response.data.data;
  },
  
  getFiles: async (apiKey: string) => {
    const client = createApiClient(apiKey);
    const response = await client.get('/files');
    return response.data;
  },
  
  getFile: async (apiKey: string, fileId: string) => {
    const client = createApiClient(apiKey);
    const response = await client.get(`/files/${fileId}`);
    return response.data;
  },
  
  searchMods: async (apiKey: string, params: SearchModsParams): Promise<PaginatedResponse<Mod>> => {
    const client = createApiClient(apiKey);
    const queryParams: Record<string, string | number> = {
      gameId: params.gameId,
      index: params.index ?? API.DEFAULT_PAGE_INDEX,
      pageSize: params.pageSize ?? API.DEFAULT_PAGE_SIZE,
    };
    
    if (params.searchFilter) {
      queryParams.searchFilter = params.searchFilter;
    }
    if (params.sortField) {
      queryParams.sortField = params.sortField;
    }
    if (params.sortOrder) {
      queryParams.sortOrder = params.sortOrder;
    }
    
    const response = await client.get<PaginatedResponse<Mod>>('/mods/search', {
      params: queryParams,
    });
    return response.data;
  },
};
