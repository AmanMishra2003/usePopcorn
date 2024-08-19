const averageFunction = (arr)=>{
    return arr.reduce((acc,curr,i,arr)=>(
        (acc+curr)/arr.length
    ),0)
}


function Summary({data}) {
    const moviesCount = data.length;
    const avgRating = averageFunction(data.map(ele=> ele.imdbRating)) ;
    const userRating = averageFunction(data.map(ele=> ele.userRating)) ;
    const totalHour = data.map(ele=> ele.runtime).reduce((acc,curr)=>acc+curr)

    return (
        <div className="summary">
                    <h2>Movies you watched</h2>
                    <div>
                    <p>
                        <span>#️⃣</span>
                        <span>{moviesCount} movies</span>
                    </p>
                    <p>
                        <span>⭐️</span>
                        <span>{avgRating}</span>
                    </p>
                    <p>
                        <span>🌟</span>
                        <span>{userRating}</span>
                    </p>
                    <p>
                        <span>⏳</span>
                        <span>{totalHour} min</span>
                    </p>
            </div>
        </div>
    )
}

export default Summary
