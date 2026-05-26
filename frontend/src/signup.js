import React, { useState } from "react";

function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    let valid = true;

    if(username === ""){
      setUsernameError("Username is required");
      valid = false;
    }

    if(email === ""){
      setEmailError("Email is required");
      valid = false;
    }

    if(password === ""){
      setPasswordError("Password is required");
      valid = false;
    }

    if(confirmPassword === ""){
      setConfirmPasswordError("Confirm Password is required");
      valid = false;
    }

    else if(password !== confirmPassword){
      setConfirmPasswordError("Password does not match");
      valid = false;
    }

    if(valid){
      alert("Registration Successful");
    }

  };

  return (

    <div className="form-container">

      <form className="form-box" onSubmit={handleSubmit}>

        <h2>Register With Us!</h2>

        {/* Username */}

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);

            if(e.target.value.length > 0){
              setUsernameError("");
            }
          }}
        />

        <p className="error">{usernameError}</p>

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
        />

        <p className="error">{passwordError}</p>

        {/* Confirm Password */}

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);

            if(e.target.value.length > 0){
              setConfirmPasswordError("");
            }
          }}
        />

        <p className="error">{confirmPasswordError}</p>

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );
}

export default Signup;