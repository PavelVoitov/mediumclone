import feedApi from '@/api/feed'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedFailed: '[feed] getFeedFailed',
  getFeedSuccess: '[feed] getFeedSuccess',
}

export const actionsTypes = {
  getFeed: '[feed] getFeed',
}

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getFeedFailed](state, payload) {
    state.isLoading = false
    state.error = payload
  },
}

const actions = {
  [actionsTypes.getFeed](context, {apiUrl}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getFeedStart)
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          context.commit(mutationTypes.getFeedSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getFeedFailed)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
