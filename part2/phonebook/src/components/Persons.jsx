const Persons = ({persons, searchQuery, deleteNumber}) => {
    //console.log(props)

    return (
        <div>
        {
            persons
            .filter((person) => {
            const fixedPersonName = person.name.toLowerCase()
            const fixedQuery = searchQuery.toLowerCase()
            return fixedPersonName.includes(fixedQuery)
            })
            .map((person) => {
            return (
                <div key={person.name}>
                <span>{person.name} {person.number}</span>
                <button onClick={() => deleteNumber(person)}>delete</button>
                </div>
            )
            })
        }
        </div>
    )
}

export default Persons
