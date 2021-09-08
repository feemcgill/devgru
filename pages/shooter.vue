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
        "thumbs-up",
        "pencil",
        "scissors",
        "telephone",
        "mailbox",
        "happyface",
        "mouse",
        "floppydisk"
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
          this.ENEMY_SPEED += 10
        }

        // rotate enemy as it falls. For some reason with this enabled,
        // enemies disappear from screen too early, sometimes.
        t.angle += t.rotation_speed
      })

      // Spawn enemies
      this.spawnEnemy()

      // Spawn player
      this.player = add([
        sprite("keyboard"),
        area(),
        color(rgba(0, 0, 0, 1)),
        pos(width() / 2, height() - 100),
        origin("center"),
        "player"
      ])

      this.player.collides("enemy", e => {
        destroy(e)
        this.ENEMY_SPEED += 10

        // object of properties to animate
        var obj = { alpha: 1 }

        // animate the player
        gsap
          .timeline()
          .to(obj, 0.05, {
            alpha: 0,
            onUpdate: () => {
              this.player.color = rgba(0, 0, 0, obj.alpha)
            }
          })
          .to(obj, 0.05, {
            alpha: 1,
            onUpdate: () => {
              this.player.color = rgba(0, 0, 0, obj.alpha)
            }
          })
          .to(obj, 0.05, {
            alpha: 0,
            onUpdate: () => {
              this.player.color = rgba(0, 0, 0, obj.alpha)
            }
          })
          .to(obj, 0.05, {
            alpha: 1,
            onUpdate: () => {
              this.player.color = rgba(0, 0, 0, obj.alpha)
            }
          })
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
        // destroy bullet
        destroy(b)

        // object of properties to animate
        var obj = { alpha: 1 }

        // make a copy of killed enemy, for animation (off the collision detection watcher)
        const temp_enemy = add([
          sprite(e.name),
          scale(1),
          rotate(e.angle),
          color(rgba(0, 0, 0, 1)),
          pos(e.pos),
          origin("center")
        ])

        // remove killed enemy
        destroy(e)

        // animate the copy of killed enemy
        gsap
          .timeline()
          .to(temp_enemy.scale, 0.1, { x: 1.5, y: 1.5 })
          .to(obj, 0.05, {
            alpha: 0,
            onUpdate: () => {
              temp_enemy.color = rgba(0, 0, 0, obj.alpha)
            }
          })
          .to(obj, 0.05, {
            alpha: 1,
            onUpdate: () => {
              temp_enemy.color = rgba(0, 0, 0, obj.alpha)
            }
          })
          .to(obj, 0.05, {
            alpha: 0,
            onUpdate: () => {
              temp_enemy.color = rgba(0, 0, 0, obj.alpha)
            }
          })
          .to(obj, 0.05, {
            alpha: 1,
            onUpdate: () => {
              temp_enemy.color = rgba(0, 0, 0, obj.alpha)
            }
          })
          .to(obj, 0.5, {
            alpha: 0,
            onUpdate: () => {
              temp_enemy.color = rgba(0, 0, 0, obj.alpha)
            },
            onComplete: () => {
              destroy(temp_enemy)
            }
          })
          .to(temp_enemy.scale, 0.5, { x: 0.75, y: 0.75 }, "-=0.5")
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
        rotate(rand(-360, 360)),
        color(rgba(0, 0, 0, 1)),
        pos(rand(0, width()), 0),
        // health(this.ENEMY_HEALTH),
        origin("center"),
        "enemy",
        {
          name: name,
          speed: rand(this.ENEMY_SPEED * 0.5, this.ENEMY_SPEED * 1.5),
          rotation_speed: rand(-0.01, 0.01)
        }
      ])

      wait(1, this.spawnEnemy)
    },
    spawnBullet(p) {
      add([rect(5, 5), pos(p), origin("center"), color(0, 0, 0), "bullet"])
    }
  },
  updated() {},
  beforeDestroy() {}
}
</script>

<style lang="scss"></style>
