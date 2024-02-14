<template>
  <div>Feed</div>
</template>

<script>
import {actionsTypes} from '@/store/modules/feed'

export default {
  name: 'McvFeed',
  props: {
    apiUrl: {
      type: String,
      require: true,
    },
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getFeed, {apiUrl: this.apiUrl})
  },
}
</script>
