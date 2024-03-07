import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerFailed: '[auth] registerFailed',
  registerSuccess: '[auth] registerSuccess',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailed: '[auth] getCurrentUserFailed',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth]updateCurrentUserSuccess',
  updateCurrentUserFailed: '[auth] updateCurrentUserFailed',

  logout: '[auth] logout',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout',
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
}

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn)
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false
  },
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
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.getCurrentUserFailed](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },
  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload
  },
  [mutationTypes.updateCurrentUserFailed]() {},

  [mutationTypes.logout](state) {
    state.currentUser = null
    state.isLoggedIn = false
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
          setItem('accessToken', res.data.user.token)
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
          context.commit(mutationTypes.registerSuccess, res.data.user)
          setItem('accessToken', res.data.user.token)
          resolve(res.data.user)
        })
        .catch((err) => {
          let errorMessage
          if (err.response !== undefined) {
            errorMessage = err.response.data.errors
          } else {
            errorMessage = err.message
          }

          context.commit(mutationTypes.registerFailed, errorMessage)
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    context.commit(mutationTypes.getCurrentUserStart)
    return new Promise((resolve) => {
      authApi
        .getCurrentUser()
        .then((res) => {
          context.commit(mutationTypes.registerSuccess, res.data.user)
          resolve(res.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailed)
        })
    })
  },
  [actionTypes.updateCurrentUser](context, {currentUserInput}) {
    context.commit(mutationTypes.updateCurrentUserStart)
    return new Promise((resolve) => {
      authApi
        .updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit(mutationTypes.updateCurrentUserSuccess, user)
          resolve(user)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateCurrentUserFailed,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      setItem('accessToken', '')
      context.commit(mutationTypes.logout)
      resolve()
    })
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
