const FullCountryInfo = ({country}) => {

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

export default FullCountryInfo
