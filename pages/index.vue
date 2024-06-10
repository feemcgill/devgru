<template>
  <div class="homer">
    <div class="stage">
      <div class="wrap">
        <div class="logo">
          <Logo fill="#2a8122" />
        </div>
        <div class="intro">
          <div class="about">
            <p>
              is a Los Angeles based consultancy and code shop founded by Brendan
              Sheehan in 2013. We specialize in creating high quality browser
              based products for Creative Agencies and brands.
            </p>
          </div>
          <div class="stack">
            <p>
              We create web experiences, apps and sites using all sorts of fun web
              technoliges including (but not limited to): React.js / Next.js,
              Vue.js / Nuxt.js, Canvas / WebGL, WebAudio, Shopify, (Headless)
              Wordpress / PHP, WooCommerce and Node.js.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.homer {
  transition: 1s all;

  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: yellow;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: -1;
  }
}

.wrap {
  width: 60%;
  padding: 50px;
  margin-left: 2%;

  @include breakpoint(medium) {
    width: 80%;
    margin: 0;
    padding-bottom: 0;
    margin-left: 10%;
  }

  @include breakpoint(small) {
    width: 100%;
    margin: 0;
    padding: 10%;
  }

  @include breakpoint(tiny) {
    width: 100%;
    margin: 0;
    padding: 5%;
  }

  @include breakpoint(short) {
    //padding-bottom: 150px;
  }

  @include breakpoint(really-short) {
    padding-bottom: 50px;
  }

  .logo {
    transition: 1s transform;
    position: relative;
    width: 90%;
    margin-bottom: 2em;
    margin-left: -2%;

    @include breakpoint(small) {
      margin-left: -5px;
      margin-top: 1em;
    }

    @include breakpoint(tiny) {
      margin-left: 0;
      margin-bottom: 1em;
    }
  }

  .intro {
    transition: 1s transform, 1s opacity;
    position: relative;
    margin-left: 5%;
    margin-right: 35%;
    font-size: 0.9em;
    line-height: 1.5em;
    max-width: 700px;
    // font-weight: 600;

    @include breakpoint(medium) {
      margin: 0 0% 100px;
    }

    @include breakpoint(small) {
      margin: 0 0% 100px;
    }
  }

  p {
    margin-bottom: 1.53em;
    //font-size: 1.15em;
  }
}
</style>
