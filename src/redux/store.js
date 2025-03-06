import { configureStore } from "@reduxjs/toolkit";
import personaReducer from "./personaSlice";

export const store = configureStore({
  reducer: {
    personas: personaReducer, // Ensure this matches your slice file
  },
});

export default store;
