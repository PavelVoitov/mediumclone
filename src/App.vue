<template>
  <mcv-top-bar />
  <router-view />
</template>

<script>
import McvTopBar from '@/components/TopBar.vue'
export default {
  name: 'McvApp',
  components: {
    McvTopBar,
  },
}
</script>

<style></style>
