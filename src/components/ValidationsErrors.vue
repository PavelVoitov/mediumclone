<template>
  <ul>
    <template v-if="typeof validationErrors === 'object'">
      <li :key="error" v-for="error of errorMassages" class="error">
        {{ error[0] }} {{ error[1][0] }}
      </li>
    </template>
    <template v-else>
      <li class="error">{{ validationErrors }}</li>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationsErrors',
  props: {
    validationErrors: {
      type: Object || String,
      require: true,
    },
  },
  computed: {
    errorMassages() {
      if (typeof this.validationErrors === 'object') {
        return Object.entries(this.validationErrors)
      }
      return this.validationErrors
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
