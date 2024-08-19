import Box from "./Box"
import Summary from "./Summary"
import { useState } from "react"

function Main({children}) {
    

    return (
        <div className="main">
            {children}
        </div>
    )
}

export default Main
