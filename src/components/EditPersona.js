import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePersona, deletePersona } from "../redux/personaSlice";
import PersonaForm from "./PersonaForm";
import "../styles/styles.css";

const EditPersona = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const persona = useSelector((state) => state.personas.personas.find((p) => p.id === id));

  if (!persona) return <p>Loading...</p>;

  const handleSave = (updatedPersona) => {
    dispatch(updatePersona({ ...updatedPersona, id }));
    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this persona?")) {
      dispatch(deletePersona(id));
      navigate("/");
    }
  };

  return (
    <div>
      <h2>Edit Persona</h2>
      <PersonaForm persona={persona} onSave={handleSave} />
      <button onClick={handleDelete} className="delete-btn">Delete</button>
    </div>
  );
};

export default EditPersona;
