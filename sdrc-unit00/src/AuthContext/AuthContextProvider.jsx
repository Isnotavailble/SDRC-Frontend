import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);


export function AuthContextProvider({children}){
    let [user ,setUser] = useState(null);
    
    return (
        <AuthContext.Provider value={{user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext);
}