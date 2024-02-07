import axios from '@/api/axios'

const register = (credentials) => {
  return axios.post('/users', {user: credentials})
}

const login = (credential) => {
  return axios.post('/users/login', {user: credential})
}

export default {
  register,
  login,
}
