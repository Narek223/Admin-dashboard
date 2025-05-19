import { createSlice } from '@reduxjs/toolkit';
import dayjs from "dayjs";

const initialState = {
  fullname: "",
  status: "Booked",
  date: null,
  startime: null,
  endtime: null,
  id: 0,
  error: false,
};

export const AvailabilityModalSlice = createSlice({
  name: "availability",
  initialState,
  reducers: {
    setFullname: (state, action) => {
      state.fullname = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setStartTime: (state, action) => {
      state.startime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endtime = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetForm: () => initialState,
    setAll: (state, action) => {
      const { fullname, date, status, startime, endtime, id } = action.payload;
      state.fullname = fullname || "";
      state.date = date || null;
      state.status = status || "Booked";
      state.startime = startime ? dayjs(startime) : null;
      state.endtime = endtime ? dayjs(endtime) : null;
      state.id = id || 0;
    },
  },
});

export const {
  setFullname,
  setStatus,
  setDate,
  setStartTime,
  setEndTime,
  setId,
  setError,
  resetForm,
  setAll,
} = AvailabilityModalSlice.actions;

export default AvailabilityModalSlice.reducer;
