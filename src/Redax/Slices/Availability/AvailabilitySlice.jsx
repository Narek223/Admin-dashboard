// Features/Availability/AvailabilitySlice.js
import { createSlice } from "@reduxjs/toolkit";
import { manageItems } from "../../../Utils/EditFunction";

const initialState = {
  events: [],
  open: false,
  selectedDate: null,
  edit: null,
  isDeleteModalOpen: false,
  eventToDelete: null,
  view: "month",
  viewDate: new Date(),
  error: false,
};

const AvailabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {
    setOpen(state, action) {
      state.open = action.payload;
      if (!action.payload) {
        state.error = false;
      }
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    addOrUpdateEvent(state, action) {
      const { event, isEdit } = action.payload;
      state.events = manageItems(state.events, event, isEdit);
      
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    setIsDeleteModalOpen(state, action) {
      state.isDeleteModalOpen = action.payload;
    },
    setEventToDelete(state, action) {
      state.eventToDelete = action.payload;
    },
    confirmDelete(state) {
      if (state.eventToDelete) {
        state.events = state.events.filter(
          (ev) => ev.id !== state.eventToDelete.id
        );
        state.eventToDelete = null;
      }
      state.isDeleteModalOpen = false;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setViewDate(state, action) {
      state.viewDate = new Date(action.payload);
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setOpen,
  setSelectedDate,
  addOrUpdateEvent,
  setEdit,
  setIsDeleteModalOpen,
  setEventToDelete,
  confirmDelete,
  setView,
  setViewDate,
  setError,
} = AvailabilitySlice.actions;

export default AvailabilitySlice.reducer;
