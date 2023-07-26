import { createSlice } from "@reduxjs/toolkit";

const defaultUsersSlice = createSlice({
  name: "defaultUsers",
  initialState: [],

  reducers: {
    addDefaultUser(state, action) {
      state.push(action.payload);
    },
    removeDefaultUser(state, action) {
      return state.filter(
        (defaultUserObj) => defaultUserObj.id !== action.payload.id
      );
    }
  }
});

export const { addDefaultUser, removeDefaultUser } = defaultUsersSlice.actions;
export default defaultUsersSlice.reducer;
