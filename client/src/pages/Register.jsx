import { useState } from "react";
import { Link } from "react-router-dom";

const initial = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
};

function Register() {
  const [user, setUser] = useState({ ...initial });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setUser({ ...initial });
        setRegistrationSuccess(true);
      } else {
        console.log("Failed to submit");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setUser((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container d-flex pt-5 justify-content-center">
      {registrationSuccess ? (
        <div className="text-center fs-4">
          <h2>Registration Successful!</h2>
          <Link className="text-decoration-none fw-semibold text-success" to="/login">Click here to Login</Link>
        </div>
      ) : (
          <form onSubmit={handleSubmit}>
            <div>
                <label>Pick a username</label>
                    <input
                    onChange={handleChange}
                    value={user.username}
                    name="username"
                    type="username"
                    className="form-control mb-2"
                    />
        </div>
        <div>
            <label>Choose a password</label>
                <input
                onChange={handleChange}
                value={user.password}
                name="password"
                type="password"
                className="form-control mb-2"
                />
        </div>
        <div>
            <label>First Name</label>
                <input
                onChange={handleChange}
                value={user.firstname}
                name="firstname"
                type="text"
                className="form-control mb-2"
                />
        </div>
        <div>
            <label>Surname</label>
                <input
                onChange={handleChange}
                value={user.lastname}
                name="lastname"
                type="text"
                className="form-control mb-2"
                />
        </div>
          <div className="d-flex gap-2 justify-content-center">
            <button type="submit" className="btn btn-success">
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Register;