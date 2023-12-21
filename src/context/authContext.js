import { createContext, useEffect, useState } from "react";
import * as UserServices from "../server/adminstore";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(
    JSON.parse(localStorage.getItem("access_token_admin1")) || null
  );

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  )

  const login = async (loginData) => {
    const response = await UserServices.loginAdmin(loginData);
    localStorage.setItem(
      "access_token_admin",
      JSON.stringify(response.data.token)
    );
    const { token } = response.data;
    setCurrentAdmin({ token, role: "admin" });
  };

  const loginCurrentUser = async (loginData) => {
    const response = await UserServices.loginUser(loginData);
    localStorage.setItem(
      "access_token_user",
      JSON.stringify(response.data.token)
    );
    const decoded = jwtDecode(response.data.token);
    localStorage.setItem(
        "user",
        JSON.stringify(decoded)
    );
    // console.log('decoded', decoded)
    
    return response;
  };

  useEffect(() => {
    console.log("currentAdmin", currentAdmin?.role);
    localStorage.setItem("access_token_admin1", JSON.stringify(currentAdmin));
  }, [currentAdmin]);

  return (
    <AuthContext.Provider value={{ currentAdmin, login, loginCurrentUser, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
