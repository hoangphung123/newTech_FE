import { createContext, useEffect, useState } from "react";
import * as UserServices from "../server/adminstore"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentAdmin , setCurrentAdmin] = useState(
            JSON.parse(localStorage.getItem("access_token_admin1") )|| null
    );


    const login = async (loginData)=>{
        const response = await UserServices.loginAdmin(loginData);
        localStorage.setItem("access_token_admin", JSON.stringify(response.data.token));
        const { token } = response.data;
        setCurrentAdmin({token, role: 'admin'})
     }
 
     useEffect(() => {
         console.log('currentAdmin', currentAdmin?.role)
         localStorage.setItem("access_token_admin1", JSON.stringify(currentAdmin));
     },[currentAdmin]);   


    return (
        <AuthContext.Provider value = {{currentAdmin, login }}>
            {children}
        </AuthContext.Provider>
    )
}