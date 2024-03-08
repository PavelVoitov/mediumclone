<template>
  <div>Foo</div>
</template>

<script>
export default {
  name: 'McvFoo',
  mounted() {
    this.$store.commit('foo/getArticleStart')
  },
}
</script>
