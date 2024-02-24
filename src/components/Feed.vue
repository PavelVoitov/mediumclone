<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-error v-if="error" :message="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
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
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import {actionsTypes} from '@/store/modules/feed'
import {mapState} from 'vuex'
import McvPagination from '@/components/Pagination'
import {limit} from '@/helpers/variables'
import queryString from 'query-string'
import McvLoading from '@/components/Loading.vue'
import McvError from '@/components/Error.vue'

export default {
  name: 'McvFeed',
  components: {
    McvError,
    McvLoading,
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
      limit,
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * limit - limit
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    },
    apiUrl() {
      this.fetchFeed()
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiUrl)
      const stringifiedParams = queryString.stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      console.log(apiUrlWithParams)
      this.$store.dispatch(actionsTypes.getFeed, {
        apiUrl: apiUrlWithParams,
      })
    },
  },
  mounted() {
    console.log(this.apiUrl)
    this.fetchFeed()
  },
}
</script>
