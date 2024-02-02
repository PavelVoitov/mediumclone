<template>
  <ul>
    <li :key="error" v-for="error of errorMassages" class="error">
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationsErrors',
  props: {
    validationErrors: {
      type: Object,
      require: true,
    },
  },
  computed: {
    errorMassages() {
      return Object.values(this.validationErrors).flat()
    },
  },
}
</script>

<style scoped>
.error {
  color: #901313;
  font-weight: bolder;
}
</style>
