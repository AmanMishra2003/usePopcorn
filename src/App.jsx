import { useEffect, useState } from 'react'
import { useMovies } from './hooks/useMovies';
import { useLocalStorage } from './hooks/useLocalStorage';
// import {tempMovieData, tempWatchedData} from './assets/data'
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


// document.title = `usePopcorn`


function App() {
 
  
  const [query,setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [watchedMovieData, setwatchedMovieData] = useLocalStorage([],'watched')
  const  {
    searchMovieData,
    loading,
    error
  } =  useMovies(query, ()=>setSelectedId(''))

  const getId = (id)=>{
    setSelectedId(id)
  }


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
