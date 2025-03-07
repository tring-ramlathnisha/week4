import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonaLastModified from "./PersonaLastModified";
import "../styles/PersonaList.css";

const PersonaList = ({ onLogout }) => {
  const personas = useSelector((state) => state.personas.personas);
  const navigate = useNavigate();
  

  return (
    <div className="persona-container">
      <div className="header">
        <h2 className="persona-title">Personas</h2>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
      <br/>

      <div className="persona-grid">
        {/*{personas.map((persona) => (
          <div key={persona.id} className="persona-card" onClick={() => navigate(`/edit/${persona.id}`)}>
            <img src={persona.image} alt={persona.name} className="persona-image" />
            <div className="persona-content">
              <h3 className="persona-name">{persona.name}</h3>
              <p className="persona-quote" dangerouslySetInnerHTML={{ __html: `${persona.quote}` }}></p>
              <p className="persona-updated">Last updated:{getLastModifiedTime(persona)} </p>
            </div>
          </div>
        ))}*/}
        {personas.map((persona) => {
          const lastModified = PersonaLastModified(persona.id); // Use the hook here

          return (
            <div
              key={persona.id}
              className="persona-card"
              onClick={() => navigate(`/edit/${persona.id}`)}
            >
              <img
                src={persona.image}
                alt={persona.name}
                className="persona-image"
              />
              <div className="persona-content">
                <h3 className="persona-name">{persona.name}</h3>
                <p
                  className="persona-quote"
                  dangerouslySetInnerHTML={{ __html: `${persona.quote}` }}
                ></p>
                <p className="persona-updated">Last updated: {lastModified}</p>
              </div>
            </div>
          );
        })}

        <div className="add-card" onClick={() => navigate("/create")}>
          <div className="add-icon">+</div>
          <p className="add-text">Add a Persona</p>
        </div>
      </div>
    </div>
  );
};

export default PersonaList;
