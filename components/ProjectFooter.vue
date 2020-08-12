<template>
  <footer>
    <div class="content">
      <nuxt-link to="/portfolio">
        <button>All Projects</button>
      </nuxt-link>
      <div class="next-project">
        <nuxt-link to="/portfolio">
          <span>Next Project:</span>
          <button>Title of the Next Project</button>
        </nuxt-link>
      </div>
    </div>
  </footer>  
</template>

<style lang="scss" scoped>
$color-flair: #ff734d;

footer {
  padding: 10px 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 300;
  background-color: $color-flair;

  .content {
    z-index: 400;
    display: flex;
    justify-content: space-between;
  }
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: white;
    background-image: url('~assets/patterns/diag-stripe-top-right.png');
    /* background-size: 220px; */
    //filter: contrast(100);
    mix-blend-mode: screen;
    z-index: -1;
  }
}
</style>