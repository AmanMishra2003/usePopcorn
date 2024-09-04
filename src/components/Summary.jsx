const averageFunction = (arr)=>{
    if(!arr || arr.length===0){
        return 0;
    }
    const total = arr.reduce((acc,curr,i,arr)=>(
        acc+curr
    ),0)

    return (total/(arr.length)).toFixed(2)
}


function Summary({data}) {
    const moviesCount = data.length || 0;
    const avgRating = averageFunction(data.map(ele=> Number(ele.imdbRating)));
    const userRating = averageFunction(data.map(ele=> ele.userRating)) ;
    const totalHour = data.map(ele=> Number(ele.Runtime.split(' ')[0])).filter(ele=>ele===ele).reduce((acc,curr)=>acc+curr,0)

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
                        <span>{totalHour}</span>
                    </p>
            </div>
        </div>
    )
}

export default Summary
