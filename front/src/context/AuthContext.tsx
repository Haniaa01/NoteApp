import React, {createContext, ReactNode, useState, FormEvent, FC, useEffect} from "react";
import { jwtDecode } from 'jwt-decode'; // Importing jwtDecode correctly
import { useHistory } from 'react-router-dom';

// Define the type for your context value
export interface AuthContextType {
    user: any; // Consider defining a more specific type for 'user'
    loginUser: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    logoutUser: () => void; // Updated type
    authTokens: any
}

// Define a default context value
const defaultAuthContext: AuthContextType = {
    user: null,
    loginUser: async () => {},
    logoutUser: () => {},
    authTokens: null // Removed semicolon
};

// Create the context with the default value
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') || '') : null);
    const [user, setUser] = useState(() => {
        const storedToken = localStorage.getItem('authTokens');
        try {
            return storedToken ? jwtDecode(storedToken) : null;
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    });
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
        };
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': target.username.value, 'password': target.password.value })
        });
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            history.push('/');
        } else {
            alert('Something went wrong');
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        history.push("/login");
    };

    let updateToken = async ()=> {
        console.log("Update token called");
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh':authTokens?.refresh})
        });
        let data = await response.json();

        if(response.status === 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));


        }else{
            setAuthTokens(null);
            setUser(null);
            localStorage.removeItem('authTokens');
            history.push("/login");
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData: AuthContextType = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        authTokens: authTokens
    };

    let fourMinutes = 1000*60*4;
    useEffect(() => {
        if(loading){
            updateToken()
        }
        let interval = setInterval( ()=>{
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval);

    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;