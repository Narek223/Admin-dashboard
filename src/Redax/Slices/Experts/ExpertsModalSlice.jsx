import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  mail: "",
  phone: "",
  adress: "",
  date: "",
  specialist: "Hair Care",
  files: "",
  expertSummary:"",
  experians:"",
  experiansTo:""
};

export const ExpertsModalSlice = createSlice({
  name: "expertsModal",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setMail: (state, action) => {
      state.mail = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setAdress: (state, action) => {
      state.adress = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setSpecialist: (state, action) => {
      state.specialist = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
   setexpertSummary: (state, action) => {
      state.expertSummary = action.payload;
    },
  setexperians: (state, action) => {
      state.experians = action.payload;
    },
      setexperiansTo: (state, action) => {
      state.experiansTo = action.payload;
    },
    resetExpertForm: () => initialState,
  },
});

export const {
  setId,
  setName,
  setexperians,
  setexperiansTo,
  setMail,
  setPhone,
  setexpertSummary,
  setAdress,
  setDate,
  setSpecialist,
  setFiles,
  setAllFields,
  resetExpertForm,
} = ExpertsModalSlice.actions;

export default ExpertsModalSlice.reducer;
