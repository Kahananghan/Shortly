import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  loadingMessage: 'Loading...',
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.isLoading = true;
      state.loadingMessage = action.payload || 'Loading...';
    },
    hideLoader: (state) => {
      state.isLoading = false;
      state.loadingMessage = 'Loading...';
    },
  },
});

export const { showLoader, hideLoader } = loadingSlice.actions;
export default loadingSlice.reducer;