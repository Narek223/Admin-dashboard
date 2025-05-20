// store/calendarUISlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  anchorEl: null,
};

const calendarUISlice = createSlice({
  name: "calendarUI",
  initialState,
  reducers: {
    openMenu(state, action) {
      state.anchorEl = action.payload;
    },
    closeMenu(state) {
      state.anchorEl = null;
    },
  },
});

export const { openMenu, closeMenu } = calendarUISlice.actions;
export default calendarUISlice.reducer;
