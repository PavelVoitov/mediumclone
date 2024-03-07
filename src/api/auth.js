import axios from '@/api/axios'

const register = (credentials) => {
  return axios.post('/users', {user: credentials})
}
const login = (credential) => {
  return axios.post('/users/login', {user: credential})
}

const getCurrentUser = () => {
  return axios.get('/user')
}

const updateCurrentUser = (currentUserInput) => {
  return axios
    .put('/user', {user: currentUserInput})
    .then((response) => response.data.user)
}

export default {
  updateCurrentUser,
  register,
  login,
  getCurrentUser,
}
