import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationsErrors: null,
  isLoggedIn: null,
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validationsErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFailed(state, payload) {
    state.isSubmitting = false
    state.validationsErrors = payload
  },
}

const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart')
      authApi
        .register(credentials)
        .then((res) => {
          context.commit('registerSuccess', res.data.user)
          setItem('successToken', res.data.user.token)
          resolve(res.data.user)
        })
        .catch((res) => {
          context.commit('registerFailed', res.response.data.errors)
        })
    })
  },
}
export default {
  state,
  mutations,
  actions,
}
