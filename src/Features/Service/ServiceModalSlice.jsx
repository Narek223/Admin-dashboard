import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  service: "",
  category: "Classic",
  price: "",
  duration: "",
  description: "",
  files: "",
};

export const serviceModalSlice = createSlice({
  name: "serviceModal",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setAllFields: (state, action) => {
      state.id = action.payload.id ?? initialState.id;
      state.service = action.payload.service ?? initialState.service;
      state.category = action.payload.category ?? initialState.category;
      state.price = action.payload.price ?? initialState.price;
      state.duration = action.payload.duration ?? initialState.duration;
      state.description = action.payload.description ?? initialState.description;
      state.files = action.payload.files ?? initialState.files;
    },
    resetModalForm: (state) => {
      state.id = initialState.id;
      state.service = initialState.service;
      state.category = initialState.category;
      state.price = initialState.price;
      state.duration = initialState.duration;
      state.description = initialState.description;
      state.files = initialState.files;
    },
  },
});

export const {
  setId,
  setService,
  setCategory,
  setPrice,
  setDuration,
  setDescription,
  setFiles,
  setAllFields,
  resetModalForm,
} = serviceModalSlice.actions;

export default serviceModalSlice.reducer;