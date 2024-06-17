import { useState, useEffect } from 'react'
import personsServices from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notif, setNotif] = useState({message: '', status: ''})

  const fetchPersons = () => {
    console.log('effect');
    personsServices.getAll().then(initPersons => {
      setPersons(initPersons)
    })
  }
  useEffect(fetchPersons, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }
  const handleNotifChange = (message, status) => {
    const newNotif = {
      message: `${message}`,
      status: `${status}`,
    }
    setNotif(newNotif)
    setTimeout(() => {
      setNotif({message:'', status:''})
    }, 2000)
  }
  const addNumber = (event) => {
    event.preventDefault()
    let newPerson = {
      name: newName,
      number: newNumber,
    }
    
    let duplicates = 
      persons.some((person) => {
        return person.name === newPerson.name
      })

    if (duplicates) {
      const duplicatePerson = persons.find(p => {
        return p.name === newPerson.name
      })
      const confirmed = 
        window.confirm(`${duplicatePerson.name} is already added. Replace old number?`);

      if (confirmed) {
        newPerson = {...newPerson, id: duplicatePerson.id}
        //console.log('person ', duplicatePerson)
        personsServices.updatePerson(newPerson).then(returnValue => {
          //console.log(returnValue)
          setPersons(persons.map(p => {
            return p.id === returnValue.id ? returnValue : p
          }))
          setNewName('')
          setNewNumber('')

          //handle notification
          handleNotifChange(`Updated ${newPerson.name}`, `update`)
        })
          .catch((error) => {
            //handle notification
            handleNotifChange(`Information of ${newPerson.name} has already been removed from server`, `error`)
            setPersons(persons.filter(p => {
              return p.id !== newPerson.id 
            }))
          })
      }

    }
    else {
      personsServices.postPerson(newPerson).then(returnValue => {
        console.log('posted ', returnValue)
        setPersons(persons.concat(returnValue))
        setNewName('')
        setNewNumber('')

        //handle notification
        handleNotifChange(`Added ${newPerson.name}`, 'add')
      })
    }
  }
  const deleteNumber = (person) => {
    //console.log('deleting user with id ', person.id)
    const confirmed = window.confirm(`Delete ${person.name}?`)
    console.log('selected ', confirmed)
    if (confirmed) {
      personsServices.deletePerson(person).then(returnValue => {
        console.log('deleted user')
        setPersons(persons.filter(p => {
          return p.id !== person.id
        }))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notif.message} status={notif.status}/>

      <Filter searchQuery={searchQuery} handleQueryChange={handleQueryChange}/>

      <h2>add a new</h2>
      
      <PersonForm addNumber={addNumber} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        
      <h2>Numbers</h2>
    
      <Persons persons={persons} searchQuery={searchQuery} deleteNumber={deleteNumber}/>
    </div>
  )
}

export default App
