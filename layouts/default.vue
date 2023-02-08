<template>
  <div @mousemove="mouseMove">
    <MainNav />
    <nuxt id="pages-container" />
    <ShooterGame />
  </div>
</template>
<script>
import Vue from "vue"

export default {
  components: {},
  data: function () {
    return {}
  },
  mounted() {
    // console.log(Vue.version)
  },
  methods: {
    mouseMove(e) {
      this.$store.commit("setMousePos", { x: e.clientX, y: e.clientY })
    },
  },
}
</script>
<style lang="scss">
#pages-container {
  position: relative;
  z-index: 1;
}
</style>
