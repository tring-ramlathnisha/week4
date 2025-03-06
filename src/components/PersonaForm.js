import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPersona, updatePersona, deletePersona } from "../redux/personaSlice";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/PersonaForm.css";

const defaultImage = "defaultimage.jpg"; 

const PersonaForm = ({ isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const personas = useSelector((state) => state.personas.personas);
  const existingPersona = personas.find((p) => p.id === id);

  const [persona, setPersona] = useState({
    id: id || Date.now().toString(),
    name: "",
    image: defaultImage,
    quote: "",
    description: "",
    attitudes: "",
    painPoints: "",
    jobs: "",
    activities: "",
  });

  useEffect(() => {
    if (existingPersona) setPersona(existingPersona);
  }, [existingPersona]);

  const handleChange = (field, value) => {
    setPersona((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setPersona((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    } else {
      alert("File must be less than 5MB");
    }
  };

  const handleSubmit = () => {
    if (!persona.name.trim()) {
      alert("Persona Name is required!");
      return;
    }

    if (isEdit) {
      dispatch(updatePersona(persona));
    } else {
      dispatch(addPersona(persona));
    }

    navigate("/persona");
  };

  const handleDelete = () => {
    dispatch(deletePersona(persona.id));
    navigate("/persona");
  };

  return (
    <div className="persona-form">
      <div className="banner" style={{ backgroundImage: `url(${persona.image})` }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} hidden id="imageUpload" />
        <label htmlFor="imageUpload" className="edit-image-btn">Edit Image</label>
      </div>

      <div className="form-container">
        <div className="input-group">
          <label>Persona Name *</label>
          <input type="text" value={persona.name} onChange={(e) => handleChange("name", e.target.value)} required />
        </div>

        <div className="grid-container">
          <div className="grid-item"><label>Notable Quote</label><ReactQuill value={persona.quote} onChange={(value) => handleChange("quote", value)} /></div>
          <div className="grid-item"><label>Description</label><ReactQuill value={persona.description} onChange={(value) => handleChange("description", value)} /></div>
          <div className="grid-item"><label>Attitudes/Motivations</label><ReactQuill value={persona.attitudes} onChange={(value) => handleChange("attitudes", value)} /></div>
        </div>
        <br/>
        <div className="grid-container">
          <div className="grid-item"><label>Pain Points</label><ReactQuill value={persona.painPoints} onChange={(value) => handleChange("painPoints", value)} /></div>
          <div className="grid-item"><label>Jobs/Needs</label><ReactQuill value={persona.jobs} onChange={(value) => handleChange("jobs", value)} /></div>
          <div className="grid-item"><label>Activities</label><ReactQuill value={persona.activities} onChange={(value) => handleChange("activities", value)} /></div>
        </div>

        <div className="form-buttons">
          {isEdit && <button className="delete-btn" onClick={handleDelete}>DELETE</button>}
          <button className="close-btn" onClick={() => navigate("/persona")}>CLOSE</button>
          <button className="update-btn" onClick={handleSubmit}>{isEdit ? "UPDATE PERSONA" : "CREATE PERSONA"}</button>
        </div>
      </div>
    </div>
  );
};

export const CreatePersona = () => <PersonaForm isEdit={false} />;
export const EditPersona = () => <PersonaForm isEdit={true} />;
