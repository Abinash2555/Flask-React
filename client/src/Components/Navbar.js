// this is navbar class
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

export default class Navbar extends Component {
  static contextType = AuthContext;
  render() {
    // User data is parsing form local Storage
    let user = JSON.parse(window.localStorage.getItem("user"));
    return (
      <>
      {/* Nav bar start */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Math App
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <p>
                    {/* calling date api in nepali format */}
                  <iframe
                     title="date" 
                      scrolling="no"
                      frameBorder="0"
                      marginWidth="0"
                      marginHeight="0"
                      allowtransparency="true"
                      src="https://www.ashesh.com.np/linknepali-time.php?dwn=only&font_color=ffffff&font_size=14&bikram_sambat=0&format=dmyw&api=1401z5l593"
                      width="165"
                      height="22"
                    ></iframe>
                  </p>
                </li>
              </ul>
              {/* Below only run if there is any existence of data in localStorage */}
              {!window.localStorage.getItem("user") ? (
                <form className="d-flex">
                  <Link
                    className="btn btn-primary mx-1"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-primary mx-1"
                    to="/signup"
                    role="button"
                  >
                    Signup
                  </Link>
                </form>
              ) : (
                <form className="d-flex">
                  <p
                    className="text-light mx-3"
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: "20px",
                      marginTop: "0.5rem",
                      marginBottom: "0rem",
                    }}
                  >
                    {user.username}
                  </p>
                  <Link
                    className="btn btn-primary mx-1"
                    to="/logout"
                    role="button"
                  >
                    Logout
                  </Link>
                </form>
              )}
            </div>
          </div>
        </nav>
        {/* Nav bar start */}
      </>
    );
  }
}
