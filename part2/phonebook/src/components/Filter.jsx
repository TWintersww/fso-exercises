const Filter = ({searchQuery, handleQueryChange}) => {
    // console.log(searchQuery)
    // console.log(handleQueryChange)

    return (
        <div>
            filter shown with 
            <input value={searchQuery} onChange={handleQueryChange}/>
        </div>
    )
}

export default Filter
