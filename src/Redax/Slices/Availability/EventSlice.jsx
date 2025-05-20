import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  anchorEl: null,
    event: null,
};

export const EventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
   
  handleClick: (state, action) => {
    state.anchorEl = action.payload;
  },
  handleClose: (state) => {
    state.anchorEl = null;
  },
  handleEdit: (state, action) => {
    state.event = action.payload;
    state.anchorEl = null;
  },
  handleDelete: (state, action) => {
    state.event = action.payload;
    state.anchorEl = null;
  },
}
});


export const { handleClick, handleClose, handleEdit, handleDelete } = EventSlice.actions;
export default EventSlice.reducer;
