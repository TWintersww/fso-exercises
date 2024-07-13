import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    console.log(response)
    return response.data
}
const createNew = async (content) => {
    const object = {content, votes: 0}
    const response = await axios.post(baseURL, object)
    console.log(response)
    return response.data
}
const modifyExisting = async (newAnecdote) => {
    const response = await axios.put(`${baseURL}/${newAnecdote.id}`, newAnecdote)
    console.log(response)
    return response.data
}

export default { getAll, createNew, modifyExisting }
