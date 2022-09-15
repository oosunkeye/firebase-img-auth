import React, { useEffect, useState } from "react";
import { app } from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = React.createContext();
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.accessToken);
        setCurrentUser(user);
        setPending(false);
      } else {
        setPending(false);
      }
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
