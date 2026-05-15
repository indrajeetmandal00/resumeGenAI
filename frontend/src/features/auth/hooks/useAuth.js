// API=>STATE=>{HOOKS}=>COMPONENT/UI.  the hooks handle all the things that flows down from the API and state

import { useContext, useEffect } from "react";
import { AuthContext } from "../state/auth.context";
import { login, register, logout, profile } from "../services/auth.api";





export const useAuth = () => {      //res.status(200).json({ message: 'Login successful!',user: {...}
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    const handleLogin = async (email, password) => {
        try {
            setLoading(true);
            const data = await login(email, password);
            setUser(data.user);
            // const navigateTo = useNavigate?; // kept for potential future usage

            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            throw error;
        }
    }

    const handleRegister = async (username, email, password) => {
        try {
            setLoading(true);
            const data = await register(username, email, password);
            setUser(data.user);
            setLoading(false);
        }

        catch (error) {
            setLoading(false);
            throw error;
        }

    }

    const handleLogout = async () => {
        try {
            setLoading(true);
            const data = await logout();
            setUser(null);
            setLoading(false);
        }

        catch (error) {
            setLoading(false);
            throw error;
        }

    }

    //----handles refresh-------
    useEffect(() => {        //useEffect is used to call the function only once when the component mounts and not when the component re-renders.
        const getandsetuser = async () => {
            try {
                const data = await profile();     //profile checks the token in cookies so even after refresh user still stays logged in
                setUser(data?.user || null);
            } catch (error) {
                setUser(null); // Clear user state if profile fails (e.g., they are logged out)
            } finally {
                setLoading(false); // ALWAYS clear loading state so the UI doesn't freeze
            }
        }
        getandsetuser();

    }, [])


    return { user, loading, handleLogin, handleRegister, handleLogout };
}