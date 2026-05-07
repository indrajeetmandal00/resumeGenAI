import { createContext,useState} from "react";     //API=>{STATE}=>HOOKS=>COMPONENT/UI

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );

}; 