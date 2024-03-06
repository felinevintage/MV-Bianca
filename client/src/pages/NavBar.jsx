import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
    

    const { isLoggedIn, signIn, signOut } = useAuth();

    const logout = () => {
      localStorage.removeItem("token");
      signOut();
    }


    return (
        <nav className="navbar">
          <div className="container-fluid">
            <ul className="nav nav-tabs fw-semibold fs-5 bg-light justify-content-end border-success">
            {!isLoggedIn && ( <li className="nav-item ">
                <Link className="nav-link active border-success" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              )}
              {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link active border-success" aria-current="page" to="/login">
                  Login
                </Link>
              </li>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active border-success" aria-current="page" to="/events">
                      Events
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link active border-success" aria-current="page" to="/create">
                      Create
                    </Link>
                  </li>
                  
                </>
              )}
            </ul>
            {isLoggedIn && (
            <button
                      className="btn fw-semibold border-success text-uppercase fs-6 pt-2 bg-light justify-content-end"
                      onClick={logout}
                    >
                      Logout
                    </button>
            )}
          </div>
        </nav>
      );
      
}      