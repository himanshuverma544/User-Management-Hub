import { createSlice } from "@reduxjs/toolkit";

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: [],

  reducers: {
    addAdminUser(state, action) {
      state.push(action.payload);
    },
    removeAdminUser(state, action) {
      return state.filter(
        (adminUserObj) => adminUserObj.id !== action.payload.id
      );
    }
  }
});

export const { addAdminUser, removeAdminUser } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
