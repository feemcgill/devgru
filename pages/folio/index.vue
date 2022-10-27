<template>
  <div class="portfolio-page">
    <ul class="portfolio-list">
      <li>
        <span class="title"> Goldteeth &amp; Co. </span>
        <span class="year"> 2021 </span>
        <span class="friend">Hugo &amp; Marie</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Logo from "~/components/Logo"
import ContactForm from "~/components/ContactForm"
import ContactDeets from "~/components/ContactDeets"
import Legal from "~/components/Legal"

const data = [
  {
    name: "Goldteeth & Co.",
    year: 2021,
    description: "High end portfolio for a photography agency.",
    friends: "Hugo & Marie",
    category: "Headless Website",
  },
  {
    name: "Coachella",
  },
]

export default {
  components: {},
  mounted() {
    var ztxt = new Ztextify(".txt", {
      depth: "30px",
      layers: 2,
      fade: true,
      direction: "forwards",
      event: "pointer",
      eventRotation: "5deg",
    })
  },
}
</script>

<style lang="scss" scoped></style>
