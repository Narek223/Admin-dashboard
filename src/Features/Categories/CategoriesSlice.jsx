import { createSlice } from "@reduxjs/toolkit";
import { manageItems } from "../../Utils/EditFunction";

const initialState = {
  open: false,
  categorieslist: [],
  edit: null,
  infoanchorEl: null,
  selectedCategory: null,
  isDeleteModalOpen: false,
  currentPage: 0,
  itemsPerPage: 5,
  error: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    openHeader: (state) => {
      state.open = true;
      state.error = false;
      state.edit = null;
    },
    handleClose: (state) => {
      state.open = false;
      state.error = false;
      state.infoanchorEl = null;
    },

    handleInfoClick: (state, action) => {
      state.selectedCategory = action.payload.elem;
      state.infoanchorEl = action.payload.event.currentTarget;
    },
    infoclose: (state) => {
      state.infoanchorEl = null;
    },
    handleEdit: (state) => {
      state.infoanchorEl = null;
      state.open = true;
      state.edit = state.selectedCategory;
    },
    handleOpenDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    handleDeleteblog: (state, action) => {
      const id = action.payload;
      state.categorieslist = state.categorieslist.filter(
        (elem) => elem.id !== id
      );
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
    setError: (state, action) => {
      state.error = action.payload;
    },
    addcategories: (state, action) => {
      const { categories, isEdit } = action.payload;
      state.categorieslist = manageItems(
        state.categorieslist,
        categories,
        isEdit
      );
    },
  },
});

export const {
  addcategories,
  setError,
  openHeader,
  handleClose,
  infoclose,
  handleEdit,
  handleOpenDeleteModal,
  handleInfoClick,
  handleDeleteblog,
  handleCloseDeleteModal,
  handlePageChange,
  handleItemsPerPageChange,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
