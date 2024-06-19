import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import Info from './components/Info'
import axios from 'axios'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [toDisplay, setToDisplay] = useState([])

  const handleQueryChange = (event) => {
    // console.log(event.target.value.toLowerCase())
    const newQuery = event.target.value.toLowerCase()
    setQuery(newQuery)
    setToDisplay(countries.filter(country => {
      let countryLowercase = country.name.common.toLowerCase()
      return countryLowercase.includes(newQuery)
    }))
  }
  const getCountries = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
        setToDisplay(response.data)
      })
  }

  useEffect(getCountries, [])

  return (
    <>
      <SearchBar query={query} handleQueryChange={handleQueryChange}/>

      <Info toDisplay={toDisplay}/>
    </>
  )
}

export default App
