import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  avatar: string;
  gender: string;
  blood: string;
  religion: string;
  dept: string;
  card: string;
  roles: string[];
  phone: string;
  userId: string;
}

interface UserState {
  data: User[];
}

const initialState: UserState = {
  data: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.data.push(action.payload);
    },
    updateAUser: (state, action: PayloadAction<User>) => {
      const index = state.data.findIndex(u => u._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteAUser: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(user => user._id !== action.payload);
    },
    deleteMultipleUsers: (state, action: PayloadAction<string[]>) => {
      state.data = state.data.filter(user => !action.payload.includes(user._id));
    },
  },
});

export const {
  setUsers,
  addUser,
  updateAUser,
  deleteAUser,
  deleteMultipleUsers,
} = userSlice.actions;

export default userSlice.reducer;
