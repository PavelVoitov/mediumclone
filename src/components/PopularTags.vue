<template>
  <mcv-loading v-if="isLoading" />
  <mcv-error v-if="error" :message="error" />
  <div v-if="popularTags" class="sidebar">
    <p>Popular Tags</p>
    <div class="tag-list">
      <router-link
        v-for="popularTag of popularTags"
        :key="popularTag"
        :to="{name: 'tag', params: {slug: popularTag}}"
        class="tag-default tag-pill"
      >
        {{ popularTag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags'
import McvLoading from '@/components/Loading.vue'
import McvError from '@/components/Error.vue'

export default {
  name: 'PopularTags',
  components: {McvError, McvLoading},
  data() {
    return {
      currentTag: '',
    }
  },
  computed: {
    ...mapState({
      popularTags: (state) => state.popularTags.data,
      isLoading: (state) => state.popularTags.isLoading,
      error: (state) => state.popularTags.error,
    }),
  },
  methods: {
    setCurrentTag(tag) {
      this.currentTag = tag
    },
    fetchTags() {
      this.$store.dispatch(actionTypes.getPopularTags)
    },
  },
  watch: {
    currentTag() {
      this.fetchTags()
    },
  },
  mounted() {
    this.fetchTags()
  },
}
</script>
