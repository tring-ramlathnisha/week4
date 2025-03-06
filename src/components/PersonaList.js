import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/PersonaList.css";

const PersonaList = () => {
  const personas = useSelector((state) => state.personas.personas);
  const navigate = useNavigate();

  return (
    <div className="persona-container">
      <h2 className="persona-title">Personas</h2>
      <div className="persona-grid">
        {personas.map((persona) => (
          <div key={persona.id} className="persona-card" onClick={() => navigate(`/edit/${persona.id}`)}>
            <img src={persona.image} alt={persona.name} className="persona-image" />
            <div className="persona-content">
              <h3 className="persona-name" >{persona.name}</h3>
              <p className="persona-quote" dangerouslySetInnerHTML={{ __html: `${persona.quote}` }}></p>

            </div>
          </div>
        ))}
        <div className="add-card" onClick={() => navigate("/create")}>
          <div className="add-icon">+</div>
          <p className="add-text">Add a Persona</p>
        </div>
      </div>
    </div>
  );
};

export default PersonaList;
