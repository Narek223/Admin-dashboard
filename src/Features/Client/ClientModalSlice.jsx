import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  date: "",
  mail: "",
  phone: "",
  files: "",
  id: 0,
};

export const clientModalSlice = createSlice({
  name: "clientModal",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setMail: (state, action) => {
      state.mail = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    resetForm: (state) => {
      state.name = initialState.name;
      state.date = initialState.date;
      state.mail = initialState.mail;
      state.phone = initialState.phone;
      state.files = initialState.files;
      state.id = initialState.id;
    },
  },
});

export const {
  setName,
  setDate,
  setMail,
  setPhone,
  setFiles,
  setId,
  resetForm,
} = clientModalSlice.actions;

export default clientModalSlice.reducer;