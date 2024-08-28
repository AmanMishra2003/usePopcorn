import { useEffect, useState } from 'react'
import {tempMovieData, tempWatchedData} from './assets/data'
import Navbar from './components/Navbar';
import Main from './components/Main';
import Box from './components/Box';
import Summary from './components/Summary';
import Input from "./components/Input"
import Logo from "./components/Logo"
import MovieList from './components/MovieList';
import NumResults from "./components/NumResults"
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SelectedMovieDetailsComponent from './components/SelectedMovieDetailsComponent';

const API_KEY='f27a037f'
const id='tt3896198'

document.title = `usePopcorn`


function App() {
  const [searchMovieData, setSearchMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchedMovieData, setwatchedMovieData] = useState([]);
  const [error, setError] = useState()
  const [query,setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
console.log(watchedMovieData)
  const getId = (id)=>{
    console.log(id)
    setSelectedId(id)
  }

  useEffect(()=>{
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

  return (
    <>
      <Navbar>
            <Logo/>
            <Input query={query} setQuery={setQuery}/>
            <NumResults movieSearchResult={searchMovieData.length}/>
      </Navbar>
      <Main>
            <Box>
              {/* {
                loading ? 
                <Loader/>
                :
                <MovieList data={searchMovieData} showDetails={false}/>
              } */}
              {
                loading && <Loader/>
              }
              {
                !loading && !error && <MovieList data={searchMovieData} showDetails={false} getId={getId} />
              }
              {
                error && <ErrorMessage message={error}/>
              }
            </Box>
            <Box>
                {
                  selectedId ?
                  <SelectedMovieDetailsComponent id={selectedId} removeId={setSelectedId} setwatchedMovieData={setwatchedMovieData} watchedMovieData={watchedMovieData}/>
                  :
                  <>
                   <Summary data={watchedMovieData}/>
                   <MovieList data={watchedMovieData} showDetails={true} deleteMovies={setwatchedMovieData}/>
                  </>

                }
               
                
            </Box>
      </Main>
    </>
  )
}

export default App
