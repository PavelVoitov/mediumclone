<template>
  <div>Create Article</div>
  <mcv-article-form
    :initial-values="initialValues"
    :errors="validationsErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue'
export default {
  name: 'McvCreateArticle',
  components: {
    McvArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      validationsErrors: null,
      isSubmitting: false,
    }
  },
  methods: {
    onSubmit(data) {
      console.log(data)
    },
  },
}
</script>
