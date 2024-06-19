import { useState } from "react";

const useForm = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const resetForm = () => {
        setNewName('')
        setNewNumber('')
    }

    return {
        newName,
        newNumber,
        handleNameChange,
        handleNumberChange,
        resetForm,

    }
}

export default useForm
