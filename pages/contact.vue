<template>
  <div class="contact-page">
    <div class="wrapper">
      <div class="content">
        <div class="inner">
          <div class="intro">
            <Logo />
            <ContactDeets />
          </div>
          <div class="the-form">
            <ContactForm />
          </div>
        </div>
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
    Legal,
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.content {
  background-color: lighten($flair, 0%);
  position: relative;
  padding: 50px;
  margin: 50px;
  height: calc(100vh - 100px);
  display: flex;
  flex-wrap: wrap;
  @include breakpoint(medium) {
    position: relative;
    width: 100%;
    left: auto;
    top: auto;
    height: auto;
    margin: 0;
    padding: 70px 5vw;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: $white;
    background-image: url("~assets/patterns/diag-stripe-top-right.png");
    //background-size: 300px;
    background-attachment: fixed;
    mix-blend-mode: screen;
    z-index: 1;
  }
  .inner {
    position: relative;
    z-index: 100;
    //background: $white;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    .intro {
      width: 40%;
    }
    @include breakpoint(medium) {
      display: block;
      .intro {
        width: 100%;
        margin-bottom: 50px;
      }
    }
  }
}
h1 {
}
.logo {
  max-width: 500px;
  display: block;
  margin: 0px 0 20px;
  // background: $white;
  // padding: 5px;
  // box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
}
.container {
  @include container;
  margin-top: 3em;
  margin-bottom: 3em;
}
.the-form {
  align-self: flex-end;
  max-width: 700px;
  //margin: 5em auto;
  background: $white;
  padding: 25px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
}
</style>
