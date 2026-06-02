import React, { createContext, useState } from 'react'

export const searchKeyContext = createContext()

function ContextShare({ children }) {

    const [searchKey, setSearchKey] = useState("")

    return (
        <searchKeyContext.Provider
            value={{ searchKey, setSearchKey }}
        >
            {children}
        </searchKeyContext.Provider>
    )
}

export default ContextShare