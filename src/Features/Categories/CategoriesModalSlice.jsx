import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  files: "",
  id: 0,
};

export const categoriesModalSlice = createSlice({
  name: "categoriesModal",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    resetForm: (state) => {
      state.name = initialState.name;
      state.description = initialState.description;
      state.files = initialState.files;
      state.id = initialState.id;
    },
  },
});

export const { setName, setDescription, setFiles, setId, resetForm } =
  categoriesModalSlice.actions;

export default categoriesModalSlice.reducer;