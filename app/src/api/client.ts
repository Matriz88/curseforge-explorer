import axios from 'axios';

export const createApiClient = (apiKey: string) => {
  return axios.create({
    baseURL: 'https://api.curseforge.com/v1',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
  });
};
