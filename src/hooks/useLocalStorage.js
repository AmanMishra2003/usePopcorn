import { useState, useEffect } from "react";

export function useLocalStorage(intialValue, key) {
    
    const [value, setValue] = useState(function(){
        const moviesStoredInLocalStorage = localStorage.getItem(key);
        return intialValue ? JSON.parse(moviesStoredInLocalStorage) : []
    });

    useEffect(()=>{
        localStorage.setItem(
          key,
          JSON.stringify(value)
        )
    },[value, key])

    return [value, setValue]
}
