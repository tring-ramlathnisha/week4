import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import PersonaList from "./components/PersonaList";
import { CreatePersona, EditPersona } from "./components/PersonaForm"; // Import both components

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<PersonaList />} />
          <Route path="/create" element={<CreatePersona />} />
          <Route path="/edit/:id" element={<EditPersona />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
