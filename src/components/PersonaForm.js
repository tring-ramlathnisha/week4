import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/styles.css";


const PersonaForm = ({ persona, onSave }) => {
  const [image, setImage] = useState(persona?.image || "");
  const [formData, setFormData] = useState({
    name: persona?.name || "",
    quote: persona?.quote || "",
    description: persona?.description || "",
    painPoints: persona?.painPoints || "",
    jobsNeeds: persona?.jobsNeeds || "",
    activities: persona?.activities || "",
  });

  useEffect(() => {
    if (persona) {
      setImage(persona.image || "");
      setFormData(persona);
    }
  }, [persona]);

  const handleChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("File size must be ≤ 5MB");
    }
  };

  return (
    <div className="persona-form">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Persona" width="100%" />}

      <div className="grid-container">
        {["name", "quote", "description", "painPoints", "jobsNeeds", "activities"].map((field) => (
          <div key={field}>
            <label>{field.replace(/([A-Z])/g, " $1").trim()}:</label>
            <ReactQuill value={formData[field]} onChange={(value) => handleChange(field, value)} />
          </div>
        ))}
      </div>

      <button onClick={() => onSave({ ...formData, image })}>Save Persona</button>
    </div>
  );
};

export default PersonaForm;
