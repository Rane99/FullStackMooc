import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  console.log("getall")
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const response = axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const update = async (id, blog) => {
  const response = axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const comment = async  (id, comment) => {
  console.log("NISTI", comment)
  const response = axios.post(`${baseUrl}/${id}/comments`, {comment})
  return response.data
}

export default { getAll, create, update, remove, comment, setToken }