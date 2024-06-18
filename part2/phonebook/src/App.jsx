import { useState } from 'react'
import useForm from './hooks/useForm'
import usePersons from './hooks/usePersons'
import useNotif from './hooks/useNotif'
import useFilter from './hooks/useFilter'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const {notif, handleNotifChange} = useNotif()
  const {persons, addPerson, updatePerson, deletePerson} = usePersons(handleNotifChange)
  const {newName, newNumber, handleNameChange, handleNumberChange, resetForm} = useForm()
  const {searchQuery, handleQueryChange} = useFilter()
 
  const handleAddNumber = (event) => {
    event.preventDefault()
    let newPerson = {
      name: newName,
      number: newNumber,
    }

    let duplicatePerson = persons.find((person) => {
      return person.name === newPerson.name
    })
    if (duplicatePerson) {
      const confirmed = window.confirm(`${duplicatePerson.name} is already added. Replace old number?`);
      if (confirmed) {
        newPerson = {...newPerson, id: duplicatePerson.id};
        updatePerson(newPerson, duplicatePerson)
      }
    }
    else {
      addPerson(newPerson)
    }
    resetForm()
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notif.message} status={notif.status}/>

      <Filter searchQuery={searchQuery} handleQueryChange={handleQueryChange}/>

      <h2>add a new</h2>
      
      <PersonForm addNumber={handleAddNumber} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        
      <h2>Numbers</h2>
    
      <Persons persons={persons} searchQuery={searchQuery} deleteNumber={deletePerson}/>
    </div>
  )
}

export default App
