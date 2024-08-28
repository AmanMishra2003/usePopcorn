import { useEffect, useState } from "react"
import StarRating from "./StarRating";
import Loader from "./Loader";
import Button from "./Button";

function SelectedMovieDetailsComponent({id,removeId,setwatchedMovieData,watchedMovieData}) {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [rating, setRating] = useState(0)

    const isWatched = watchedMovieData.map((ele)=>ele.imdbID).includes(id)
    const userRating = watchedMovieData.find((ele)=>ele.imdbID===id)?.userRating;


    const handleAddToListData = ()=>{
        const {imdbID,Title,Year, Poster,Runtime, imdbRating} = data;
        const newWatchedMovieData = {imdbID,Title,Year, Poster, Runtime, imdbRating, userRating:rating};
        setwatchedMovieData(currData=>(
            [
                ...currData,
                {
                    ...newWatchedMovieData
                }
            ]
        ))
        removeId('')
    }

    useEffect(()=>{
        function callback(e){
            if(e.code==='Escape'){
                removeId()
            }
        }

        document.addEventListener('keydown', callback)

        return ()=>{
            document.removeEventListener('keydown', callback)
        }
    })

    useEffect(()=>{
        async function fetchDataFunc() {
            try{
                setIsLoading(true)
                const fetchData = await fetch(`http://www.omdbapi.com/?apikey=f27a037f&i=${id}`);
                const data = await fetchData.json();
                
                setData(data)
            }catch(err){
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }
        fetchDataFunc()
    },
    [id]
    )

    useEffect(()=>{
        if(!data.Title) return;
        document.title = `Movies | ${data.Title}`

        return function(){
            document.title = "usePopcorn"
        }
    },[data.Title])

    return (
        <div className="details">
            {
                !isLoading ?
                <>
                <Button className="btn-back" onClick={()=>{removeId('')}}>
                ←
                </Button>
                <header>
                    <img src={data.Poster} alt="" />
                        <div className="details-overview">
                            <h2>
                            {data.Title}
                            </h2>
                            <p>
                                <span>{data.Released}</span>
                                ·
                                <span>{data.Runtime}</span>
                            </p>
                            <p>{data.Genre}</p>
                            <p>⭐️ {data.imdbRating} IMDb rating</p>
                        </div>
                </header>
                <section>
                    <div className="rating">
                        {
                            !isWatched?
                            <>
                                <StarRating getRating={setRating}/>
                                {
                                    rating? 
                                    <Button className="btn-add" onClick={handleAddToListData}>
                                        +Add to list
                                    </Button>:
                                    null
                                }
                            </>:
                            <p>
                                You have rated this movie : <strong>{userRating} 🌟</strong> 
                            </p>

                        }
                       
                    </div>
                    <p>
                        <em>
                        {data.Plot}
                        </em>
                    </p>
                    <p>
                        <em>
                            Staring : {data.Actors}
                        </em>
                    </p>
                    <p>
                        <em>
                            Directed by : {data.Director}
                        </em>
                    </p>
                </section>
                </>:
                <Loader/>
            }
        </div>
    )
}

export default SelectedMovieDetailsComponent
