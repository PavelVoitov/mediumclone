import addToFavoritesApi from '@/api/addToFavorites'
export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] addToFavoritesStart',
  addToFavoritesSuccess: '[addToFavorites] addToFavoritesSuccess',
  addToFavoritesFailed: '[addToFavorites] addToFavoritesFailed',
}

export const actionTypes = {
  addToFavorites: '[addToFavorites] addToFavorites',
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailed]() {},
}

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorited}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addToFavoritesStart)
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)
      promise
        .then((article) => {
          context.commit(mutationTypes.addToFavoritesSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoritesFailed)
        })
    })
  },
}

export default {
  mutations,
  actions,
}
