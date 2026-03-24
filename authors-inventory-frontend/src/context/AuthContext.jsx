import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken, saveTokens, clearTokens } from '../utils/tokenUtils';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user,    setUser]    = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 > Date.now()) setUser(decoded);
            else clearTokens();
        } catch { clearTokens(); }
        }
        setLoading(false);
    }, []);

    const login = async (creds) => {
        const { data } = await loginUser(creds);
        saveTokens(data.accessToken, data.refreshToken);
        const decoded = jwtDecode(data.accessToken);
        setUser(decoded);
        return decoded;
    };

    const register = async (userData) => {
        // Register does not return a token, so login after registering
        await registerUser(userData);
        const { data } = await loginUser({
        username: userData.username,
        password: userData.password,
        });
        saveTokens(data.accessToken, data.refreshToken);
        const decoded = jwtDecode(data.accessToken);
        setUser(decoded);
        return decoded;
    };

    const logout = () => { clearTokens(); setUser(null); };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
        {children}
        </AuthContext.Provider>
    );
};