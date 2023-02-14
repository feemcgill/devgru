<template>
  <FadeImage
    v-if="image"
    :src="image.node.sourceUrl"
    :alt="title"
    :width="image.node.mediaDetails.width"
    :height="image.node.mediaDetails.height"
    ref="image"
  />
</template>

<script>
import FadeImage from "~/components/FadeImage"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default {
  components: {
    FadeImage,
  },
  props: {
    image: null,
    title: null,
  },
  mounted() {
    // let el = this.$refs.image.$el
    // gsap.killTweensOf(el)
    // const timeline = gsap
    //   .timeline({
    //     scrollTrigger: {
    //       trigger: el,
    //       start: "top bottom",
    //       end: "bottom top",
    //       scrub: 0.1,
    //     },
    //   })
    //   .fromTo(
    //     el,
    //     {
    //       rotation: -10,
    //       ease: "none",
    //     },
    //     { rotation: 5 }
    //   )
  },
}
</script>
