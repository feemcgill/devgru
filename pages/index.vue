<script setup lang="ts">
import LogoIcon from '../components/LogoIcon.vue';

</script>

<template>
  <div class="homer">
    <div class="stage">
      <div class="wrap">
        <div class="logo">
          <LogoIcon />
        </div>
        <div class="intro">
          <div class="about">
            <p>
              We are Development Group, a nimble, high-end creative web development studio. We
              are platform agnostic, but do a lot of work in <strong>React, Vue, Shopify, Webflow and
                Wordpress.</strong> We've likely
              dabbled in your stack.
            </p>
            <!-- <NuxtLink to="/about"><button>Read More about us</button></NuxtLink> -->
            <!--             
            <p>
              We partner with like-minded creative agencies to help them build out their visions and navigate
              development project lifecycles. We also engage directly with brands and organizations to help create, grow
              and maintain their digital properties. We'd like to think we provide the value of a freelancer with the
              confidence and depth of a battle-tested code consultancy.

            </p>
            <p>

              Our goal is to wow your designers and creative team, mitigate stress for your project managers and
              leadership, and add value for your clients and stakeholders.
            </p>
            <p>


              Deliverables include visually stunning, accessible and performant frontends; clean and secure backends;
              and clear lockstep communication with our partners.

            </p>
            <p>

              At the end of the day we want you to know that we got you.
            </p>
            <p>
              No surprises. Let's talk!
            </p> -->
          </div>
          <div class="stack">

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
    max-width: 200px;
    margin-bottom: 2em;
    //margin-left: -2%;

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
    //margin-left: 5%;
    margin-right: 35%;
    font-size: 0.8em;
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
