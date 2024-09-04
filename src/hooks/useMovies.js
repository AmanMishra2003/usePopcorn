import {useState, useEffect} from 'react'

const API_KEY='f27a037f'
const id='tt3896198'

export function useMovies(query, callback){

    const [searchMovieData, setSearchMovieData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState()


    useEffect(()=>{
        callback?.();

        const controller = new AbortController();
        const dataFetchFunction = async function(){
          try{
            setLoading(true)
            setError('')
            const fetchData = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
              {signal : controller.signal}
            );
    
            if(!fetchData.ok){
              throw new Error('Something went wrong!!')
            } 
    
            const res = await fetchData.json();
    
            if(res.Response==='False'){
              throw new Error('No movie found!')
            } 
    
            setSearchMovieData(res.Search); // Return an empty array if res.Search is undefined
    
          }catch(err){
            if(err.name!=="AbortError"){
              setError(err.message)
            }
          }finally{
            setLoading(false)
          }
    
        }
        if(query.length<3){
          setSearchMovieData([])
          setError('')
          return
        }
        dataFetchFunction()
    
        return ()=>{
          controller.abort()
        }
      },[query])

    return {
        searchMovieData,
        loading,
        error
    }
}