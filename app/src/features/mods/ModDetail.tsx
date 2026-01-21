import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useCurseForgeMod } from '../../hooks/useCurseForgeMod';

interface ModDetailProps {
  modId: string;
}

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return 'Unknown';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleString();
};

const getReleaseTypeName = (type?: number): string => {
  const types: Record<number, string> = {
    1: 'Release',
    2: 'Beta',
    3: 'Alpha',
  };
  return types[type ?? 1] ?? 'Unknown';
};

const getFileStatusName = (status?: number): string => {
  const statuses: Record<number, string> = {
    1: 'Processing',
    2: 'ChangesRequired',
    3: 'UnderReview',
    4: 'Approved',
    5: 'Rejected',
    6: 'MalwareDetected',
    7: 'Deleted',
    8: 'Archived',
    9: 'Testing',
    10: 'Released',
    11: 'ReadyForReview',
    12: 'Deprecated',
    13: 'Baking',
    14: 'AwaitingPublishing',
    15: 'FailedPublishing',
  };
  return statuses[status ?? 1] ?? 'Unknown';
};

export const ModDetail = ({ modId }: ModDetailProps) => {
  const [expandedScreenshot, setExpandedScreenshot] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    metadata: false,
    fileIndexes: false,
    earlyAccessIndexes: false,
  });

  const { data: mod, isLoading, isError, error } = useCurseForgeMod(modId);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading mod details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-950/50 border border-red-800/50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Error loading mod</h2>
          <p className="text-red-300">
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }

  if (!mod) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Mod not found</p>
        </div>
      </div>
    );
  }

  const logoUrl = mod.logo?.thumbnailUrl ?? mod.logo?.url;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2" aria-hidden="true">
              ›
            </span>
          </li>
          <li>
            <Link
              to="/games/$gameId"
              params={{ gameId: String(mod.gameId) }}
              className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
            >
              Search Mod
            </Link>
          </li>
          <li>
            <span className="text-gray-500 mx-2" aria-hidden="true">
              ›
            </span>
          </li>
          <li>
            <span className="text-gray-300">{mod.name}</span>
          </li>
        </ol>
      </nav>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start gap-6 mb-6">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={mod.name}
              className="w-32 h-32 object-cover rounded shrink-0 border border-gray-800"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{mod.name}</h1>
              {mod.isFeatured && (
                <span className="px-2 py-1 bg-yellow-600 text-yellow-100 text-xs font-semibold rounded">
                  Featured
                </span>
              )}
            </div>
            {mod.authors && mod.authors.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-gray-400">
                  By:{' '}
                  {mod.authors.map((author, idx) => (
                    <span key={author.id ?? idx}>
                      {author.url ? (
                        <a
                          href={author.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 cursor-pointer"
                        >
                          {author.name}
                        </a>
                      ) : (
                        <span>{author.name}</span>
                      )}
                      {idx < mod.authors!.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>Downloads: {mod.downloadCount?.toLocaleString() ?? '0'}</span>
              {mod.rating !== undefined && <span>Rating: {mod.rating}</span>}
              {mod.thumbsUpCount !== undefined && <span>Thumbs Up: {mod.thumbsUpCount}</span>}
              {mod.gamePopularityRank !== undefined && (
                <span>Popularity Rank: #{mod.gamePopularityRank}</span>
              )}
              {mod.status !== undefined && <span>Status: {getFileStatusName(mod.status)}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* General Information Section */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">General Information</h2>
        {mod.summary && (
          <div className="mb-4">
            <p className="text-gray-300 whitespace-pre-wrap">{mod.summary}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mod.links && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Links</h3>
              <div className="flex flex-wrap gap-2">
                {mod.links.websiteUrl && (
                  <a
                    href={mod.links.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded cursor-pointer transition-colors"
                  >
                    Website
                  </a>
                )}
                {mod.links.wikiUrl && (
                  <a
                    href={mod.links.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded cursor-pointer transition-colors"
                  >
                    Wiki
                  </a>
                )}
                {mod.links.issuesUrl && (
                  <a
                    href={mod.links.issuesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded cursor-pointer transition-colors"
                  >
                    Issues
                  </a>
                )}
                {mod.links.sourceUrl && (
                  <a
                    href={mod.links.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded cursor-pointer transition-colors"
                  >
                    Source
                  </a>
                )}
              </div>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Dates</h3>
            <div className="space-y-1 text-sm text-gray-300">
              {mod.dateCreated && <p>Created: {formatDate(mod.dateCreated)}</p>}
              {mod.dateModified && <p>Modified: {formatDate(mod.dateModified)}</p>}
              {mod.dateReleased && <p>Released: {formatDate(mod.dateReleased)}</p>}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">IDs</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <p>Mod ID: {mod.id}</p>
              <p>Game ID: {mod.gameId}</p>
              {mod.slug && <p>Slug: {mod.slug}</p>}
            </div>
          </div>
          {mod.categories && mod.categories.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {mod.categories.map((category) => (
                  <span
                    key={category.id}
                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Screenshots Gallery */}
      {mod.screenshots && mod.screenshots.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Screenshots</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mod.screenshots.map((screenshot) => (
              <div
                key={screenshot.id}
                className="relative cursor-pointer"
                onClick={() =>
                  setExpandedScreenshot(
                    expandedScreenshot === screenshot.id ? null : (screenshot.id ?? null)
                  )
                }
              >
                {screenshot.thumbnailUrl && (
                  <img
                    src={screenshot.thumbnailUrl}
                    alt={screenshot.title ?? 'Screenshot'}
                    className="w-full h-32 object-cover rounded border border-gray-800 hover:border-blue-500 transition-colors"
                  />
                )}
                {screenshot.title && (
                  <p className="text-xs text-gray-400 mt-1 truncate">{screenshot.title}</p>
                )}
                {expandedScreenshot === screenshot.id && screenshot.url && (
                  <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setExpandedScreenshot(null)}
                  >
                    <div className="max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
                      <img
                        src={screenshot.url}
                        alt={screenshot.title ?? 'Screenshot'}
                        className="max-w-full max-h-[90vh] object-contain"
                      />
                      {screenshot.description && (
                        <p className="text-white mt-2 text-center">{screenshot.description}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest Files Section */}
      {mod.latestFiles && mod.latestFiles.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Latest Files</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 px-3 text-gray-400">File Name</th>
                  <th className="text-left py-2 px-3 text-gray-400">Release Type</th>
                  <th className="text-left py-2 px-3 text-gray-400">Game Versions</th>
                  <th className="text-left py-2 px-3 text-gray-400">Size</th>
                  <th className="text-left py-2 px-3 text-gray-400">Downloads</th>
                  <th className="text-left py-2 px-3 text-gray-400">Date</th>
                  <th className="text-left py-2 px-3 text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mod.latestFiles.map((file) => (
                  <tr key={file.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-3 px-3">
                      <div>
                        <div className="text-white font-medium">
                          {file.displayName ?? file.fileName}
                        </div>
                        {file.fileName && file.fileName !== file.displayName && (
                          <div className="text-xs text-gray-500">{file.fileName}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-300">
                      {getReleaseTypeName(file.releaseType)}
                      {file.isEarlyAccessContent && (
                        <span className="ml-1 text-xs text-yellow-400">(Early Access)</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-gray-300">
                      {file.gameVersions && file.gameVersions.length > 0 ? (
                        <div className="max-w-xs">
                          <div className="truncate" title={file.gameVersions.join(', ')}>
                            {file.gameVersions.slice(0, 2).join(', ')}
                            {file.gameVersions.length > 2 && ` +${file.gameVersions.length - 2}`}
                          </div>
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="py-3 px-3 text-gray-300">{formatFileSize(file.fileLength)}</td>
                    <td className="py-3 px-3 text-gray-300">
                      {file.downloadCount?.toLocaleString() ?? '0'}
                    </td>
                    <td className="py-3 px-3 text-gray-300">{formatDate(file.fileDate)}</td>
                    <td className="py-3 px-3">
                      {file.downloadUrl && (
                        <a
                          href={file.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded cursor-pointer transition-colors"
                        >
                          Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Latest Files Indexes */}
      {mod.latestFilesIndexes && mod.latestFilesIndexes.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <button
            onClick={() => toggleSection('fileIndexes')}
            className="w-full flex items-center justify-between text-xl font-semibold text-white mb-4 cursor-pointer"
          >
            <span>Latest Files Indexes</span>
            <span>{expandedSections.fileIndexes ? '−' : '+'}</span>
          </button>
          {expandedSections.fileIndexes && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-2 px-3 text-gray-400">Game Version</th>
                    <th className="text-left py-2 px-3 text-gray-400">File ID</th>
                    <th className="text-left py-2 px-3 text-gray-400">Filename</th>
                    <th className="text-left py-2 px-3 text-gray-400">Release Type</th>
                    <th className="text-left py-2 px-3 text-gray-400">Mod Loader</th>
                  </tr>
                </thead>
                <tbody>
                  {mod.latestFilesIndexes.map((index, idx) => (
                    <tr key={idx} className="border-b border-gray-800/50">
                      <td className="py-2 px-3 text-gray-300">{index.gameVersion ?? 'N/A'}</td>
                      <td className="py-2 px-3 text-gray-300">{index.fileId ?? 'N/A'}</td>
                      <td className="py-2 px-3 text-gray-300">{index.filename ?? 'N/A'}</td>
                      <td className="py-2 px-3 text-gray-300">
                        {getReleaseTypeName(index.releaseType)}
                      </td>
                      <td className="py-2 px-3 text-gray-300">{index.modLoader ?? 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Early Access Files Indexes */}
      {mod.latestEarlyAccessFilesIndexes && mod.latestEarlyAccessFilesIndexes.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
          <button
            onClick={() => toggleSection('earlyAccessIndexes')}
            className="w-full flex items-center justify-between text-xl font-semibold text-white mb-4 cursor-pointer"
          >
            <span>Early Access Files Indexes</span>
            <span>{expandedSections.earlyAccessIndexes ? '−' : '+'}</span>
          </button>
          {expandedSections.earlyAccessIndexes && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-2 px-3 text-gray-400">Game Version</th>
                    <th className="text-left py-2 px-3 text-gray-400">File ID</th>
                    <th className="text-left py-2 px-3 text-gray-400">Filename</th>
                    <th className="text-left py-2 px-3 text-gray-400">Release Type</th>
                    <th className="text-left py-2 px-3 text-gray-400">Mod Loader</th>
                  </tr>
                </thead>
                <tbody>
                  {mod.latestEarlyAccessFilesIndexes.map((index, idx) => (
                    <tr key={idx} className="border-b border-gray-800/50">
                      <td className="py-2 px-3 text-gray-300">{index.gameVersion ?? 'N/A'}</td>
                      <td className="py-2 px-3 text-gray-300">{index.fileId ?? 'N/A'}</td>
                      <td className="py-2 px-3 text-gray-300">{index.filename ?? 'N/A'}</td>
                      <td className="py-2 px-3 text-gray-300">
                        {getReleaseTypeName(index.releaseType)}
                      </td>
                      <td className="py-2 px-3 text-gray-300">{index.modLoader ?? 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Metadata Section */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <button
          onClick={() => toggleSection('metadata')}
          className="w-full flex items-center justify-between text-xl font-semibold text-white mb-4 cursor-pointer"
        >
          <span>Technical Metadata</span>
          <span>{expandedSections.metadata ? '−' : '+'}</span>
        </button>
        {expandedSections.metadata && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {mod.classId !== undefined && (
              <div>
                <span className="text-gray-300">Class ID:</span>{' '}
                <span className="text-white font-medium">{mod.classId}</span>
              </div>
            )}
            {mod.primaryCategoryId !== undefined && (
              <div>
                <span className="text-gray-300">Primary Category ID:</span>{' '}
                <span className="text-white font-medium">{mod.primaryCategoryId}</span>
              </div>
            )}
            {mod.mainFileId !== undefined && (
              <div>
                <span className="text-gray-300">Main File ID:</span>{' '}
                <span className="text-white font-medium">{mod.mainFileId}</span>
              </div>
            )}
            <div>
              <span className="text-gray-300">Allow Mod Distribution:</span>{' '}
              <span className="text-white font-medium">
                {mod.allowModDistribution ? 'Yes' : 'No'}
              </span>
            </div>
            <div>
              <span className="text-gray-300">Is Available:</span>{' '}
              <span className="text-white font-medium">{mod.isAvailable ? 'Yes' : 'No'}</span>
            </div>
            {mod.latestFiles && (
              <div className="col-span-full">
                <h3 className="text-sm font-semibold text-gray-200 mb-3">File Details</h3>
                <div className="space-y-3">
                  {mod.latestFiles.map((file) => (
                    <div key={file.id} className="bg-gray-800 rounded p-4 border border-gray-700">
                      <div className="font-medium text-white mb-3">
                        {file.displayName ?? file.fileName}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-gray-300">File ID:</span>{' '}
                          <span className="text-white">{file.id}</span>
                        </div>
                        <div>
                          <span className="text-gray-300">Status:</span>{' '}
                          <span className="text-white">{getFileStatusName(file.fileStatus)}</span>
                        </div>
                        {file.fileFingerprint !== undefined && (
                          <div>
                            <span className="text-gray-300">Fingerprint:</span>{' '}
                            <span className="text-white font-mono">{file.fileFingerprint}</span>
                          </div>
                        )}
                        {file.fileSizeOnDisk !== undefined && (
                          <div>
                            <span className="text-gray-300">Size on Disk:</span>{' '}
                            <span className="text-white">
                              {formatFileSize(file.fileSizeOnDisk)}
                            </span>
                          </div>
                        )}
                        {file.hashes && file.hashes.length > 0 && (
                          <div className="col-span-full">
                            <span className="text-gray-300 font-medium">Hashes:</span>
                            <div className="mt-2 space-y-2">
                              {file.hashes.map((hash, idx) => (
                                <div
                                  key={idx}
                                  className="text-xs font-mono bg-gray-900 rounded p-2 border border-gray-700"
                                >
                                  <span className="text-gray-300">
                                    {hash.algo === 1 ? 'MD5' : hash.algo === 2 ? 'SHA1' : 'Hash'}:
                                  </span>{' '}
                                  <span className="text-white break-all">{hash.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {file.dependencies && file.dependencies.length > 0 && (
                          <div className="col-span-full">
                            <span className="text-gray-300 font-medium">Dependencies:</span>
                            <div className="mt-2 space-y-1">
                              {file.dependencies.map((dep, idx) => (
                                <div key={idx} className="text-xs text-gray-200">
                                  Mod ID:{' '}
                                  <span className="text-white font-medium">{dep.modId}</span>, Type:{' '}
                                  <span className="text-white font-medium">{dep.relationType}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {file.modules && file.modules.length > 0 && (
                          <div className="col-span-full">
                            <span className="text-gray-300 font-medium">Modules:</span>
                            <div className="mt-2 space-y-1">
                              {file.modules.map((module, idx) => (
                                <div key={idx} className="text-xs text-gray-200">
                                  <span className="text-white font-medium">{module.name}</span>{' '}
                                  (Fingerprint:{' '}
                                  <span className="text-white font-mono">{module.fingerprint}</span>
                                  )
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
