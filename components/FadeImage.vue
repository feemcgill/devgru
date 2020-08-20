<template>
  <transition name="imgfade">
    <img v-bind:class="'fade-image ' + classes" v-bind:src="src" v-bind:srcset="srcset" v-bind:alt="alt" v-bind:height="width" v-bind:width="height" v-on:load="onLoaded" v-show="loaded"/>
  </transition>
</template>


<script>
export default {
  data: () => {
    return {
      loaded: false,    
    }
  },
  props: {
    classes: String,
    src: String,
    srcset: String,
    alt: String,
    width: Number,
    height: Number,
  },
  methods: {
    onLoaded() {
      this.loaded = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .imgfade-enter-active {
    transition: opacity 0.35s ease-in-out;
  }

  .imgfade-enter-to {
    opacity: 1;
  }

  .imgfade-enter {
    opacity: 0;
  }
</style>