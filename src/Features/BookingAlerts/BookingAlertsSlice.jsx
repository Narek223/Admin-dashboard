import { createSlice } from "@reduxjs/toolkit";
import { manageItems } from "../../Utils/EditFunction";

const initialState = {
  open: false,
  booking: [],
  edit: null,
  icon: true,
  anchorEl: null,
  selectelem: "Newest",
  error: false,
  infoanchorEl: null,
  isDeleteModalOpen: false,
  selectedBooking: null,
  currentPage: 0,
  itemsPerPage: 5,
};

export const bookingAlertsSlice = createSlice({
  name: "bookingAlerts",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
      state.error = false;
      state.edit = null;
    },
    closeModal: (state) => {
      state.open = false;
      state.anchorEl = null;
      state.icon = true;
      state.error = false;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setIcon: (state, action) => {
      state.icon = action.payload;
    },
    setAnchorEl: (state, action) => {
      state.anchorEl = action.payload;
    },
    setSelectElem: (state, action) => {
      state.selectelem = action.payload;
      if (action.payload === "Newest") {
        state.booking = [...state.booking].sort((a, b) => a.id - b.id);
      } else {
        state.booking = [...state.booking].sort((a, b) => b.id - a.id);
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setInfoAnchorEl: (state, action) => {
      state.infoanchorEl = action.payload;
    },
    setIsDeleteModalOpen: (state, action) => {
      state.isDeleteModalOpen = action.payload;
    },
    setSelectedBooking: (state, action) => {
      state.selectedBooking = action.payload;
    },
    addBooking: (state, action) => {
      const { bookingAlert, isEdit } = action.payload;
      state.booking = manageItems(state.booking, bookingAlert, isEdit);
    },
    deleteBooking: (state, action) => {
      state.booking = state.booking.filter((elem) => elem.id !== action.payload);
      state.infoanchorEl = null;
    },
    handleEdit: (state) => {
      state.infoanchorEl = null;
      state.open = true;
      state.edit = state.selectedBooking;
    },
    handlePageChange: (state, action) => {
      state.currentPage = action.payload;
    },
    handleItemsPerPageChange: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 0;
    },
    closeInfo: (state) => {
      state.infoanchorEl = null;
    },
  },
});

export const {
  openModal,
  closeModal,
  setEdit,
  setIcon,
  setAnchorEl,
  setSelectElem,
  setError,
  setInfoAnchorEl,
  setIsDeleteModalOpen,
  setSelectedBooking,
  addBooking,
  deleteBooking,
  handleEdit,
  handlePageChange,
  handleItemsPerPageChange,
  closeInfo,
} = bookingAlertsSlice.actions;

export default bookingAlertsSlice.reducer;