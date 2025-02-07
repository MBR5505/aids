import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
        console.log(AuthContext);
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
      });
  }, []); // Add an empty dependency array

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;