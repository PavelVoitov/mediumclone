<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic,
    }"
  >
    <i class="ion-heart" />
    <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'

export default {
  name: 'McvAddToFavorites',
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    }
  },
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic,
      })
      if (!this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic += 1
      } else {
        this.favoritesCountOptimistic -= 1
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic
    },
  },
}
</script>
