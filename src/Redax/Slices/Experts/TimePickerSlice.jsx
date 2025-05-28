import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: null,
  selectedTime: null,
  timeSlots: [],
  open: false,
  edit: null,
};

export const timePickerSlice = createSlice({
  name: "timePicker",
  initialState,
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    setSelectedTime(state, action) {
      state.selectedTime = action.payload;
    },
    setTimeSlots(state, action) {
      state.timeSlots = action.payload;
    },
    addTimeSlot(state, action) {
      const { date, time } = action.payload;
      const formattedDate = date;
      const formattedTime = time;
      const existing = state.timeSlots.find((elem) => elem.date === formattedDate);
      if (existing) {
        if (!existing.times.includes(formattedTime)) {
          existing.times.push(formattedTime);
          existing.times.sort();
        }
      } else {
        state.timeSlots.push({ date: formattedDate, times: [formattedTime] });
      }
    },
    deleteTimeSlot(state, action) {
      const { date, time } = action.payload;
      state.timeSlots = state.timeSlots
        .map((elem) =>
          elem.date === date
            ? { ...elem, times: elem.times.filter((t) => t !== time) }
            : elem
        )
        .filter((elem) => elem.times.length > 0);
    },
    setOpen(state, action) {
      state.open = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    reset(state) {
      state.date = null;
      state.selectedTime = null;
      state.timeSlots = [];
      state.edit = null;
    },
  },
});

export const {
  setDate,
  setSelectedTime,
  setTimeSlots,
  addTimeSlot,
  deleteTimeSlot,
  setOpen,
  setEdit,
  reset,
} = timePickerSlice.actions;

export default timePickerSlice.reducer;