import React, { createContext, useEffect, useState } from 'react'

export const routeGuardContext = createContext()

function AuthContext({ children }) {

    const [role, setRole] = useState('')
    const [authorisedUser, setAuthorisedUser] = useState(false)

    useEffect(() => {
        if (
            sessionStorage.getItem("token") &&
            sessionStorage.getItem("existingUser")
        ) {
            const user = JSON.parse(
                sessionStorage.getItem("existingUser")
            )
            setRole(user.role)
            setAuthorisedUser(true)
        }

    }, [])

    return (
        <routeGuardContext.Provider
            value={{ role, authorisedUser, setAuthorisedUser, setRole }} >
            {children}
        </routeGuardContext.Provider>
    )
}

export default AuthContext