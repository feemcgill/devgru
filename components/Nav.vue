<template>
  <div>
    <a
      v-bind:class="showNav ? 'nav-toggle open' : 'nav-toggle closed'"
      v-on:click="showNav = !showNav"
    >
      <div class="nav-tog-wrap">
        <svg
          id="folder_closed"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 66.8 52.03"
        >
          <path
            class="cls-1"
            d="M0,52.09V11.35C0,8.44,1.47,7,4.35,7h2A3.65,3.65,0,0,0,8.5,6.51a3.23,3.23,0,0,0,1-1.84l.35-1.41c.4-1.48.88-2.38,1.44-2.71A10.51,10.51,0,0,1,15.39.06h13.5a8.35,8.35,0,0,1,3.6.51,3.65,3.65,0,0,1,1.39,2.34l.39,1.51a3.93,3.93,0,0,0,1.07,2.2,7,7,0,0,0,3,.37H62.53a4.78,4.78,0,0,1,3.38.91c.61.61.91,1.75.91,3.41V52.09Zm1.73-1.86,63.35.25V11.31a2.3,2.3,0,0,0-2.6-2.6H4.59c-1.89,0-2.84.87-2.84,2.6ZM10.82,7H33l-.7-2.67a3.73,3.73,0,0,0-1-2.11,5.17,5.17,0,0,0-2.6-.43H15.77a7.35,7.35,0,0,0-3.07.41,3.13,3.13,0,0,0-1.14,2Z"
            transform="translate(-0.02 -0.06)"
          />
        </svg>

        <svg
          id="folder_opened"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 84.66 52.03"
        >
          <path
            class="cls-1"
            d="M1.12,54.66V13.91c0-2.9,1.44-4.36,4.32-4.36h2a3.7,3.7,0,0,0,2.14-.47,3.33,3.33,0,0,0,1-1.85l.35-1.41q.56-2.21,1.44-2.7c.56-.33,1.92-.49,4.08-.49H29.88a9.41,9.41,0,0,1,3.72.45A4.19,4.19,0,0,1,35,5.54l.39,1.3A5,5,0,0,0,36.5,9.2a6.63,6.63,0,0,0,2.83.35h24.3q2.49,0,3.39.93c.6.62.9,1.79.9,3.5v3.38h14c2.53,0,3.84.44,3.91,1.33a13.91,13.91,0,0,1-1.24,2.85L67.92,54.66Zm1.72-3.59L18,21.61q1.65-3.19,2.57-3.73c.6-.35,2.19-.52,4.74-.52H66.19V14c0-1.8-.88-2.71-2.63-2.71H39.12A12.36,12.36,0,0,1,35,10.89c-.51-.26-.93-1.06-1.26-2.39l-.42-1.62a4,4,0,0,0-1-2.13,5.26,5.26,0,0,0-2.58-.4h-13a7.17,7.17,0,0,0-3,.42,3.13,3.13,0,0,0-1.2,2l-.42,1.62a4.6,4.6,0,0,1-1.25,2.46,6.5,6.5,0,0,1-3,.45H5.62a3.46,3.46,0,0,0-2.23.51A3,3,0,0,0,2.84,14ZM3.9,52.93H66.79L82.37,21.72a11.63,11.63,0,0,0,.77-1.9c-.07-.5-.8-.74-2.18-.74H24.22a6,6,0,0,0-2.82.46,5,5,0,0,0-1.58,2.07Z"
            transform="translate(-1.12 -2.63)"
          />
        </svg>
      </div>
    </a>

    <transition name="nav">
      <nav v-show="showNav" v-bind:class="showNav ? 'open' : 'closed'">
        <div class="backboard" v-on:click.self="showNav = false">
          <div class="nav-wrap">
            <ul>
              <li v-on:click="showNav = false">
                <nuxt-link to="/">
                  <span>Home</span>
                </nuxt-link>
              </li>

              <li v-on:click="showNav = false">
                <nuxt-link to="/portfolio">
                  <span>Portfolio</span>
                </nuxt-link>
              </li>

              <li v-on:click="showNav = false">
                <nuxt-link to="/contact">
                  <span>Contact</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
    }
  },
  mounted() {
    // var ztxt = new Ztextify(".nav-tog-wrap", {
    //   depth: "30px",
    //   layers: 10,
    //   fade: false,
    //   direction: "forwards",
    //   event: "pointer",
    //   eventRotation: "5deg"
    // });
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.nav-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10010;
  width: 70px;
  height: 44px;
  cursor: pointer;
  svg {
    * {
      fill: $flair;
    }
  }
  #folder_closed {
    display: block;
    width: 80%;
  }
  #folder_opened {
    display: none;
  }
  &.open,
  &:hover {
    #folder_closed {
      display: none;
    }
    #folder_opened {
      display: block;
    }
  }
  @include breakpoint(medium) {
    top: 10px;
    height: 50px;
    width: 50px;
    background: $white;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $flair;
    cursor: pointer;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    padding-left: 5px;
    svg {
      width: 24px;
      height: 24px;
    }
  }
}

nav {
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 10000;
  .backboard {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav-wrap {
    background: $primary_color;
  }
  ul {
    font-size: 2.4em;
    list-style: none;
    position: relative;
    z-index: 10;
    display: block;
    overflow: hidden;
    padding: 20px;
    background-color: $white;
    border: 2px solid $black;
    mix-blend-mode: screen;
    li {
      display: block;
      margin-bottom: 0.1em;
      position: relative;
      a {
        text-decoration: none;
        position: relative;
      }
      span {
        transition: all 0.2s ease-out;
        color: $black;
      }
      &:before {
        content: "";
        background-image: url("~assets/graphix/document.svg");
        background-repeat: no-repeat;
        width: 20px;
        height: 40px;
        display: inline-block;
        margin-right: 0.2em;
        margin-top: 0.1em;
        vertical-align: middle;
      }
      &:hover {
        span {
          transform: translateX(10px);
          display: inline-block;
        }
      }
    }
  }
}

.nav-enter-active {
  animation: nav-in 0.7s;
}

.nav-leave-active {
  animation: nav-out 0.7s;
}

@keyframes nav-in {
  0% {
    transform: rotate(0) scale(0);
  }
  50% {
    transform: rotate(-80deg);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
@keyframes nav-out {
  0% {
    transform: rotate(0) scale(1);
  }
  100% {
    transform: rotate(0) scale(0);
  }
}
</style>
