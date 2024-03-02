import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = process.env['VUE_APP_BASE_URL']
axios.interceptors.request.use((config) => {
  const token = getItem('accessToken')
  config.headers.Authorization = token ? `Token ${token}` : ''
  return config
})
export default axios
