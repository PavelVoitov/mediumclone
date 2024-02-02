import authApi from '@/api/auth'

const state = {
  isSubmitting: false,
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
  },
  registerSuccess(state) {
    state.isSubmitting = false
  },
  registerFailed(state) {
    state.isSubmitting = false
  },
}

const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart')
      authApi
        .register(credentials)
        .then((res) => {
          console.log('response', res)
          context.commit('registerSuccess', res.data.user)
          resolve(res.data.user)
        })
        .catch((res) => {
          context.commit('registerFailed', res.response.data.errors)
          console.log('rej', res.response.data.errors)
        })
    })
    // setTimeout(() => {
    //   context.commit('registerStart')
    // }, 1300)
  },
}
export default {
  state,
  mutations,
  actions,
}
