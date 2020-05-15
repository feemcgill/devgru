<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

  @font-face {
    font-family: 'ITC Garamond';
    src: url('/fonts/ITCGaramondStd-LtCondIta.woff2') format('woff2'),
        url('/fonts/ITCGaramondStd-LtCondIta.woff') format('woff');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'ITC Garamond';
    src: url('/fonts/ITCGaramondStd-BkCond.woff2') format('woff2'),
        url('/fonts/ITCGaramondStd-BkCond.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'ITC Garamond';
    src: url('/fonts/ITCGaramondStd-LtCond.woff2') format('woff2'),
        url('/fonts/ITCGaramondStd-LtCond.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'ITC Garamond';
    src: url('/fonts/ITCGaramondStd-BkCondIta.woff2') format('woff2'),
        url('/fonts/ITCGaramondStd-BkCondIta.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }
  body {
    font-family: 'Nanum Gothic Coding';
    font-size: 20px;
  }

  html {
    font-size: 58%;
  }
  @media screen and (min-width: 960px) {
    html {
      font-size: 62.5%;
    }
  }
  @media screen and (min-width: 1550px) {
    html {
      font-size: 72.5%;
    }
  }
  @media screen and (min-width: 1750px) {
    html {
      font-size: 78.5%;
    }
  }
  ::-webkit-input-placeholder,
  ::-moz-placeholder {
    color: white;
    font-size: 15vmin;
  }
  * {
    box-sizing: border-box
  }

  a {
    color: black;
  }
  h1, h2 {
    font-family: 'ITC Garamond';
    font-weight: 100;
    font-size: 2em;
  }

/* 
#ff734d
#FF8200
#ffad62
*/




.page-enter-active, .page-leave-active {
transition: all 1.30s ease-out;
}
.page-enter, .page-leave-active {
opacity: 0;
transform-origin: 50% 50%;
}



.page-enter-active, .page-leave-active {
  transition: opacity 0.5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 1.2s;
  transform-origin: top center;
  /* position: fixed;
  top: 0; */
}
.bounce-leave-active {
  animation: bounce-out 1s;
  opacity: 0;
  /* position: fixed;
  top: 0; */

}
@keyframes bounce-in {
  0% { transform: scale(0) }
  50% { transform: scale(1.1) }
  70% { transform: scale(0.9) }
  100% { transform: scale(1) }
}
@keyframes bounce-out {
  0% { transform: rotate(0deg) }
  50% { transform: rotate(12deg) }
  100% { transform: rotate(0deg) }
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
