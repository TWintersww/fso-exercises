import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const postPerson = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (person) => {
    const specificURL = `${baseURL}/${person.id}`
    
    const request = axios.delete(specificURL)
    return request.then(response => response.data)
}

const updatePerson = (newPerson) => {
    const specificURL = `${baseURL}/${newPerson.id}`
    
    const request = axios.put(specificURL, newPerson)
    return request.then(response => response.data)
}

export default {getAll, postPerson, deletePerson, updatePerson}
