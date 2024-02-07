<template>
  <ul>
    <li :key="error" v-for="error of errorMassages" class="error">
      {{ error[0] }} {{ error[1][0] }}
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
      // return Object.values(this.validationErrors).flat()
      return Object.entries(this.validationErrors)
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
