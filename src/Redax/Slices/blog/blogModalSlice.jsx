// src/redux/slices/blogModalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  category: "Classic",
  Author: "",
  files: "",
  content: "",
  subtitle: "",
  id: 0,
};

export const blogModalSlice = createSlice({
  name: "blogModal",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setAuthor: (state, action) => {
      state.Author = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setSubtitle: (state, action) => {
      state.subtitle = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setTitle,
  setCategory,
  setAuthor,
  setFiles,
  setContent,
  setSubtitle,
  setId,
  resetForm,
} = blogModalSlice.actions;

export default blogModalSlice.reducer;
