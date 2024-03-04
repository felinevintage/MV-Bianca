import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "test",
    password: "test",
  });

  // const [data, setData] = useState(null);

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      //store it locally
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      console.log(data.message, data.token, data.userId);
    } catch (error) {
      console.log(error);  
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
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
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-success" onClick={login}>
            Log in
          </button>
          <button className="btn btn-outline-dark ml-2" onClick={logout}>
            Log out
          </button>
        </div>
     <div className="nav-item">
      <div className="nav-link active text-center p-4">
          Register
          <Link to ="/register"></Link>
        
      </div>
      </div>
      </div>
{/* 
      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )} */}
    </div>
  );
  
}

export default Login;