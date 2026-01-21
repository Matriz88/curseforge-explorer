export const ApiKeyGuide = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-md border border-gray-800 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">How to Get Your CurseForge API Key</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <p className="text-gray-300 mb-2">
                  Log in to the{' '}
                  <a
                    href="https://console.curseforge.com/?#/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
                  >
                    CurseForge Console
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <p className="text-gray-300">
                  Create a new organization by entering a name, or skip this step if you already
                  have one
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <p className="text-gray-300">Open the API keys section in the console</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="flex-1">
                <p className="text-gray-300 mb-4">Copy the API key value from the console</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mt-4">
                  <a
                    href="/curseforge-explorer/api-keys-screenshot.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer"
                  >
                    <img
                      src="/curseforge-explorer/api-keys-screenshot.png"
                      alt="CurseForge API Keys section screenshot"
                      className="w-full max-w-2xl rounded border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              Once you have your API key, paste it in the header field above to start exploring
              CurseForge content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
