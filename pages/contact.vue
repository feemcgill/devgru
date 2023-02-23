<template>
  <div class="contact-page">
    <div class="header">
      <div class="inner">
        <h1>Contact</h1>
        <div class="intro">
          <div class="intro-info wysiwyg">
            <p>
              Reach out for project inquiries, pricing or just to say hello!
            </p>
          </div>
          <div class="deets-out">
            <div class="deets-wrap">
              <ContactDeets />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-wrap">
      <div class="signup-info wysiwyg">
        <p>
          Sign up to hear about cool stuff we're doing! We send 2 to 4 updates a
          year. No spam, we promise.
        </p>
      </div>
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
  head() {
    return {
      title: "Contact Development Group",
    }
  },
  methods: {},
  computed: {},
  transition: { name: "contact-tranny", mode: '' },
}
</script>

<style lang="scss" scoped>
.contact-tranny-enter-active,
.contact-tranny-leave-active {
  transition: 1s background-color;

  .header {
    transition: 1s left;
  }

  .contact-wrap {
    transition: 1s left;
  }
}

.contact-tranny-enter,
.contact-tranny-leave-active {
  background-color: transparent !important;

  .header {
    left: 100%;
  }

  .contact-wrap {
    left: -50%;
  }
}

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

  @include breakpoint(small) {
    padding-top: 100px;
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    margin: 0;
    display: block;
    min-height: auto;
    z-index: 1000;
  }

  h1 {
    font-size: 13vw;
    line-height: 0.7;
    color: $primary_color;
    letter-spacing: -0.02em;
  }

  .intro-info {
    //@include headline_font;
    padding: 1em 0;
  }

  .deets-out {
    @include breakpoint(small) {
      @include pattern_bg;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);

      padding: 1em;
      width: 100%;
    }

    .deets-wrap {
      position: relative;
      z-index: 10000;
    }
  }
}

.contact-wrap {
  width: 50%;
  left: 0%;
  //margin: 0 10%;
  padding: 2.5vw;
  background-color: lighten($primary_color, 0%);
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @include breakpoint(small) {
    position: relative;
    width: 100%;
    left: auto;
    top: auto;
    background: transparent;
    padding: 1em;
    min-height: auto;
    //padding: 60vh 5vw 20px;
  }

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: $background;
    background-image: url("~assets/patterns/diag-stripe-top-right.png");
    //background-size: 300px;
    background-attachment: fixed;
    mix-blend-mode: screen;
    z-index: 1;

    @include breakpoint(small) {
      display: none;
    }
  }
}

.signup-info,
.the-form {
  position: relative;
  max-width: 700px;
  background: $background;
  padding: 25px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
  font-size: 0.8em;

  @include breakpoint(small) {
    border: 2px solid $primary_color;
  }
}

.signup-info {
  padding-bottom: 0;

  @include breakpoint(small) {
    border: none;
    padding-top: 0;
    box-shadow: none;
    padding: 0;
  }
}

.logo {
  width: 150px;
  position: relative;
  z-index: 100;
  margin: 1em auto;
  display: none;
}
</style>
