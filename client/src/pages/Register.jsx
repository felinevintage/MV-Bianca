import { useState } from "react";
import { Link } from "react-router-dom";



const initial = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
}

function Register() {

    const[newUser, setNewUser] = useState({ ...initial });
    
    
    async function handleSubmit(event) {
        event.preventDefault();
        try {
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
          if (response.ok) {
            setNewUser({ ...initial });
          } else {
            console.log("Failed to submit");
          }
        } catch (err) {
          console.log(err);
        }
      }

      const handleChange = (e) => {
        setNewUser((input) => ({
          ...input,
          [e.target.name]: e.target.value,
        }));
      };


return (
    <>
    <div className="container d-flex pt-5 justify-content-center">
        <form onSubmit={handleSubmit}>
            <div>
                <label>Pick a username</label>
                    <input
                    onChange={handleChange}
                    value={newUser.username}
                    name="username"
                    type="text"
                    className="form-control mb-2"
                    />
        </div>
        <div>
            <label>Choose a password</label>
                <input
                onChange={handleChange}
                value={newUser.password}
                name="password"
                type="password"
                className="form-control mb-2"
                />
        </div>
        <div>
            <label>First Name</label>
                <input
                onChange={handleChange}
                value={newUser.firstname}
                name="firstname"
                type="text"
                className="form-control mb-2"
                />
        </div>
        <div>
            <label>Surname</label>
                <input
                onChange={handleChange}
                value={newUser.lastname}
                name="lastname"
                type="text"
                className="form-control mb-2"
                />
        </div>
        <div className="d-flex gap-2 justify-content-center">
          <button type="submit" className="btn btn-primary" >
            Register
          </button>
        </div>
        </form>
        </div>
    </>
)

}

export default Register;
