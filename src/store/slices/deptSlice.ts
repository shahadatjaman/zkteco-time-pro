import { Department } from '@/app/components/dep/items/InfiniteTable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DepartmentState {
  data: Department[];
}

const initialState: DepartmentState = {
  data: [],
};

const deptSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setDepartments: (state, action: PayloadAction<Department[]>) => {
      state.data = action.payload;
    },
    addDepartment: (state, action: PayloadAction<Department>) => {
      console.log('action.payload', action.payload);
      state.data.push(action.payload);
    },
    updateADepartment: (state, action: PayloadAction<Department>) => {
      console.log('action.payload', action.payload);
      const index = state.data.findIndex(d => d._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteADepartment: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(dept => dept._id !== action.payload);
    },
    deleteManyDepartments: (state, action: PayloadAction<string[]>) => {
      state.data = state.data.filter(dept => !action.payload.includes(dept._id));
    },
  },
});

export const {
  setDepartments,
  addDepartment,
  updateADepartment,
  deleteADepartment,
  deleteManyDepartments,
} = deptSlice.actions;

export default deptSlice.reducer;
