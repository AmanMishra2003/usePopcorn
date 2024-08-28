

function Input({query, setQuery}) {
    
    return (
        <div className="search-bar">
                <input type="text" className="search" placeholder="Search Movies..." name="searchMovie" onChange={(e)=>setQuery(e.target.value)} value={query} />
        </div>
    )
}

export default Input
