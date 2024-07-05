import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  // console.log('set token to ', token)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (newBlog) => {
  const config = {
    headers: {Authorization: token},
  }

  // console.log('config', config)
  // console.log('token', token)

  const response = await axios.post(baseUrl, newBlog, config)
  // console.log('from axios', response.data)
  return response.data
}

const putBlog = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response)
  return response.data
}

export default { getAll, addBlog, setToken, putBlog, deleteBlog }
