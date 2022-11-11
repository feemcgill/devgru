<template>
  <div class="homer">
    <div class="stage">
      <div class="intro">
        <div class="logo">
          <Logo fill="#2a8122" />
        </div>
        <div class="about">
          <p>
            is a Los Angeles based consultancy and code shop founded by Brendan
            Sheehan in 2013. We specialize in creating high quality browser
            based prodcuts for Creative Agencies and brands.
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
</template>

<script></script>

<style lang="scss" scoped>
.homer {
  background-color: rgba(255, 255, 255, 0.9);
  min-height: 100vh;
}
.intro {
  width: 33%;
  padding: 50px;
  margin-left: 2%;
  font-size: 0.8em;
  line-height: 1.5;
  @include breakpoint(medium) {
    width: 100%;
    margin: 0;
    padding-bottom: 0;
  }
  .logo {
    width: 90%;
    margin-bottom: 2em;
    margin-left: -5%;
  }
  p {
    margin-bottom: 1.53em;
  }
}
</style>
