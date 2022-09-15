import React, { useState, useRef, useEffect } from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, storage } from "../firebaseConfig";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const [errFound, setErrFound] = useState(false);
  const [errFoundPsw, setErrFoundPsw] = useState(false);
  const [validation, setValidation] = useState(true);

  let navigate = useNavigate();
  const [errMsg, setErrMsg] = useState({
    errUser: "",
    errPsw: "",
    errFile: "",
  });

  const auth = getAuth();

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim() || userName.length < 6) {
      setErrFound(true);
      errMsg.errUser = "Please enter an invalid email";
    } else {
      errMsg.errUser = "";
      setErrFound(false);
      setValidation(true);
    }

    if (!password.trim() || password.length < 6) {
      setErrFoundPsw(true);
      errMsg.errPsw = "Please enter an password email";
      setValidation(false);
    } else {
      errMsg.errUser = "";
      setErrFoundPsw(false);
      setValidation(true);
    }

    if (imageUpload == null) {
      console.log("file can't empty");
      return setErrMsg({ ...errMsg, errFile: "Image can't be empty" });
    }

    if (validation) {
      console.log("loading..");
      createUserWithEmailAndPassword(auth, userName, password)
        .then((response) => {
          console.log(response.user);
          if (imageUpload == null) return;
          const imageRef = ref(
            storage,
            `${userName}/${imageUpload.name + v4()}`
          );
          console.log(imageRef);
          uploadBytes(imageRef, imageUpload)
            .then(() => {
              console.log("image uploaded");
              navigate("/");
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          errMsg.errUser = error.message;
          console.log(errMsg.errUser);
        });
    }
  };

  useEffect(() => {
    if (imageUpload) {
      if (!imageUpload.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        inputRef.current.value = null;
        setImageUpload(null);
        return setErrMsg({ ...errMsg, errFile: "Please select an image file" });
      } else {
        return setErrMsg({ ...errMsg, errFile: "" });
      }
    }
    // console.log(userName);
  }, [imageUpload]);

  const removeImg = () => {
    inputRef.current.value = null;
    setImageUpload(null);
    console.log(imageUpload);
  };

  return (
    <>
      <section className="header">
        <article>
          <img src={logo} alt="logo" />
        </article>
      </section>
      <section className="sectionForm">
        <h1>Sign up!</h1>
        <form>
          <br></br>
          <input
            type="email"
            placeholder="E-mail address"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errFound && <p class="errorMessage">{errMsg.errUser}</p>}
          <br></br>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errFoundPsw && <p className="errorMessage">{errMsg.errPsw}</p>}
          <br></br>
          <input
            ref={inputRef}
            type="file"
            style={{ width: 200 }}
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          {imageUpload && (
            <span onClick={removeImg}>
              <i className="fa-solid fa-circle-xmark" />
            </span>
          )}
          {errMsg.errFile && (
            <p className="errorMessage errorFile">{errMsg.errFile}</p>
          )}
          <br></br>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Register
          </button>
        </form>
        <p>Or</p>

        <p>
          Already have an account?{" "}
          <Link to="/">
            <span>Sign in</span>
          </Link>
        </p>
      </section>
    </>
  );
};

// export default withRouter(Register);
export default Register;
