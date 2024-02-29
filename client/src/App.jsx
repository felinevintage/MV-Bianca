import { Routes, Route, Link } from "react-router-dom";
import Events from "./pages/Events";
import Create from "./pages/Create";
import Vote from "./pages/Vote";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";


function App() {
  return (
    <>
      <ul className="nav nav-tabs fw-semibold fs-5 pt-3 bg-light justify-content-start" >
      <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/register"
          >
            Register
          </Link>
        </li>
      <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/login"
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/events"
          >
            Events
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/create"
          >
            Create
          </Link>
          </li>
          <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/vote/:id"
          >
            Event voting
          </Link>
        </li>
        
        </ul>

        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create" element={<Create />} />
        <Route path="/vote/:id" element={<Vote />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
