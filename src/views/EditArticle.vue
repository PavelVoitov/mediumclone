<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-article-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationsErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue'
import McvLoading from '@/components/Loading.vue'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/editArticle'
export default {
  name: 'McvEditArticle',
  components: {
    McvArticleForm,
    McvLoading,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      validationsErrors: (state) => state.editArticle.validationErrors,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
    }),
    initialValues() {
      if (!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList.join(' '),
      }
    },
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.updateArticle, {
          slug: this.$route.params.slug,
          articleInput,
        })
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    })
  },
}
</script>
