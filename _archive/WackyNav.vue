<template>
  <nav :class="!floating && 'not-floating'">
    <div v-if="!isHome" class="button-wrap">
      <button @click="handleBurgerClick" v-html="floating ? '&times;' : ''" />
    </div>
    <ul>
      <li @click="floating = false" class="home" v-if="!isHome">
        <nuxt-link to="/">
          <svg
            width="84"
            height="72"
            viewBox="0 0 84 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.72476 71.0002V22.6243L42.2575 1.50451L82.7978 22.6243V71.0002H1.72476Z"
              stroke="#231F20"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>

          <div><span>Homepage!</span></div>
        </nuxt-link>
      </li>
      <li @click="floating = false" class="mint">
        <a>
          <svg
            width="88"
            height="76"
            viewBox="0 0 88 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.09863 73.8604L43.8018 3.36036L84.505 73.8604H3.09863Z"
              stroke="black"
              stroke-width="3"
            />
          </svg>

          <div><span>Mint our NFT!</span></div>
        </a>
      </li>
      <li @click="floating = false" class="play">
        <nuxt-link to="/vidja-game">
          <svg
            width="101"
            height="100"
            viewBox="0 0 101 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M57.1819 13.6354L65.278 4.75376L66.6074 16.6979L66.7755 18.208L68.0959 17.4563L78.5403 11.5112L76.1137 23.2816L75.8069 24.7697L77.295 24.4629L89.0654 22.0363L83.1203 32.4807L82.3686 33.8011L83.8787 33.9692L95.8229 35.2986L86.9412 43.3947L85.8184 44.4183L87.2026 45.0447L98.1513 50L87.2026 54.9553L85.8184 55.5817L86.9412 56.6053L95.8228 64.7014L83.8787 66.0308L82.3686 66.1989L83.1203 67.5193L89.0654 77.9637L77.295 75.5371L75.8069 75.2303L76.1137 76.7184L78.5403 88.4888L68.0959 82.5437L66.7755 81.792L66.6074 83.3021L65.278 95.2462L57.1819 86.3646L56.1583 85.2418L55.5319 86.626L50.5766 97.5747L45.6213 86.626L44.9949 85.2418L43.9713 86.3646L35.8752 95.2463L34.5458 83.3021L34.3777 81.792L33.0573 82.5437L22.6129 88.4888L25.0395 76.7184L25.3463 75.2303L23.8582 75.5371L12.0878 77.9637L18.0329 67.5193L18.7846 66.1989L17.2745 66.0308L5.33036 64.7014L14.212 56.6053L15.3349 55.5817L13.9506 54.9553L3.00188 50L13.9506 45.0447L15.3349 44.4183L14.212 43.3947L5.33035 35.2986L17.2745 33.9692L18.7846 33.8011L18.0329 32.4807L12.0878 22.0363L23.8582 24.4629L25.3463 24.7697L25.0395 23.2816L22.6129 11.5112L33.0573 17.4563L34.3777 18.208L34.5458 16.6979L35.8752 4.75375L43.9713 13.6354L44.9949 14.7583L45.6213 13.374L50.5766 2.42528L55.5319 13.374L56.1583 14.7583L57.1819 13.6354Z"
              stroke="black"
              stroke-width="2"
            />
          </svg>

          <div><span>play "2 much Tooling!"</span></div>
        </nuxt-link>
      </li>
      <li @click="floating = false" class="check">
        <nuxt-link to="/portfolio">
          <svg
            width="101"
            height="101"
            viewBox="0 0 101 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8738 16.3603L50.0811 2.19115L84.2884 16.3603L98.4575 50.5676L84.2884 84.7749L50.0811 98.944L15.8738 84.7749L1.70467 50.5676L15.8738 16.3603Z"
              stroke="black"
              stroke-width="3"
            />
          </svg>

          <div><span> Check our work! </span></div>
        </nuxt-link>
      </li>
      <li @click="floating = false" class="contact">
        <nuxt-link to="/contact">
          <svg
            width="101"
            height="43"
            viewBox="0 0 101 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M99.1089 21.5676C99.1089 24.0831 97.8849 26.571 95.4793 28.9315C93.0703 31.2954 89.533 33.4702 85.0809 35.318C76.1814 39.0117 63.8175 41.3198 50.1089 41.3198C36.4004 41.3198 24.0365 39.0117 15.1369 35.318C10.6849 33.4702 7.14756 31.2954 4.73859 28.9315C2.33303 26.571 1.10895 24.0831 1.10895 21.5676C1.10895 19.0521 2.33303 16.5641 4.73859 14.2036C7.14756 11.8397 10.6849 9.6649 15.1369 7.81711C24.0365 4.12338 36.4004 1.81531 50.1089 1.81531C63.8175 1.81531 76.1814 4.12338 85.0809 7.81711C89.533 9.6649 93.0703 11.8397 95.4793 14.2036C97.8849 16.5641 99.1089 19.0521 99.1089 21.5676Z"
              stroke="black"
              stroke-width="2"
            />
          </svg>
          <div><span>Get in Touch!</span></div>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      floating: true,
      isHome: false,
      route: this.$nuxt.$route.path,
    }
  },
  methods: {
    handleBurgerClick() {
      this.floating = !this.floating
      // if (this.floating) {
      //   this.$router.push({
      //     path: "/",
      //   })
      // } else {
      //   this.floating = true
      // }
    },
  },
  watch: {
    $route(to, from) {
      console.log("ROUTE", to, from)
      if (to.path == "/") {
        this.floating = true
        this.isHome = true
      } else {
        this.isHome = false
        //this.floating = false
      }
    },
  },
  created() {
    console.log(this.route, "CREATED")
    if (this.route == "/") {
      this.floating = true
      this.isHome = true
    } else {
      this.isHome = false
      this.floating = false
    }
  },
  mounted() {
    console.log(this.route, "MOUNTED")
  },
}
</script>

<style lang="scss" scoped>
nav {
  position: relative;
  z-index: 1000;
  .button-wrap button {
    position: fixed;
    top: 20px;
    right: 10px;
    border: 2px solid $flair;
    height: 130px;
    width: 115px;
    background: $white;
    color: $flair;
    //border-radius: 100%;
  }
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    li {
      position: relative;
      display: block;
      width: 200px;
      position: fixed;
      font-size: 0.9em;
      transition: all 0.5s ease-in-out;
      @include breakpoint(medium) {
        width: 100px;
        font-size: 0.6em;
      }
      div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight: bold;
      }
      a {
        display: block;
      }
      span {
        padding: 0 2em;
        transition: opacity 0.2s ease-in 0.5s;
        opacity: 1;
        display: block;
      }
      svg {
        width: 100%;
        height: auto;
        //height: 100%;
        filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.3));

        * {
          stroke: $flair;
          stroke-width: 1px;
          transition: all 0.5s ease-in-out;
          fill: $white;
          @include breakpoint(medium) {
            stroke-width: 2px;
          }
        }
      }
      &:hover {
        svg {
          * {
            fill: yellow;
          }
        }
      }
    }
  }
  .home {
    top: 10%;
    right: 60%;
    @include breakpoint(medium) {
      top: 70%;
      right: 40%;
    }
    // width: 80%;
    // border: 2px solid $flair;
    // padding: 20px;
    // background-color: $white;
    // border-radius: 20px;
    // top: 20%;
    // @include breakpoint(medium) {
    //   top: 70%;
    //   right: 10%;
    // }
  }
  .mint {
    top: 1%;
    right: 1%;
    div {
      span {
        padding-top: 60%;
      }
    }
  }
  .play {
    top: 20%;
    right: 20%;
    @include breakpoint(medium) {
      top: 84%;
      right: 10%;
    }
  }
  .check {
    top: 60%;
    right: 60%;
    @include breakpoint(medium) {
      top: 84%;
      right: 40%;
    }
  }
  .contact {
    top: 84%;
    right: 12%;
    @include headline_font;
    text-align: center;
    @include breakpoint(medium) {
      top: 88%;
      right: 70%;
    }
  }
  &.not-floating {
    ul {
      li {
        width: 12px;
        pointer-events: none;
        div {
          span {
            opacity: 0;
            transition: opacity 0s ease-in 0s;
          }
        }
        svg {
          filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0));

          * {
            stroke: none;
            fill: $flair;
          }
        }
      }
      .home {
        top: 25px;
        right: 90px;
      }
      .play {
        top: 25px;
        right: 15px;
      }
      .check {
        top: 25px;
        right: 40px;
      }
      .contact {
        top: 25px;
        right: 67px;
        @include breakpoint(medium) {
          top: 30px;
        }
      }
    }
  }
}
</style>
