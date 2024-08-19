import Button from "./Button"

function MovieList({data, showDetails}) {
    return (
        <div>
            <ul className="list">
                {data?.map((movie) => (
                    <li key={movie.imdbID}>
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
                                    <span>{movie.runtime} min</span>
                                </p>
                                <Button className="btn-delete">X</Button>
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
