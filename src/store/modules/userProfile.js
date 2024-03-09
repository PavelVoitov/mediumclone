import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] getUserProfileStart',
  getUserProfileFailed: '[userProfile] getUserProfileFailed',
  getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
}

export const actionTypes = {
  getUserProfile: '[userProfile] getUserProfile',
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getUserProfileFailed](state, payload) {
    state.isLoading = true
    state.error = payload
  },
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then((userProfile) => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailed)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
