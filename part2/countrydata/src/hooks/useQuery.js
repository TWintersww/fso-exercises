import { useState, useEffect } from "react"

const useQuery = () => {
    const [query, setQuery] = useState('')
    const [countries, setCountries] = useState([])
    const [toDisplay, setToDisplay] = useState([])
    const [showFull, setShowFull] = useState([])

    const updateToDisplay = () => {
        setToDisplay(countries.filter(country => {
          let countryLowercase = country.name.common.toLowerCase()
          return countryLowercase.includes(query)
        }))
    }
    useEffect(updateToDisplay, [query, countries])

    const handleQueryChange = (event) => {
        // console.log(event.target.value.toLowerCase())
        setQuery(event.target.value.toLowerCase())
    }
    const updateCountries = (newCountries) => {
        setCountries(newCountries)
    }
    const updateShowFull = (countryname) => {
        setShowFull(toDisplay.map((country, idx) => {
          if (country.name.common === countryname) {
            return !showFull[idx]
          }
          else if (showFull[idx]) {
            return true
          }
          else {
            return false
          }
        }))
        //console.log('set for ', countryname)
    }

    return {
        query,
        toDisplay,
        showFull,
        handleQueryChange,
        updateCountries,
        updateShowFull,
    }
}

export default useQuery
