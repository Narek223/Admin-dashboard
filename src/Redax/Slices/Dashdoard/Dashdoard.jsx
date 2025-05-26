import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeBox: "bookings",
};

export const Dashdoard = createSlice({
  name: "DashdoardSlice",
  initialState,
  reducers: {
    handleClick: (state, action) => {
      state.activeBox = action.payload;
    },
  },
});
export const {handleClick} = Dashdoard.actions;

export default Dashdoard.reducer;
