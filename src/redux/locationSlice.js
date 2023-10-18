import { createSlice } from '@reduxjs/toolkit';

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavoriteLocation: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavoriteLocation: (state, action) => {
      state.favorites = state.favorites.filter(
        (location) => location !== action.payload
      );
    },
  },
});

export const { addFavoriteLocation, removeFavoriteLocation } = locationsSlice.actions;
export default locationsSlice.reducer;
