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
  loadSprite("icons", "/shooter/icon-sprite-white.png").then(()=>{
   
      })
    // define a scene
    scene("main", () => {
        add([
          sprite("icons")
        ]) 
      // add a text at position (100, 100)
      add([
        text("kaboom", 32),
        pos(100, 100),
      ]);

      //loadRoot("/");

      // load sprite
      loadSprite("icons", "/shooter/icon-sprite-white.png").then(()=>{
        add([
          sprite("icons")
        ])    
      })



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