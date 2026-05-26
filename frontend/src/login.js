import React, { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    let valid = true;

    if(email === ""){
      setEmailError("Email is required");
      valid = false;
    }

    if(password === ""){
      setPasswordError("Password is required");
      valid = false;
    }

    if(valid){
      alert("Login Successful");
    }

  };

  return (

    <div className="form-container">

      <form className="form-box" onSubmit={handleSubmit}>

        <h2>Login Here!</h2>

        {/* Email */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}

          onChange={(e) => {
            setEmail(e.target.value);

            if(e.target.value.length > 0){
              setEmailError("");
            }
          }}

          onBlur={() => {
            if(email === ""){
              setEmailError("Email is required");
            }
          }}
        />

        <p className="error">{emailError}</p>

        {/* Password */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}

          onChange={(e) => {
            setPassword(e.target.value);

            if(e.target.value.length > 0){
              setPasswordError("");
            }
          }}

          onBlur={() => {
            if(password === ""){
              setPasswordError("Password is required");
            }
          }}
        />

        <p className="error">{passwordError}</p>

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );
}

export default Login;