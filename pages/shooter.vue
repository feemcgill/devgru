<template>
  
</template>

<script>

export default {
  data: function() {
    return {
      k: null,
    };
  },
  computed: {
    
  },
  methods: {
  },
  mounted() {
    console.log('shooter: MOUNTED')
    // initialize kaboom context
    kaboom({
      // global: true,
    })

    loadSprite("mark", require("@/assets/img/shooter/icon-sprite-white.png"))

    add([
      sprite("mark"),
    ])

  },
  updated() {
    
  },
  beforeDestroy() {
    
  },
}
</script>



<style lang="scss">
.shooter {

}
</style>