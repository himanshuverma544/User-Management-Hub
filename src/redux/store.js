import { configureStore } from "@reduxjs/toolkit";

import defaultUsersReducer from "./slices/users";
import adminUsersReducer from "./slices/admins";

const store = configureStore({
  reducer: {
    defaultUsersReducer,
    adminUsersReducer
  }
});

export default store;
