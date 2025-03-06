import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePersona from "./components/CreatePersona";
import EditPersona from "./components/EditPersona";
import PersonaList from "./components/PersonaList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonaList />} />
        <Route path="/create" element={<CreatePersona />} />
        <Route path="/edit/:id" element={<EditPersona />} />
      </Routes>
    </Router>
  );
}

export default App;
