import React, { useState, useContext } from "react";

import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import { app, storage } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((response) => {
      console.log(response);
      navigate("/");
    });
  };
  return (
    <>
      <section className="header">
        <article>
          <img src={logo} alt="logo" />
        </article>
      </section>
      <section className="sectionForm">
        <h1>Login Page</h1>
        <form>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br></br>
          <button onClick={(e) => handleSubmit(e)}>Login</button>
        </form>
        <p>Or</p>
        <Link to="/register">
          <button className="registerBtn">Register</button>
        </Link>
      </section>
    </>
  );
};

export default Login;
