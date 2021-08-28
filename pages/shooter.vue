<template> </template>

<script>
import gsap from "gsap"

export default {
  data: function() {
    return {
      k: kaboom({
        global: true,
        // debug: true,
        clearColor: [1, 1, 1, 1],
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
      BULLET_SPEED: 500,
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
          go("main")
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
          go("main")
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
        pos(width() / 2, height() - 100),
        origin("center"),
        "player"
      ])

      this.player.collides("enemy", e => {
        destroy(e)
        // destroy(this.player)
        // shake(120)
        // play("explosion")
        // music.detune(-1200);
        // makeExplosion(vec2(width() / 2, height() / 2), 12, 120, 30)
        // wait(1, () => {
        //   // music.stop();
        //   go("main")
        // })
      })

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

      keyDown("up", () => {
        this.player.move(0, -this.PLAYER_SPEED)
        if (this.player.pos.y < 0) {
          this.player.pos.y = height()
        }
      })

      keyDown("down", () => {
        this.player.move(0, this.PLAYER_SPEED)
        if (this.player.pos.y > height()) {
          this.player.pos.y = 0
        }
      })

      keyPress("space", () => {
        this.spawnBullet(this.player.pos.sub(0, 40))
      })

      // Bullet action
      action("bullet", b => {
        b.move(0, -this.BULLET_SPEED)
        // remove the bullet if it's out of the scene for performance
        if (b.pos.y < 0) {
          destroy(b)
        }
      })

      // Bullet collision
      collides("bullet", "enemy", (b, e) => {
        destroy(b)
        // destroy(e)
        console.log(e)
        gsap.to(e.scale, 0.25, { x: 1.5, y: 1.5 })
        // gsap.to(e, 0.25, { color: 0.5 })
      })
    })
  },
  methods: {
    spawnEnemy() {
      // pick random enemy to spawn
      const name = choose(this.assets_enemies.filter(n => n))

      add([
        sprite(name),
        area(),
        scale(1),
        rotate(Math.round(Math.random() * 360)),
        color(rgba(0, 0, 0, 1)),
        pos(rand(0, width()), 0),
        // health(this.ENEMY_HEALTH),
        origin("center"),
        "enemy",
        {
          speed: rand(this.ENEMY_SPEED * 0.5, this.ENEMY_SPEED * 1.5)
        }
      ])

      wait(0.5, this.spawnEnemy)
    },
    spawnBullet(p) {
      add([rect(10, 10), pos(p), origin("center"), color(0, 0, 0), "bullet"])
    }
  },
  updated() {},
  beforeDestroy() {}
}
</script>

<style lang="scss"></style>
