import { createSlice } from "@reduxjs/toolkit";
import { manageItems } from "../../Utils/EditFunction";

const initialState = {
  anchorEl: null,
  categoryAnchorEl: null,
  servicesAnchorEl: null,
  categoryValue: "All Categories",
  serviceValue: "All Services",
  icon: true,
  serviceicon: true,
  isModalOpen: false,
  servicesList: [],
  edit: null,
  error: false,
  selectedService: null,
  isDeleteModalOpen: false,
  currentPage: 0,
  itemsPerPage: 5,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
    handleCloseModal: (state) => {
      state.error = false;
      state.isModalOpen = false;
    },
    handleOpenModal: (state) => {
      state.isModalOpen = true;
      state.edit = null;
      state.error = false;
    },
    handleInfoClick: (state, action) => {
      state.anchorEl = action.payload.event.currentTarget;
      state.selectedService = action.payload.elem;
    },
    handleEdit: (state) => {
      state.anchorEl = null;
      state.isModalOpen = true;
      state.edit = state.selectedService;
    },
    handleDeleteService: (state, action) => {
      const id = action.payload;
      state.servicesList = state.servicesList.filter((elem) => elem.id !== id);
      state.anchorEl = null;
    },
    handleAddService: (state, action) => {
      const { newService, isEdit } = action.payload;
      state.servicesList = manageItems(state.servicesList, newService, isEdit);
    },
    handleClose: (state) => {
      state.icon = true;
      state.categoryAnchorEl = null;
      state.servicesAnchorEl = null;
      state.error = false;
      state.serviceicon = true;
    },
    infoclose: (state) => {
      state.anchorEl = null;
    },
    handleSelect: (state, action) => {
      state.categoryValue = action.payload;
      state.icon = true;
      state.categoryAnchorEl = null;
      state.servicesAnchorEl = null;
      state.error = false;
      state.serviceicon = true;
    },
    handleServiceSelect: (state, action) => {
      state.serviceValue = action.payload;
      state.icon = true;
      state.categoryAnchorEl = null;
      state.servicesAnchorEl = null;
      state.error = false;
      state.serviceicon = true;
    },
    handleCategoryClick: (state, action) => {
      state.categoryAnchorEl = action.payload.currentTarget;
      state.icon = false;
    },
    handleServicesClick: (state, action) => {
      state.servicesAnchorEl = action.payload.currentTarget;
      state.serviceicon = false;
    },
    handlePageChange: (state, action) => {
      state.currentPage = action.payload;
    },
    handleItemsPerPageChange: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 0;
    },
    handleOpenDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    handleCloseDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
    restarTwo: (state) => {
      state.categoryValue = "All Categories";
      state.serviceValue = "All Services";
    },
  },
});

export const {
  setError,
  setEdit,
  setSelectedService,
  handleCloseModal,
  handleOpenModal,
  handleInfoClick,
  handleEdit,
  handleDeleteService,
  handleAddService,
  handleClose,
  infoclose,
  handleSelect,
  handleServiceSelect,
  handleCategoryClick,
  handleServicesClick,
  handlePageChange,
  handleItemsPerPageChange,
  handleOpenDeleteModal,
  handleCloseDeleteModal,
  restarTwo,
} = serviceSlice.actions;

export default serviceSlice.reducer;