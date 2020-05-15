<template>
  <div>
    <div class="image-area">
      <img :src="currentImage" alt="">
    </div>
    <div class="controls">
      <button v-on:click="prev(); autoStop();">Previous</button>
      <button v-on:click="next(); autoStop();">next</button>
    </div>
  </div>

</template>



<script>
import gql from 'graphql-tag'
import ImageCycle from '~/components/ImageCycle'
export default {
  name: 'ImageCycle',
  props: ['imageData'],
  components: {
    ImageCycle
  },
  data () {
    return {
      currentImage: null,
      timer: null,
      imageIndex: 0
    }
  },
  methods: {
    next() {
      this.imageIndex = (this.imageIndex + 1) % this.imageData.length
      this.currentImage = this.imageData[this.imageIndex].sourceUrl
      const next = (this.imageIndex + 1) % this.imageData.length
      this.preload(this.imageData[next].sourceUrl)
    },
    prev() {
      this.imageIndex = (this.imageIndex - 1 + this.imageData.length) % this.imageData.length
      this.currentImage = this.imageData[this.imageIndex].sourceUrl
    },
    autoStart() {
      this.timer = setInterval(() => {
        this.next()
      }, 3000);  
    },
    autoStop() {
      console.log('stop')
      clearInterval(this.timer)
    },
    preload(url) {
      const img = new Image();
      img.src = url;
      //console.log('NEW IMAGE', img)
    }
  },
  mounted() {
    this.currentImage = this.imageData[this.imageIndex].sourceUrl
    this.autoStart();
  },
  beforeDestroy () {
    this.autoStop();
  }  
}
</script>



<style lang="scss" scoped>
  .image-area {
    img {
      position: absolute;
      object-fit: contain;
      z-index: 300;
      top: 20px;
      left: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
    }
  }
</style>
