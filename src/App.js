import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import PersonaList from "./components/PersonaList";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { CreatePersona, EditPersona } from "./components/PersonaForm";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Only remove auth status
    setIsAuthenticated(false);
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route
            path="/persona"
            element={isAuthenticated ? <PersonaList onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          
          <Route path="/create" element={isAuthenticated ? <CreatePersona onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={isAuthenticated ? <EditPersona onLogout={handleLogout} /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
