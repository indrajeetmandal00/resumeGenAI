import { createContext, useState } from "react";     //API=>{STATE}=>HOOKS=>COMPONENT/UI

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    // Set loading to false so the app doesn't get stuck. 
    // Later, you can change this back to true and use a useEffect to verify the token!
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );

}; 