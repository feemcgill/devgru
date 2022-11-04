<template>
  <div class="contact-page">
    <div class="header">
      <div class="inner">
        <h1>Contact</h1>
        <div class="intro">
          <ContactDeets />
        </div>
      </div>
    </div>

    <div class="contact-wrap">
      <div class="the-form">
        <ContactForm />
      </div>
      <div class="logo">
        <Logo />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      debug: false,
    }
  },
  methods: {},
  computed: {},
  transition(to, from) {
    if (!from) {
      return "page"
    }
    return "page"
  },
}
</script>

<style lang="scss" scoped>
.contact-page {
  background-color: rgba(255, 255, 255, 0.9);
}
.header {
  margin-bottom: 50px;
  z-index: 1;
  position: fixed;
  left: 50%;
  top: 0;
  min-height: 100vh;
  text-align: left;
  width: 50%;
  z-index: 1;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include breakpoint(medium) {
    position: relative;
    position: absolute;
    width: 100%;
    left: auto;
    top: auto;
    margin: 0;
    padding-top: 100px;
    display: block;
    min-height: auto;
    z-index: 1000;
  }
  h1 {
    font-size: 13vw;
    line-height: 0.7;
    color: $flair;
    letter-spacing: -0.02em;
  }
}

.contact-wrap {
  width: 50%;
  //margin: 0 10%;
  padding: 2.5vw;
  background-color: lighten($flair, 0%);
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include breakpoint(medium) {
    position: relative;
    width: 100%;
    left: auto;
    top: auto;
    padding: 60vh 5vw 20px;
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
}

.the-form {
  position: relative;
  //align-self: flex-end;
  max-width: 700px;
  //margin: 5em auto;
  background: $white;
  padding: 25px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.logo {
  width: 150px;
  position: relative;
  z-index: 100;
  margin: 1em auto;
  display: none;
}
</style>
