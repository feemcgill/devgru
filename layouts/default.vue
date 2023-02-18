<template>
  <div class="layout" @mousemove="mouseMove">
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
    // console.log("Vue version: " + Vue.version)
  },
  methods: {
    mouseMove(e) {
      this.$store.commit("setMousePos", { x: e.clientX, y: e.clientY })
    },
  },
}
</script>
<style lang="scss" scoped>
#pages-container {
  position: relative;
  z-index: 1;
}
.layout {
  @include breakpoint(medium) {
    @include breakpoint(short) {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}
</style>
