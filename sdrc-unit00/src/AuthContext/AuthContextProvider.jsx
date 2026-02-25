import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    // 1. Use 'const' instead of 'let'
    const [user, setUser] = useState({
        login: localStorage.getItem("user_token") ? true : false
    });

    // 2. Define the 'loading' state that was missing
    const [loading, setLoading] = useState(false);

    return (
        // 3. Pass both state variables and their setters
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}