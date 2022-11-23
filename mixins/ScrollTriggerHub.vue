<script>
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default {
  data() {
    return {
      scrolltrigger_initiated: false,
      image_rotate_els: [],
    }
  },
  mounted() {
    this.scrollTriggerInit()
    setTimeout(() => {}, 500)
  },
  methods: {
    scrollTriggerInit() {
      if (!this.scrolltrigger_initiated && process.client) {
        this.scrolltrigger_initiated = true

        // Image Rotate
        this.image_rotate_els = document.querySelectorAll(
          "[data-st-image-rotate]"
        )
        this.image_rotate_els.forEach(this.add_image_rotate)
      }
    },
    add_image_rotate(el, index) {
      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "center center",
            scrub: 0.1,
          },
        })
        .from(el, {
          rotation: -10,
          ease: "none",
        })
    },
  },
}
</script>
