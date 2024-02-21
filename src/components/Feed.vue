<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) of feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt="article author image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
        </div>
        <div class="pull-xs-right">Add to favorites</div>
        <router-link
          class="preview-link"
          :to="{name: 'article', params: {slug: article.slug}}"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>READ MORE</span>
          TAG LIST
        </router-link>
      </div>
      <mcv-pagination
        :total="total"
        :limit="limit"
        :current-page="currentPage"
        :url="url"
      />
    </div>
  </div>
</template>

<script>
import {actionsTypes} from '@/store/modules/feed'
import {mapState} from 'vuex'
import McvPagination from '@/components/Pagination'

export default {
  name: 'McvFeed',
  components: {
    McvPagination,
  },
  props: {
    apiUrl: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      total: 500,
      limit: 10,
      currentPage: 4,
      url: '/',
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getFeed, {apiUrl: this.apiUrl})
  },
}
</script>
