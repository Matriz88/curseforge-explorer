import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ApiKeyContext } from './ApiKeyContext';

const STORAGE_KEY = 'curseforge-api-key';

interface ApiKeyProviderProps {
  children: ReactNode;
}

export const ApiKeyProvider = ({ children }: ApiKeyProviderProps) => {
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      if (apiKey) {
        localStorage.setItem(STORAGE_KEY, apiKey);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage not available (private browsing, etc.)
      // Fallback to in-memory state only
    }
  }, [apiKey]);

  return <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>{children}</ApiKeyContext.Provider>;
};
