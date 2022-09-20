import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(sessionStorage.getItem("loggedIn")) || false);

  const updateLoggedIn = (newValue) => {
    setIsLoggedIn(newValue);
    sessionStorage.setItem("loggedIn", newValue);
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: isLoggedIn,
      updateLoggedIn: updateLoggedIn
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;