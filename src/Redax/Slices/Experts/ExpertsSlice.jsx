import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  edit: null,
  error: false,
  expert: [],
  anchorEl: null,
  selectedService: null,
  isDeleteModalOpen: false,
  timeModalOpen: false,
  currentPage: 0,
  itemsPerPage: 5,
};

export const ExpertsSlice = createSlice({
  name: "expert",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.open = true;
      state.error = false;
      state.edit = null;
    },

    onClose: (state) => {
      state.open = false;
      state.error = false;
      state.anchorEl = null;
    },

    handleEdit: (state) => {
      state.anchorEl = null;
      state.open = true;
      state.edit = state.selectedService;
    },
    handleCloseDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
    handleCloseTimeModal: (state) => {
      state.timeModalOpen = false;
    },
    handleInfoClick: (state, action) => {
      state.anchorEl = action.payload.event.currentTarget;
      state.selectedService = action.payload.elem;
    },
    handleOpenDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    handleOpenTimeModal: (state) => {
      state.timeModalOpen = true;
    },
    handleDeleteService: (state, action) => {
      state.expert = state.expert.filter((elem) => elem.id !== action.payload);
      state.anchorEl = null;
    },
    handlePageChange: (state, action) => {
      state.currentPage = action.payload;
    },
    handleItemsPerPageChange: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 0;
    },
    addExpert: (state, action) => {
      state.expert.push({
        ...action.payload,
        id: Date.now(),
        freeTime: [],
      });
    },
    editExpert: (state, action) => {
      state.expert = state.expert.map((item) =>
        item.id === action.payload.id
          ? { ...action.payload, freeTime: item.freeTime || [] }
          : item
      );
    },

    updateExpertTime: (state, action) => {
      const { id, updatedTimeSlots } = action.payload;
      state.expert = state.expert.map((expert) =>
        expert.id === id ? { ...expert, freeTime: updatedTimeSlots } : expert
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setError,
  onOpen,
  onClose,
  handleEdit,
  handleCloseDeleteModal,
  handleCloseTimeModal,
  handleInfoClick,
  handleOpenDeleteModal,
  handleOpenTimeModal,
  handleDeleteService,
  handlePageChange,
  handleItemsPerPageChange,
  addExpert,
  editExpert,
  updateExpertTime,
} = ExpertsSlice.actions;

export default ExpertsSlice.reducer;
