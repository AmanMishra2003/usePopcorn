import {useRef } from "react"
import { useKey } from "../hooks/useKey"


function Input({query, setQuery}) {
    const inputEl = useRef(null)

    // useEffect(function(){
    //     function focusSearchBar(e){
    //         if(e.code==='Enter'){
    //             inputEl.current.focus();
    //         }
    //     }

    //     document.addEventListener('keydown',focusSearchBar)

    //     return ()=>document.removeEventListener('keydown',focusSearchBar)

    // },[])

    useKey('enter', ()=>inputEl.current.focus())

    return (
        <div className="search-bar">
                <input type="text" className="search" placeholder="Search Movies..." name="searchMovie" onChange={(e)=>setQuery(e.target.value)} value={query} ref={inputEl} />
        </div>
    )
}

export default Input
