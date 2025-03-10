import { useState, useEffect } from "react";

const PersonaLastModified = (personaId) => {
  const [lastModifiedTime, setLastModifiedTime] = useState(null);

  useEffect(() => {
    const storedTime = localStorage.getItem(`persona_${personaId}_lastModified`);
    if (storedTime) {
      setLastModifiedTime(new Date(storedTime));
    } else {
      setLastModifiedTime(null);
    }
  }, [personaId]);

  const getLastModifiedTime = () => {
    if (!lastModifiedTime) {
      return "Never modified";
    }

    const now = new Date();
    const diff = now.getTime() - lastModifiedTime.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days<31){
    return `${days} days ago`;
    }
    const months =Math.floor(diff/(1000*60*60*24*30));
    return `${months} Months ago`;
  };

  return getLastModifiedTime();
};

export default PersonaLastModified;