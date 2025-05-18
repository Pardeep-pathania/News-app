import React, { createContext, useState } from 'react'

let UserContext = createContext()

export default UserContext;

export function UserProvider({ children }){

    const [user,setUser] = useState(null);

    const login = (userData)=>{
        setUser(userData)
    };

    const logout = ()=>{
        setUser(null);
    };

    return(
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}