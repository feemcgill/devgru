<template>
  <div class="homer">
    <div class="stage">
      <div class="intro">
        <div class="logo">
          <Logo fill="#2a8122" />
        </div>
        <div class="about">
          <p>
            is a consultancy and code shop based in Los Angeles. We specialize
            in creating high quality browser based prodcuts for Creative
            Agencies and brands.
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
      <div class="vibes">
        <ul>
          <li class="mint">
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
          <li class="play">
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
          <li class="check">
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
          <li class="contact">
            <nuxt-link to="/contact">Get in touch!</nuxt-link>
          </li>
        </ul>
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
  .logo {
    width: 90%;
    margin-bottom: 0.53em;
    margin-left: -5%;
  }
  p {
    margin-bottom: 1.53em;
  }
}
.vibes {
  ul {
    margin: 0;
    padding: 0;
    // display: flex;
    li {
      position: relative;
      display: inline-block;
      width: 200px;
      height: 200px;
      position: fixed;
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
        font-size: 0.9em;
        font-weight: bold;
      }
      span {
        padding: 0 2em;
      }
      svg {
        width: 100%;
        height: 100%;
        * {
          stroke: $flair;
          stroke-width: 1px;
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
  .mint {
    //width: 100px;
    display: none;
    top: 1%;
    right: 1%;
    svg {
      * {
        //stroke-width: 2px;
      }
    }
    div {
      span {
        padding-top: 60%;
      }
    }
  }
  .play {
    bottom: 5%;
    right: 10%;
  }
  .check {
    bottom: 50%;
    right: 25%;
  }
  .contact {
    bottom: 10%;
    left: 20%;
    border: 2px solid $flair;
    border-radius: 100%;
    @include headline_font;
    text-align: center;
    padding: 12px 20px 8px;
    font-size: 1.5em;
    width: auto;
    height: auto;
    &:hover {
      background: yellow;
    }
    a {
      text-decoration: none;
      display: block;
    }
  }
}
</style>
