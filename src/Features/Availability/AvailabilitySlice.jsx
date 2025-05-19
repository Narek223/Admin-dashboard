import { createSlice } from "@reduxjs/toolkit";
import { manageItems } from "../../Utils/EditFunction";

const initialState = {
  open: false,
  view: "month",
  eventobj: [],
  selectedDate: null,
  edit: null,
  isDeleteModalOpen: false,
  eventToDelete: null,
  viewDate: new Date(),
  error: false,
};

export const AvailabilitySlice = createSlice({
  name: "CalendarSlice",
  initialState,
  reducers: {
    closemodal: (state) => {
      state.error = false;
      state.open = false;
    },
    onOpen: (state, action) => {
      state.selectedDate = action.payload;
      state.open = true;
      state.edit = null;
      state.error = false;
    },
    event: (state, action) => {
      const { event, isEdit } = action.payload;
      state.eventobj = manageItems(state.eventobj, event, isEdit);
    },
    handleEditGlobal: (state, action) => {
      state.edit = action.payload;
      state.open = true;
    },
    handleDeleteGlobal: (state, action) => {
      state.eventToDelete = action.payload;
      state.isDeleteModalOpen = true;
    },
    confirmDelete: (state) => {
      if (state.eventToDelete) {
        state.eventobj = state.eventobj.filter(
          (ev) => ev.id !== state.eventToDelete.id
        );
        state.eventToDelete = null;
      }
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setViewDate: (state, action) => {
      state.viewDate = action.payload;
    },
    setEditData: (state, action) => {
      state.edit = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  closemodal,
  onOpen,
  event,
  handleEditGlobal,
  handleDeleteGlobal,
  confirmDelete,
  setView,
  setViewDate,
  setEditData,
  setError,
} = AvailabilitySlice.actions;

export default AvailabilitySlice.reducer;
