import { useState } from 'react'
import {tempMovieData, tempWatchedData} from './assets/data'
import Navbar from './components/Navbar';
import Main from './components/Main';
import Box from './components/Box';
import Summary from './components/Summary';
import Input from "./components/Input"
import Logo from "./components/Logo"
import MovieList from './components/MovieList';
import NumResults from "./components/NumResults"


function App() {
  const [searchMovieData, setSearchMovieData] = useState(tempMovieData)
  const [watchedMovieData, setwatchedMovieData] = useState(tempWatchedData)
  
  return (
    <>
      <Navbar>
            <Logo/>
            <Input/>
            <NumResults movieSearchResult={searchMovieData.length}/>
      </Navbar>
      <Main>
            <Box>
              <MovieList data={searchMovieData} showDetails={false}/>
            </Box>
            <Box>
                <Summary data={watchedMovieData}/>
                <MovieList data={watchedMovieData} showDetails={true}/>
            </Box>
      </Main>
    </>
  )
}

export default App
