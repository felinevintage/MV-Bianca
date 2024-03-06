import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { username, password } = credentials;
  const [errorMessage, setErrorMessage] = useState("");
  const {isLoggedIn, signIn} = useAuth();
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      //store it locally
      localStorage.setItem("token", data.token);
      signIn()
      navigate("/events");
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
      console.log(error);  
    }
  };

  return (
    <div className="container d-flex pt-5 justify-content-center">
      <div>
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
          placeholder="username"
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="password"
        />
         {errorMessage && (
          <div className="text-center text-danger mb-2">{errorMessage}</div>
        )}
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-success" onClick={login}>
            Log in
          </button>
        </div>
     <div className="nav-item fs-4 text-center p-4">
          <Link to="/register" className="nav-link active">
            Click here to Register
          </Link>
        </div>
      </div>
    </div>
  );
  
}

export default Login;