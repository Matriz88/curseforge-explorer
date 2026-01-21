export const getFileStatusName = (status?: number): string => {
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

export const getReleaseTypeName = (type?: number): string => {
  const types: Record<number, string> = {
    1: 'Release',
    2: 'Beta',
    3: 'Alpha',
  };
  return types[type ?? 1] ?? 'Unknown';
};

export const getHashAlgorithmName = (algo?: number): string => {
  const algorithms: Record<number, string> = {
    1: 'SHA1',
    2: 'MD5',
  };
  return algorithms[algo ?? 1] ?? `Unknown (${algo})`;
};

export const getDependencyRelationTypeName = (relationType?: number): string => {
  const types: Record<number, string> = {
    1: 'EmbeddedLibrary',
    2: 'OptionalDependency',
    3: 'RequiredDependency',
    4: 'Tool',
    5: 'Incompatible',
    6: 'Include',
  };
  return types[relationType ?? 1] ?? `Unknown (${relationType})`;
};

export const formatFileSize = (bytes?: number): string => {
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
