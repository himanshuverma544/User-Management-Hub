import { configureStore } from "@reduxjs/toolkit";

import defaultUsersReducer from "./slices/defaultUsers";
import adminUsersReducer from "./slices/adminUsers";

const store = configureStore({
  reducer: {
    defaultUsersReducer,
    adminUsersReducer
  }
});

export default store;
