import popularTagsApi from '@/api/popularTags'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] getPopularTagsStart',
  getPopularTagsFailed: '[popularTags] getPopularTagsFailed',
  getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
}

export const actionTypes = {
  getPopularTags: '[popularTags] getPopularTags',
}

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getPopularTagsFailed](state, payload) {
    state.isLoading = true
    state.error = payload
  },
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getPopularTagsStart)
      popularTagsApi
        .getPopularTags()
        .then((tags) => {
          context.commit(mutationTypes.getPopularTagsSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          context.commit(mutationTypes.getPopularTagsFailed)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
