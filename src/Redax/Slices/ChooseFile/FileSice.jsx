import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: [],
  previewURL: "",
  fileName: "",
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload.file;
      state.previewURL = action.payload.previewURL;
      state.fileName = action.payload.fileName;
    },
    clearFile: (state) => {
      state.file = null;
      state.previewURL = "";
      state.fileName = "";
    },
  },
});

export const { setFile, clearFile } = fileSlice.actions;

export default fileSlice.reducer;
