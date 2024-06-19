import { useState, useEffect } from "react";
import personsServices from '../services/persons';

const usePersons = (handleNotifChange) => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        personsServices.getAll().then((initPersons) => {
            setPersons(initPersons)
        })
    }, [])

    const addPerson = (newPerson) => {
        personsServices.postPerson(newPerson).then(returnValue => {
            console.log('posted ', returnValue)
            setPersons(persons.concat(returnValue))
            handleNotifChange(`Added ${newPerson.name}`, `add`)
        })
    }

    const updatePerson = (newPerson) => {
        personsServices.updatePerson(newPerson)
            .then(returnValue => {
                setPersons(persons.map(p => {
                    return p.id === returnValue.id ? returnValue : p
                }))
                handleNotifChange(`Updated ${newPerson.name}`, `update`)
            })
            .catch(error => {
                setPersons(persons.filter(p => {
                    return p.id !== newPerson.id 
                }))
                handleNotifChange(`Information of ${newPerson.name} has already been removed from server`, `error`)
            })
    }

    const deletePerson = (person) => {
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

    return {
        persons,
        addPerson,
        updatePerson,
        deletePerson,
    }
}

export default usePersons
