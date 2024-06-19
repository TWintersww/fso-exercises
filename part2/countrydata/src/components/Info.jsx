

const Info = ({toDisplay}) => {
    const length = toDisplay.length;

    if (length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (length < 10 && length > 1) {
        return (
            <div>
                {toDisplay.map(country => {
                    let countryname = country.name.common
                    return (
                        <div key={countryname}>{countryname}</div>
                    )
                })}
            </div>
        )
    }
    if (length == 1) {
        const country = toDisplay[0]

        return (
            <div>
                <h2>{country.name.common}</h2>
                <div>capital {country.capital[0]}</div>
                <div>area {country.area}</div>
                <ul>
                    {Object.values(country.languages).map(lang => {
                        return (
                            <li key={lang}>{lang}</li>
                        )
                    })}
                </ul>
                <img src={country.flags.png}/>
            </div>
        )
    }
    else {
        return (
            <div>
                No matches
            </div>
        )
    }
}

export default Info
