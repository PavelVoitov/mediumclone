import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleFailed: '[article] getArticleFailed',
  getArticleSuccess: '[article] getArticleSuccess',
}

export const actionTypes = {
  getArticle: '[article] getArticle',
}

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    console.log(payload)
    state.data = payload
  },
  [mutationTypes.getArticleFailed](state) {
    state.isLoading = true
  },
}

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart, slug)
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailed)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
