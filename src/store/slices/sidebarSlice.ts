import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarExpanded: true,
  activeMenu: 'dashboard',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.isSidebarExpanded = !state.isSidebarExpanded;
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { toggleSidebar, setActiveMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;
