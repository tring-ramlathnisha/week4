import { createSlice } from "@reduxjs/toolkit";

// Load personas from local storage
const loadPersonas = () => {
  const storedPersonas = localStorage.getItem("personas");
  return storedPersonas ? JSON.parse(storedPersonas) : [];
};

// Save personas to local storage
const savePersonas = (personas) => {
  localStorage.setItem("personas", JSON.stringify(personas));
};

const personaSlice = createSlice({
  name: "personas",
  initialState: {
    personas: loadPersonas(),
  },
  reducers: {
    addPersona: (state, action) => {
      state.personas.push(action.payload);
      savePersonas(state.personas);
    },
    updatePersona: (state, action) => {
      const index = state.personas.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.personas[index] = action.payload;
        savePersonas(state.personas);
      }
    },
    deletePersona: (state, action) => {
      state.personas = state.personas.filter((p) => p.id !== action.payload);
      savePersonas(state.personas);
    },
  },
});

export const { addPersona, updatePersona, deletePersona } = personaSlice.actions;
export default personaSlice.reducer;
