const averageFunction = (arr)=>{
    if(!arr){
        return
    }
    const total = arr.reduce((acc,curr,i,arr)=>(
        acc+curr
    ),0)
    return (total/(arr.length)).toFixed(2)
}


function Summary({data}) {
    const moviesCount = data.length || 0;
    const avgRating = averageFunction(data.map(ele=> Number(ele.imdbRating))) ;
    const userRating = averageFunction(data.map(ele=> ele.userRating)) ;
    const totalHour = data.map(ele=> Number(ele.Runtime.split(' ')[0])).reduce((acc,curr)=>acc+curr,0)

    return (
        <div className="summary">
                    <h2>Movies you watched</h2>
                    <div>
                    <p>
                        <span>#️⃣</span>
                        <span>{moviesCount || 0} movies</span>
                    </p>
                    <p>
                        <span>⭐️</span>
                        <span>{avgRating || 0}</span>
                    </p>
                    <p>
                        <span>🌟</span>
                        <span>{userRating || 0}</span>
                    </p>
                    <p>
                        <span>⏳</span>
                        <span>{totalHour}</span>
                    </p>
            </div>
        </div>
    )
}

export default Summary
