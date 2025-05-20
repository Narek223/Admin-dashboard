import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  lastname: "",
  phone: "",
  service: "Hair Care",
  specialist: "",
  date: "",
  id: 0,
  startime: null,
  endtime: null,
};

export const bookingModalSlice = createSlice({
  name: "bookingModal",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setSpecialist: (state, action) => {
      state.specialist = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setStartime: (state, action) => {
      state.startime = action.payload;
    },
    setEndtime: (state, action) => {
      state.endtime = action.payload;
    },
    resetForm: (state) => {
      state.name = initialState.name;
      state.lastname = initialState.lastname;
      state.phone = initialState.phone;
      state.service = initialState.service;
      state.specialist = initialState.specialist;
      state.date = initialState.date;
      state.id = initialState.id;
      state.startime = initialState.startime;
      state.endtime = initialState.endtime;
    },
  },
});

export const {
  setName,
  setLastname,
  setPhone,
  setService,
  setSpecialist,
  setDate,
  setId,
  setStartime,
  setEndtime,
  resetForm,
} = bookingModalSlice.actions;

export default bookingModalSlice.reducer;