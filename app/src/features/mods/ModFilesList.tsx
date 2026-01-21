import { useState, Fragment } from 'react';
import type { ModFile } from '../../api/types';
import {
  formatFileSize,
  getFileStatusName,
  getReleaseTypeName,
  getHashAlgorithmName,
  getDependencyRelationTypeName,
} from '../../utils';

interface ModFilesListProps {
  files: ModFile[];
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleString();
};

export const ModFilesList = ({ files }: ModFilesListProps) => {
  const [expandedFiles, setExpandedFiles] = useState<Set<number>>(new Set());

  const toggleFileDetails = (fileId: number) => {
    setExpandedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(fileId)) {
        next.delete(fileId);
      } else {
        next.add(fileId);
      }
      return next;
    });
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No files found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-2 px-3 text-gray-400">ID</th>
              <th className="text-left py-2 px-3 text-gray-400">File Name</th>
              <th className="text-left py-2 px-3 text-gray-400">Release Type</th>
              <th className="text-left py-2 px-3 text-gray-400">Status</th>
              <th className="text-left py-2 px-3 text-gray-400">Game Versions</th>
              <th className="text-left py-2 px-3 text-gray-400">Size</th>
              <th className="text-left py-2 px-3 text-gray-400">Size on Disk</th>
              <th className="text-left py-2 px-3 text-gray-400">Downloads</th>
              <th className="text-left py-2 px-3 text-gray-400">Date</th>
              <th className="text-left py-2 px-3 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => {
              const isExpanded = file.id !== undefined && expandedFiles.has(file.id);
              return (
                <Fragment key={file.id}>
                  <tr className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-3 px-3 text-gray-300">{file.id ?? 'N/A'}</td>
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
                      {getFileStatusName(file.fileStatus)}
                    </td>
                    <td className="py-3 px-3 text-gray-300">
                      {file.gameVersions && file.gameVersions.length > 0 ? (
                        <div className="whitespace-normal break-words">
                          {file.gameVersions.join(', ')}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="py-3 px-3 text-gray-300">{formatFileSize(file.fileLength)}</td>
                    <td className="py-3 px-3 text-gray-300">
                      {formatFileSize(file.fileSizeOnDisk)}
                    </td>
                    <td className="py-3 px-3 text-gray-300">
                      {file.downloadCount?.toLocaleString() ?? '0'}
                    </td>
                    <td className="py-3 px-3 text-gray-300">{formatDate(file.fileDate)}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
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
                        <button
                          onClick={() => file.id !== undefined && toggleFileDetails(file.id)}
                          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded cursor-pointer transition-colors"
                          title={isExpanded ? 'Hide details' : 'Show details'}
                        >
                          {isExpanded ? '−' : '+'}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && file.id !== undefined && (
                    <tr className="border-b border-gray-800/50">
                      <td colSpan={10} className="py-4 px-3 bg-gray-800/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          {/* Basic Info */}
                          <div className="space-y-2">
                            <h4 className="text-white font-semibold mb-2">Basic Info</h4>
                            {file.id !== undefined && (
                              <div>
                                <span className="text-gray-400">File ID:</span>{' '}
                                <span className="text-white font-medium">{file.id}</span>
                              </div>
                            )}
                            {file.gameId !== undefined && (
                              <div>
                                <span className="text-gray-400">Game ID:</span>{' '}
                                <span className="text-white font-medium">{file.gameId}</span>
                              </div>
                            )}
                            {file.modId !== undefined && (
                              <div>
                                <span className="text-gray-400">Mod ID:</span>{' '}
                                <span className="text-white font-medium">{file.modId}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-gray-400">Is Available:</span>{' '}
                              <span className="text-white font-medium">
                                {file.isAvailable ? 'Yes' : 'No'}
                              </span>
                            </div>
                            {file.fileStatus !== undefined && (
                              <div>
                                <span className="text-gray-400">File Status:</span>{' '}
                                <span className="text-white font-medium">
                                  {getFileStatusName(file.fileStatus)}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* File Info */}
                          <div className="space-y-2">
                            <h4 className="text-white font-semibold mb-2">File Info</h4>
                            {file.fileName && (
                              <div>
                                <span className="text-gray-400">File Name:</span>{' '}
                                <span className="text-white font-medium">{file.fileName}</span>
                              </div>
                            )}
                            {file.displayName && (
                              <div>
                                <span className="text-gray-400">Display Name:</span>{' '}
                                <span className="text-white font-medium">{file.displayName}</span>
                              </div>
                            )}
                            {file.fileLength !== undefined && (
                              <div>
                                <span className="text-gray-400">File Length:</span>{' '}
                                <span className="text-white font-medium">
                                  {formatFileSize(file.fileLength)}
                                </span>
                              </div>
                            )}
                            {file.fileSizeOnDisk !== undefined && (
                              <div>
                                <span className="text-gray-400">File Size on Disk:</span>{' '}
                                <span className="text-white font-medium">
                                  {formatFileSize(file.fileSizeOnDisk)}
                                </span>
                              </div>
                            )}
                            {file.fileFingerprint !== undefined && (
                              <div>
                                <span className="text-gray-400">File Fingerprint:</span>{' '}
                                <span className="text-white font-medium">
                                  {file.fileFingerprint}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Hashes */}
                          {file.hashes && file.hashes.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-white font-semibold mb-2">Hashes</h4>
                              {file.hashes.map((hash, index) => (
                                <div key={index}>
                                  <span className="text-gray-400">
                                    {getHashAlgorithmName(hash.algo)}:
                                  </span>{' '}
                                  <span className="text-white font-mono text-xs">{hash.value}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Game Versions */}
                          {file.sortableGameVersions && file.sortableGameVersions.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-white font-semibold mb-2">
                                Sortable Game Versions
                              </h4>
                              {file.sortableGameVersions.map((version, index) => (
                                <div key={index} className="text-xs">
                                  <div>
                                    <span className="text-gray-400">Version:</span>{' '}
                                    <span className="text-white font-medium">
                                      {version.gameVersionName ?? version.gameVersion ?? 'N/A'}
                                    </span>
                                  </div>
                                  {version.gameVersionReleaseDate && (
                                    <div>
                                      <span className="text-gray-400">Release Date:</span>{' '}
                                      <span className="text-white">
                                        {formatDate(version.gameVersionReleaseDate)}
                                      </span>
                                    </div>
                                  )}
                                  {version.gameVersionTypeId !== undefined && (
                                    <div>
                                      <span className="text-gray-400">Type ID:</span>{' '}
                                      <span className="text-white">
                                        {version.gameVersionTypeId}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Dependencies */}
                          {file.dependencies && file.dependencies.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-white font-semibold mb-2">Dependencies</h4>
                              {file.dependencies.map((dep, index) => (
                                <div key={index}>
                                  <span className="text-gray-400">Mod ID:</span>{' '}
                                  <span className="text-white font-medium">
                                    {dep.modId ?? 'N/A'}
                                  </span>{' '}
                                  <span className="text-gray-500">
                                    ({getDependencyRelationTypeName(dep.relationType)})
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Modules */}
                          {file.modules && file.modules.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-white font-semibold mb-2">Modules</h4>
                              {file.modules.map((module, index) => (
                                <div key={index}>
                                  <span className="text-white font-medium">
                                    {module.name ?? 'Unknown'}
                                  </span>
                                  {module.fingerprint !== undefined && (
                                    <span className="text-gray-500 ml-2">
                                      (fingerprint: {module.fingerprint})
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Server Pack Info */}
                          {(file.isServerPack !== undefined ||
                            file.serverPackFileId !== undefined ||
                            file.alternateFileId !== undefined) && (
                            <div className="space-y-2">
                              <h4 className="text-white font-semibold mb-2">Server Pack Info</h4>
                              {file.isServerPack !== undefined && (
                                <div>
                                  <span className="text-gray-400">Is Server Pack:</span>{' '}
                                  <span className="text-white font-medium">
                                    {file.isServerPack ? 'Yes' : 'No'}
                                  </span>
                                </div>
                              )}
                              {file.serverPackFileId !== undefined && (
                                <div>
                                  <span className="text-gray-400">Server Pack File ID:</span>{' '}
                                  <span className="text-white font-medium">
                                    {file.serverPackFileId}
                                  </span>
                                </div>
                              )}
                              {file.alternateFileId !== undefined && (
                                <div>
                                  <span className="text-gray-400">Alternate File ID:</span>{' '}
                                  <span className="text-white font-medium">
                                    {file.alternateFileId}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Dates */}
                          <div className="space-y-2">
                            <h4 className="text-white font-semibold mb-2">Dates</h4>
                            {file.fileDate && (
                              <div>
                                <span className="text-gray-400">File Date:</span>{' '}
                                <span className="text-white">{formatDate(file.fileDate)}</span>
                              </div>
                            )}
                            {file.earlyAccessEndDate && (
                              <div>
                                <span className="text-gray-400">Early Access End Date:</span>{' '}
                                <span className="text-white">
                                  {formatDate(file.earlyAccessEndDate)}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* URLs */}
                          {file.downloadUrl && (
                            <div className="space-y-2">
                              <h4 className="text-white font-semibold mb-2">URLs</h4>
                              <div>
                                <span className="text-gray-400">Download URL:</span>{' '}
                                <a
                                  href={file.downloadUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 underline cursor-pointer break-all"
                                >
                                  {file.downloadUrl}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
