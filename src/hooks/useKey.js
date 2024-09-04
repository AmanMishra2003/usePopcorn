import { useEffect } from "react"
export function useKey(key, callbackFunc){
    useEffect(()=>{
        function callback(e){
            if(e.code.toLowerCase() === key.toLowerCase()){
                callbackFunc()
            }
        }

        document.addEventListener('keydown', callback)

        return ()=>{
            document.removeEventListener('keydown', callback)
        }
    },
    [callbackFunc])
}