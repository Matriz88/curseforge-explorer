import { useState, useEffect } from 'react';
import { useApiKey } from '../../hooks/useApiKey';

export const Header = () => {
  const { apiKey, setApiKey } = useApiKey();
  const [inputValue, setInputValue] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setInputValue(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    setApiKey(inputValue);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleClear = () => {
    setInputValue('');
    setApiKey('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg border-b border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <h1 className="text-2xl font-bold text-white whitespace-nowrap">CurseForge Explorer</h1>
          <div className="flex-1 max-w-2xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="Enter CurseForge API Key"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 pr-10 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none focus:text-white transition-colors cursor-pointer"
                  aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                >
                  {showApiKey ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 cursor-pointer disabled:cursor-not-allowed text-white rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Save
              </button>
              {apiKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Clear
                </button>
              )}
            </div>
            {showSuccess && (
              <p className="mt-1 text-xs text-green-400">API key saved successfully</p>
            )}
            {apiKey && !showSuccess && <p className="mt-1 text-xs text-gray-400">API key is set</p>}
          </div>
        </div>
      </div>
    </header>
  );
};
