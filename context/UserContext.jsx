import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const registerUser = (userData) => {
    
    };

    const login = (userData) => {
        const { _id, email, password, avatar, description, pseudo } = userData;
        setUser({ _id, email, password, avatar, description, pseudo });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, message, registerUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}; 