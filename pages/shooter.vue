<template> </template>

<script>
export default {
  data: function() {
    return {
      k: kaboom({
        global: true,
        // debug: true,
        width: document.body.clientWidth,
        height: window.innerHeight - 4
      }),
      assets_enemies: [
        "bomb",
        "computer",
        "documents",
        "folder",
        "peace",
        "shout",
        "star-circle",
        "thumbs-up"
      ],
      assets_friends: ["keyboard"],
      player: null,
      num_assets_loaded: 0,
      num_total_assets: null,
      game_started: false,
      PLAYER_SPEED: 220,
      ENEMY_SPEED: 50,
      ENEMY_HEALTH: 4
    }
  },
  computed: {},
  mounted() {
    // Load Assets
    this.num_total_assets =
      this.assets_enemies.length + this.assets_friends.length

    for (const enemy of this.assets_enemies) {
      loadSprite(enemy, `/shooter/${enemy}.svg`).then(() => {
        this.num_assets_loaded++

        if (
          this.num_assets_loaded == this.num_total_assets &&
          this.game_started == false
        ) {
          // start the game
          start("main")
        }
      })
    }

    for (const friend of this.assets_friends) {
      loadSprite(friend, `/shooter/${friend}.svg`).then(() => {
        this.num_assets_loaded++
        if (
          this.num_assets_loaded == this.num_total_assets &&
          this.game_started == false
        ) {
          // start the game
          start("main")
        }
      })
    }

    // define a scene
    scene("main", () => {
      console.log("main scene started")
      this.game_started = true

      layers(["game", "ui"], "game")

      camIgnore(["ui"])

      // Move Enemies down screen
      action("enemy", t => {
        t.move(0, t.speed * 1.5)
        if (t.pos.y - t.height > height()) {
          destroy(t)
        }
      })

      // Spawn enemies
      this.spawnEnemy()

      // Spawn player
      this.player = add([
        sprite("keyboard"),
        area(),
        pos(width() / 2, height() - 40),
        origin("center")
      ])

      keyDown("left", () => {
        this.player.move(-this.PLAYER_SPEED, 0)
        if (this.player.pos.x < 0) {
          this.player.pos.x = width()
        }
      })

      keyDown("right", () => {
        this.player.move(this.PLAYER_SPEED, 0)
        if (this.player.pos.x > width()) {
          this.player.pos.x = 0
        }
      })
    })
  },
  methods: {
    spawnEnemy() {
      console.log("Spawning an enemy!")

      const name = choose(this.assets_enemies.filter(n => n))

      add([
        sprite(name),
        area(),
        pos(rand(0, width()), 0),
        // health(this.ENEMY_HEALTH),
        origin("bot"),
        "enemy",
        {
          speed: rand(this.ENEMY_SPEED * 0.5, this.ENEMY_SPEED * 1.5)
        }
      ])

      wait(0.5, this.spawnEnemy)
    }
  },
  updated() {},
  beforeDestroy() {}
}
</script>

<style lang="scss"></style>
