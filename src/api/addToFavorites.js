import axios from '@/api/axios'

const getUrl = (slug) => `/articles/${slug}/favorite`

const addToFavorites = (slug) => {
  return axios.post(getUrl(slug)).then((result) => result.data.article)
}

const removeFromFavorites = (slug) => {
  return axios.delete(getUrl(slug)).then((result) => result.data.article)
}

export default {
  removeFromFavorites,
  addToFavorites,
}
