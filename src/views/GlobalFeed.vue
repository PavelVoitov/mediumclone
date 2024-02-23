<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <mvc-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue'
import MvcPopularTags from '@/components/PopularTags.vue'
export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
    MvcPopularTags,
  },
  data() {
    return {
      apiUrl: '/articles',
    }
  },
}
</script>
