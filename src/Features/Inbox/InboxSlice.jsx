import { createSlice } from "@reduxjs/toolkit";
import { Users } from "../../Services/data/Inbox/Inbox";

const initialState = {
  messages: Users,
  searchTerm: "",
  dialogheader: true,
  user: "",
  anchorEl: null,
  selectedUserId: null,
  dialog: false,
};

export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    usersMessages: (state, action) => {
      state.dialog = true;
      state.dialogheader = false;
      state.user = action.payload;
      state.selectedUserId = action.payload.id;
    },
    deletefunc(state, action) {
      state.anchorEl = action.payload;
    },
    deletedialog: (state) => {
      state.messages = state.messages.filter((item) => item.id !== state.user.id);
      state.user = null;
      state.anchorEl = null;
      state.dialog = false;
      state.dialogheader = true;
    },
    seacrchFunc: (state, action) => {
      const value = action.payload.toLowerCase();
      state.searchTerm = value;
      const filteredUsers = Users.filter((user) =>
        user.name.toLowerCase().includes(value)
      );
      state.messages = filteredUsers;
    },
     closeMenu: (state) => {
      state.anchorEl = null;
    },
  },
});

export const { usersMessages, deletefunc, deletedialog, seacrchFunc,closeMenu } =
  inboxSlice.actions;

export default inboxSlice.reducer;