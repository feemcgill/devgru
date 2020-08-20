<template>
  <div class="home">
    <div class="stage">
      <figure draggable="true" class="logo" />
      <figure draggable="true" class="nuthin" />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  // apollo: { 
  //   page: {
  //     query: gql`
  //     `,
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  .stage {
    background: $white;
    position: absolute;
    height: 100vh;
    width: 100vw;
    figure {
      position: absolute;
      background-repeat: no-repeat;
      /* background-color: yellow; */
    }
    .logo {
      width: 50vh;
      padding-bottom: 12%;
      top: 30px;
      left: 100px;
      background-image: url('~assets/graphix/devgru-logo.svg');
    }

    .nuthin {
      width: 20vh;
      padding-bottom: 22%;
      top: 300px;
      left: 700px;
      background-image: url('~assets/graphix/nuthin.svg');
    }    
  }
</style>