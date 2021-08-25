<template>
  
</template>

<script>

export default {
  data: function() {
    return {

    }
  },
  computed: {
    
  },
  methods: {
  },
  mounted() {
    console.log('shooter: MOUNTED')

    // initialize kaboom context
    kaboom({
      global: true
    });

    // define a scene
    scene("main", () => {

      // add a text at position (100, 100)
      add([
        text("kaboom", 32),
        pos(100, 100),
      ]);

      // load sprite
      loadSprite("icons", require("@/assets/img/shooter/icon-sprite-white.png"))

      add([
        sprite('icons')
      ])

    });

    // start the game
    start("main");

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