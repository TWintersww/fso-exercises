import { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import Info from './components/Info'
import useQuery from './hooks/useQuery'
import axios from 'axios'

function App() {

  const {query, toDisplay, showFull, handleQueryChange, updateCountries, updateShowFull} = useQuery()

  const getCountries = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        updateCountries(response.data)
      })
  }
  useEffect(getCountries, [])


  return (
    <>
      <SearchBar query={query} handleQueryChange={handleQueryChange}/>

      <Info toDisplay={toDisplay} showFull={showFull} updateShowFull={updateShowFull}/>
    </>
  )
}

export default App
