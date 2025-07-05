import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MongoDbStats } from '../services/zktecoApi';

interface ZktecoState {
  databaseStats: MongoDbStats;
}

const initialState: ZktecoState = {
  databaseStats: {
    db: '',
    collections: 0,
    views: 0,
    objects: 0,
    avgObjSize: 0,
    dataSize: 0,
    storageSize: 0,
    indexes: 0,
    indexSize: 0,
    totalSize: 0,
    scaleFactor: 0,
    fsUsedSize: 0,
    fsTotalSize: 0,
    ok: 0,
  },
};

export const zktecoSlice = createSlice({
  name: 'zkteco',
  initialState,
  reducers: {
    setDatabaseStats(state, action: PayloadAction<MongoDbStats>) {
      state.databaseStats = action.payload;
    },
  },
});

export const { setDatabaseStats } = zktecoSlice.actions;
export default zktecoSlice.reducer;
