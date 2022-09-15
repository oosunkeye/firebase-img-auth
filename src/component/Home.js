import React, { useContext, useEffect, useState } from "react";
import { storage } from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";
import { ref, getDownloadURL, listAll } from "firebase/storage";

const auth = getAuth();

const Home = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const { currentUser, setCurrentUser } = useContext(AuthContext);
  console.log(currentUser.email);
  let navigate = useNavigate();
  const logOut = () => {
    setCurrentUser(null);
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const imagesListRef = ref(storage, `${currentUser.email}/`);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <h1 className="headerHome">welcome {currentUser.email}</h1>
      <button onClick={() => logOut()}>Sign out</button>
      <div className="homeImg">
        {imageUrls ? <img src={imageUrls} /> : "Loading.."}
      </div>
    </>
  );
};

export default Home;
