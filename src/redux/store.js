import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
import formReducer from "./slice/formSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer
  },
});

export default store;
