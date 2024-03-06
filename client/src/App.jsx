import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import NavBar from "./pages/NavBar";
import Events from "./pages/Events";
import Create from "./pages/Create";
import Vote from "./pages/Vote";
import Register from "./pages/Register";
import Login from "./pages/Login";
import myImage from "./7359867.jpg";
import "./App.css";
import RequireAuth from "./pages/RequireAuth";
import AuthContext from "./contexts/AuthContext";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function signIn() {
    setIsLoggedIn(true);
  }

  function signOut() {
    setIsLoggedIn(false);
  }

  const authObject = {
    isLoggedIn,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value ={authObject}>
    <div>
    <NavBar />
    <div className="App container p-5">
      <Routes>
        <Route path="/" element ={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/events" element={
        <RequireAuth>
        <Events />
        </RequireAuth>
        }
        />
        <Route path="/create" element={
        <RequireAuth>
        <Create />
        </RequireAuth>
      } 
      />
        <Route path="/vote/:id" element={
        <RequireAuth>
        <Vote />
        </RequireAuth>
      } 
      />
        
      </Routes>
    </div>
    </div>
    </AuthContext.Provider>
  );
  
}

export default App;

function Home () {
  return (
    <div className="container">
    <div className="text-center">
      <h2>Plan Your Events</h2>
     <div>
          <img
            className="banner-image img-responsive rounded img-fluid"
            src={myImage}
            alt=""
          />
        </div>
        <div className="nav-item fs-4 text-center p-4">
          <Link to="/login" className="nav-link active">
            Click here to Register or Login
          </Link>
        </div>
    </div>
    </div>
  )
}
