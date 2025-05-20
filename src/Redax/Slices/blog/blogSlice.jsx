import { createSlice } from "@reduxjs/toolkit";
import { manageItems } from "../../../Utils/EditFunction";

const initialState = {
  open: false,
  edit: null,
  blogList: [],
  infoanchorEl: null,
  selectedblog: null,
  isDeleteModalOpen: false,
  error: false,
  currentPage: 0,
  itemsPerPage: 5,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    openmodal: (state) => {
      state.open = true;
      state.error = false;
      state.edit = null;
    },
    handleClose: (state) => {
      state.open = false;
      state.error = false;
    },
    infoclose: (state) => {
      state.infoanchorEl = null;
    },
    handleEdit: (state) => {
      state.infoanchorEl = null;
      state.open = true;
      state.edit = state.selectedblog;
    },
    handleOpenDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    handleInfoClick: (state, action) => {
      state.selectedblog = action.payload.elem;
      state.infoanchorEl = action.payload.event.currentTarget;
    },
    handleDeleteblog: (state, action) => {
      const id = action.payload;
      state.blogList = state.blogList.filter((elem) => elem.id !== id);
      state.infoanchorEl = null;
    },
    handleCloseDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
    handlePageChange: (state, action) => {
      state.currentPage = action.payload.newPage;
    },
    handleItemsPerPageChange: (state, action) => {
      state.itemsPerPage = action.payload.newPerPage;
      state.currentPage = 0;
    },
    addblog: (state, action) => {
      const { blog, isEdit } = action.payload;
      state.blogList = manageItems(state.blogList, blog, isEdit);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setError,
  openmodal,
  handleClose,
  infoclose,
  handleEdit,
  handleOpenDeleteModal,
  handleInfoClick,
  handleDeleteblog,
  handleCloseDeleteModal,
  handlePageChange,
  handleItemsPerPageChange,
  addblog,
} = blogSlice.actions;

export default blogSlice.reducer;
