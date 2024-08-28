import Button from "./Button"

function MovieList({data, showDetails,getId,deleteMovies}) {
    const handleDeleteMoviesFromWatchList = (id)=>{
        deleteMovies(currData=>(
            currData.filter(ele=>(
                ele.imdbID!==id
            ))
        ))
    }
    return (
        <div>
            <ul className="list">
                {data?.map((movie) => (
                    <li key={movie.imdbID} onClick={()=>{getId(movie.imdbID)}}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                        {
                            showDetails
                            ?
                            (
                                <>
                                <p>
                                    <span>⭐️</span>
                                    <span>{movie.imdbRating}</span>
                                </p>
                                <p>
                                    <span>🌟</span>
                                    <span>{movie.userRating}</span>
                                </p>
                                <p>
                                    <span>⏳</span>
                                    <span>{movie.Runtime}</span>
                                </p>
                                <Button className="btn-delete" onClick={()=>handleDeleteMoviesFromWatchList(movie.imdbID)}>X</Button>
                                </>
                            ):
                            (
                                <>
                                <p>
                                <span>🗓</span>
                                <span>{movie.Year}</span>
                                </p>
                                </>
                            )
                        }
                    </div>
                    </li>
                ))}
                </ul>
            
        </div>
    )
}

export default MovieList
