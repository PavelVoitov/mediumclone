const state = {
  isLoading: false,
}

const mutations = {
  getArticleStart(state) {
    state.isLoading = true
  },
}

export default {
  state,
  mutations,
  namespaced: true,
}
