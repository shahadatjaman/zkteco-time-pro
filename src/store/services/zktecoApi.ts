import { apiSlice } from '../api/apiSlice';
export interface MongoDbStats {
  db: string;
  collections: number;
  views: number;
  objects: number;
  avgObjSize: number;
  dataSize: number;
  storageSize: number;
  indexes: number;
  indexSize: number;
  totalSize: number;
  scaleFactor: number;
  fsUsedSize: number;
  fsTotalSize: number;
  ok: number;
}
export interface Res {
  data: MongoDbStats;
  status: number;
}

export const zktecoApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDatabseStats: builder.query<MongoDbStats, void>({
      query: () => '/zkteco/databse-stats',
    }),
  }),
});

export const { useGetDatabseStatsQuery } = zktecoApi;
