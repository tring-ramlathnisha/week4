import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPersona } from "../redux/personaSlice";
import PersonaForm from "../components/PersonaForm";
import "../styles/styles.css";

const CreatePersona = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = (persona) => {
    dispatch(addPersona({ ...persona, id: Date.now().toString() }));
    navigate("/");
  };

  return (
    <div>
      <h2>Create Persona</h2>
      <PersonaForm onSave={handleSave} />
    </div>
  );
};

export default CreatePersona;
