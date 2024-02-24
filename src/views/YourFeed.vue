<template>
  <div class="home-page">
    <mcv-banner />
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
import McvBanner from '@/components/Banner.vue'
export default {
  name: 'McvYourFeed',
  components: {
    McvBanner,
    McvFeed,
    MvcPopularTags,
  },
  data() {
    return {
      apiUrl: '/articles/feed',
    }
  },
}
</script>
