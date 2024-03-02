import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <div class="container cont">
        {auth ? (
          <header class="d-flex  justify-content-center left1 py-3">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <Link to="/" class="nav-link " aria-current="page">
                  Products
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/add" class="nav-link">
                  Add Products
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/signup" class="nav-link" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </header>
        ) : (
          <header class="d-flex  justify-content-center  py-3">
            <ul class="nav nav-pills">
              <div className="log">
                <li class="nav-item">
                  <Link to="/signup" class="nav-link">
                    Sign Up
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/login" class="nav-link">
                    Log In
                  </Link>
                </li>
              </div>
            </ul>
          </header>
        )}
      </div>
    </div>
  );
}
