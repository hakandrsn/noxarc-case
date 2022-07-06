import React, { createContext, useContext, useEffect, useState } from 'react'

const Auth = createContext()
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(false);
    const login = async () => { console.log("first") }
    const value = {
        setLoading,
        loading,
        login,
        user,
        setUser
    }
    return (
        <Auth.Provider value={value}>
            {children}
        </Auth.Provider>
    )
}

export const useAuth = () => { return useContext(Auth) }
