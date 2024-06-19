import FullCountryInfo from "./FullCountryInfo";

const Info = ({toDisplay, showFull, updateShowFull}) => {
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
                {toDisplay.map((country, idx) => {
                    let countryname = country.name.common
                    if (showFull[idx]) {
                        return (
                            <div key={countryname}>
                                <FullCountryInfo country={country} />
                                <button onClick={() => updateShowFull(countryname)}>hide</button>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={countryname}>
                                {countryname}
                                <button onClick={() => updateShowFull(countryname)}>show</button>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
    if (length == 1) {
        const country = toDisplay[0]

        return (
            <FullCountryInfo country={country} />
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
