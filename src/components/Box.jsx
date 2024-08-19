import Button from "./Button"
import { useState } from "react"

function Box({children }) {
    const [showBox, setShowBox] = useState(true);

    return (
        <div className="box">
            <Button className="btn-toggle" onClick={()=>{setShowBox((showBox)=>!showBox)}}>{setShowBox? <span>−</span>:<span>+</span>}</Button>
            {
                showBox
                &&
                <>
                    {children}
                </>
            }
        </div>
    )
}

export default Box
