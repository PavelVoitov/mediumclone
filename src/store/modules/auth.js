import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerFailed: '[auth] registerFailed',
  registerSuccess: '[auth] registerSuccess',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailed](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then((res) => {
          context.commit(mutationTypes.registerSuccess, res.data.user)
          setItem('successToken', res.data.user.token)
          resolve(res.data.user)
        })
        .catch((res) => {
          context.commit(mutationTypes.registerFailed, res.response.data.errors)
        })
    })
  },
  [actionTypes.login](context, credential) {
    context.commit(mutationTypes.registerStart)
    return new Promise((resolve) => {
      authApi
        .login(credential)
        .then((res) => {
          context.commit(mutationTypes.registerSuccess, res)
          setItem('successToken', res.data.user.token)
          resolve(res.data.user)
        })
        .catch((err) => {
          context.commit(mutationTypes.registerFailed, err.response.data.errors)
        })
    })
  },
}
export default {
  state,
  mutations,
  actions,
}
