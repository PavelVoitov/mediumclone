<template>
  <mcv-top-bar />
  <router-view />
</template>

<script>
import McvTopBar from '@/components/TopBar.vue'
import {actionTypes} from '@/store/modules/auth'
export default {
  name: 'McvApp',
  components: {
    McvTopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  },
}
</script>

<style></style>
