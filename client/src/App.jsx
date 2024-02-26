import { Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import Create from "./pages/Create";
import Vote from "./pages/Vote";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/create" element={<Create />} />
        <Route path="/vote/:id" element={<Vote />} />
      </Routes>
    </div>
  );
}

export default App;
