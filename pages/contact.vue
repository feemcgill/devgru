<template>

  <div class="contact-page">

    <div class="container">

      <h1 class="txt">Contact</h1>

      <Logo fill="$flair" />

      <ContactDeets />

      <div class="the-form">

        <ContactForm />

      </div>

      <Legal />

    </div>

  </div>

</template>

<script>
import Logo from "~/components/Logo"
import ContactForm from "~/components/ContactForm"
import ContactDeets from "~/components/ContactDeets"
import Legal from "~/components/Legal"

export default {
  components: {
    Logo,
    ContactForm,
    ContactDeets,
    Legal
  },
  mounted() {
    var ztxt = new Ztextify(".txt", {
      depth: "30px",
      layers: 2,
      fade: true,
      direction: "forwards",
      event: "pointer",
      eventRotation: "5deg"
    })
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: $primary_color;
  font-size: 6em;
  line-height: 0.7;
  text-align: center;
  //margin-bottom: 1em;
}
.logo {
  max-width: 500px;
  display: block;
  margin: 3em auto;
}
.container {
  @include container;
  margin-top: 3em;
  margin-bottom: 3em;
}
.the-form {
  max-width: 700px;
  margin: 5em auto;
}
</style>
