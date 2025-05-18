import { createSlice } from "@reduxjs/toolkit";
import { manageItems } from "../../Utils/EditFunction";

const initialState = {
  open: false,
  error: false,
  edit: null,
  clientList: [],
  anchorEl: null,
  selectedClient: null,
  isDeleteModalOpen: false,
  currentPage: 0,
  itemsPerPage: 5,
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
      state.error = false;
      state.edit = null;
    },
    closeModal: (state) => {
      state.open = false;
      state.error = false;
      state.anchorEl = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    handleEdit: (state) => {
      state.anchorEl = null;
      state.open = true;
      state.edit = state.selectedClient;
    },
    addClient: (state, action) => {
      const { client, isEdit } = action.payload;
      state.clientList = manageItems(state.clientList, client, isEdit);
    },
    handleInfoClick: (state, action) => {
      state.selectedClient = action.payload.elem;
      state.anchorEl = action.payload.event.currentTarget;
    },
    closeInfo: (state) => {
      state.anchorEl = null;
    },
    openDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
    deleteClient: (state, action) => {
      const id = action.payload;
      state.clientList = state.clientList.filter((client) => client.id !== id);
      state.anchorEl = null;
    },
    handlePageChange: (state, action) => {
      state.currentPage = action.payload.newPage;
    },
    handleItemsPerPageChange: (state, action) => {
      state.itemsPerPage = action.payload.newPerPage;
      state.currentPage = 0;
    },
  },
});

export const {
  openModal,
  closeModal,
  setError,
  handleEdit,
  addClient,
  handleInfoClick,
  closeInfo,
  openDeleteModal,
  closeDeleteModal,
  deleteClient,
  handlePageChange,
  handleItemsPerPageChange,
} = clientSlice.actions;

export default clientSlice.reducer;