<template>
  <div>
    <Nav />
    <nuxt id="pages-container" />
    <!-- <ShooterGame /> -->
  </div>
</template>
<script>
import Nav from "~/components/Nav"
import Vue from "vue"

export default {
  components: {
    Nav,
  },
  data: function () {
    return {}
  },
  mounted() {
    // console.log(Vue.version)
  },
}
</script>
<style lang="scss">
#pages-container {
  position: relative;
  z-index: 1;
}
</style>
