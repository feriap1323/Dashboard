import React, { useEffect, useState } from "react";
import "./App.css";

import Login from "./login";
import Signup from "./signup";

function App() {

  // Page State
  const [page, setPage] = useState("home");

  // API Data State
  const [users, setUsers] = useState([]);

  // API Button State
  const [showUsers, setShowUsers] = useState(false);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Error State
  const [error, setError] = useState("");

  // API Calling
  useEffect(() => {

    if (showUsers) {

      setLoading(true);

      fetch("https://jsonplaceholder.typicode.com/users")

        .then((response) => response.json())

        .then((data) => {

          setUsers(data);

          setLoading(false);

        })

        .catch((error) => {

          console.log(error);

          setError("Failed To Load Users");

          setLoading(false);

        });

    }

  }, [showUsers]);

  return (

    <div>

      {/* HEADER */}

      <header className="header">

        <div className="logo">
          DevSphere
        </div>

        <ul className="nav-links">

          <li>
            <button
              className="nav-btn"
              onClick={() => setPage("home")}
            >
              Home
            </button>
          </li>

          <li>
            <button className="nav-btn">
              About
            </button>
          </li>

          <li>
            <button className="nav-btn">
              Gallery
            </button>
          </li>

          <li>
            <button className="nav-btn">
              Contact
            </button>
          </li>

          {/* API BUTTON */}

          <li>
            <button
              className="nav-btn"
              onClick={() => setShowUsers(true)}
            >
              Load Users
            </button>
          </li>

          <li>
            <button
              className="nav-btn"
              onClick={() => setPage("login")}
            >
              Login
            </button>
          </li>

          <li>
            <button
              className="signup-btn"
              onClick={() => setPage("signup")}
            >
              Sign Up
            </button>
          </li>

        </ul>

      </header>

      {/* HOME PAGE */}

      {page === "home" && (

        <div className="home">

          <h1>
            Welcome To DevSphere
          </h1>

          <p>
            Frontend development project using React hooks and REST APIs.
          </p>

          {/* HERO BUTTONS */}

          <div className="hero-btns">

            <button className="hero-btn">
              Explore
            </button>

            <button className="hero-btn">
              Learn More
            </button>

          </div>

          {/* CARDS */}

          <div className="cards">

            <div className="card">
              <h3>React Development</h3>
              <p>
                Build modern UI using reusable components.
              </p>
            </div>

            <div className="card">
              <h3>API Integration</h3>
              <p>
                Fetch and display live data from APIs.
              </p>
            </div>

            <div className="card">
              <h3>Responsive Design</h3>
              <p>
                Create websites for all devices.
              </p>
            </div>

          </div>

          {/* LOADING */}

          {loading && (

            <h2 className="loading">
              Loading Users...
            </h2>

          )}

          {/* ERROR */}

          {error && (

            <h2 className="error-message">
              {error}
            </h2>

          )}

          {/* TABLE */}

          {users.length > 0 && (

            <table border="1" cellPadding="10" cellSpacing="0">

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Company</th>

                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.username}</td>

                    <td>{user.email}</td>

                    <td>{user.address.city}</td>

                    <td>{user.company.name}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      )}

      {/* LOGIN PAGE */}

      {page === "login" && <Login />}

      {/* SIGNUP PAGE */}

      {page === "signup" && <Signup />}

      {/* FOOTER */}

      <footer className="footer">

        <p>
          © 2026 DevSphere | All Rights Reserved
        </p>

      </footer>

    </div>

  );

}

export default App;