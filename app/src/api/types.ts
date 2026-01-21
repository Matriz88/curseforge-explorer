export interface Game {
  id: number;
  name: string;
  slug: string;
  dateModified?: string;
  assets?: {
    iconUrl?: string | null;
    tileUrl?: string | null;
    coverUrl?: string | null;
    [key: string]: unknown;
  };
  status?: number;
  apiStatus?: number;
  [key: string]: unknown;
}

export interface GameAsset {
  id?: number;
  gameId?: number;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  url?: string;
  iconUrl?: string | null;
  tileUrl?: string | null;
  coverUrl?: string | null;
  [key: string]: unknown;
}

export interface PaginationMetadata {
  index: number;
  pageSize: number;
  resultCount: number;
  totalCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination?: PaginationMetadata;
}

export interface ModLogo {
  id?: number;
  modId?: number;
  title?: string;
  description?: string;
  thumbnailUrl?: string | null;
  url?: string;
}

export interface ModLinks {
  websiteUrl?: string;
  wikiUrl?: string;
  issuesUrl?: string;
  sourceUrl?: string;
}

export interface ModCategory {
  id?: number;
  gameId?: number;
  name?: string;
  slug?: string;
  url?: string;
  iconUrl?: string;
  dateModified?: string;
  isClass?: boolean;
  classId?: number;
  parentCategoryId?: number;
  displayIndex?: number;
}

export interface ModScreenshot {
  id?: number;
  modId?: number;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  url?: string;
}

export interface FileHash {
  value?: string;
  algo?: number;
}

export interface SortableGameVersion {
  gameVersionName?: string;
  gameVersionPadded?: string;
  gameVersion?: string;
  gameVersionReleaseDate?: string;
  gameVersionTypeId?: number;
}

export interface FileDependency {
  modId?: number;
  relationType?: number;
}

export interface FileModule {
  name?: string;
  fingerprint?: number;
}

export interface ModFile {
  id?: number;
  gameId?: number;
  modId?: number;
  isAvailable?: boolean;
  displayName?: string;
  fileName?: string;
  releaseType?: number;
  fileStatus?: number;
  hashes?: FileHash[];
  fileDate?: string;
  fileLength?: number;
  downloadCount?: number;
  fileSizeOnDisk?: number;
  downloadUrl?: string;
  gameVersions?: string[];
  sortableGameVersions?: SortableGameVersion[];
  dependencies?: FileDependency[];
  exposeAsAlternative?: boolean;
  parentProjectFileId?: number;
  alternateFileId?: number;
  isServerPack?: boolean;
  serverPackFileId?: number;
  isEarlyAccessContent?: boolean;
  earlyAccessEndDate?: string;
  fileFingerprint?: number;
  modules?: FileModule[];
}

export interface LatestFileIndex {
  gameVersion?: string;
  fileId?: number;
  filename?: string;
  releaseType?: number;
  gameVersionTypeId?: number;
  modLoader?: number;
}

export interface ModDetail {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  links?: ModLinks;
  summary?: string;
  status?: number;
  downloadCount?: number;
  isFeatured?: boolean;
  primaryCategoryId?: number;
  categories?: ModCategory[];
  classId?: number;
  authors?: Author[];
  logo?: ModLogo;
  screenshots?: ModScreenshot[];
  mainFileId?: number;
  latestFiles?: ModFile[];
  latestFilesIndexes?: LatestFileIndex[];
  latestEarlyAccessFilesIndexes?: LatestFileIndex[];
  dateCreated?: string;
  dateModified?: string;
  dateReleased?: string;
  allowModDistribution?: boolean;
  gamePopularityRank?: number;
  isAvailable?: boolean;
  thumbsUpCount?: number;
  rating?: number;
}

export interface Mod {
  id: string;
  name: string;
  description?: string;
  gameId?: string;
  downloadUrl?: string;
  authors?: Author[];
  logo?: ModLogo;
  [key: string]: unknown;
}

export interface Author {
  id?: string;
  name?: string;
  url?: string;
  [key: string]: unknown;
}

export const SortField = {
  Featured: 1,
  Popularity: 2,
  LastUpdated: 3,
  Name: 4,
  Author: 5,
  TotalDownloads: 6,
  Category: 7,
  GameVersion: 8,
  EarlyAccess: 9,
  FeaturedReleased: 10,
  ReleasedDate: 11,
  Rating: 12,
};

export interface SearchModsRequest {
  gameId: number;
  searchFilter?: string;
  sortField?: number;
  sortOrder?: 'asc' | 'desc';
  index?: number;
  pageSize?: number;
}

export interface File {
  id: string;
  name: string;
  description?: string;
  downloadUrl?: string;
  modId?: string;
  gameId?: string;
  [key: string]: unknown;
}
