<template>
  <div class="shooter-game">
    <div class="bg"></div>
    <div class="game-wrap">
      <canvas id="mycanvas" ref="mycanvas"></canvas>
      <div class="ui" v-bind:class="{ hidden: screensaver_mode }">
        <div class="score">
          Score: <span class="number">{{ score }}</span>
        </div>
        <div class="health">
          <div class="title">Health</div>
          <div class="bar" v-on:click="screensaverMode">
            <div
              :style="`width: ${(current_health / PLAYER_HEALTH) * 100}%;`"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap"

export default {
  data: function () {
    return {
      k: null,
      assets_enemies: [
        "bomb.svg",
        "computer.svg",
        "documents.svg",
        "folder.svg",
        "peace.svg",
        "shout.svg",
        "star-circle.svg",
        "thumbs-up.svg",
        "pencil.svg",
        "scissors.svg",
        "telephone.svg",
        "mailbox.svg",
        "happyface.svg",
        "mouse.svg",
        "floppydisk.svg",
      ],
      assets_friends: ["keyboard.svg"],
      assets_ui: ["healthbar.svg"],
      player: null,
      health_bar: null,
      score: 0,
      num_assets_loaded: 0,
      num_total_assets: null,
      game_started: false,
      PLAYER_SPEED: 220,
      PLAYER_HEALTH: 5,
      current_health: 5,
      ENEMY_SPEED: 50,
      enemy_base_speed: 1,
      BULLET_SPEED: 500,
      ENEMY_HEALTH: 4,
      HEAL_RATE: 0.001,
      currentRoute: null,
      screensaver_mode: false,
      route_path: this.$nuxt.$route.path,
    }
  },
  computed: {
    gameStateChanged() {
      console.log("gameStateChanged")
    },
  },
  mounted() {
    this.currentRoute = this.$route.name

    let kaboom_script = document.createElement("script")
    kaboom_script.setAttribute("src", "/js/kaboom_new.js")
    document.head.appendChild(kaboom_script)
    kaboom_script.onload = () => {
      console.log("kaboom script loaded")
      this.initKaboom()
    }

    // if (this.route_path == "/vidja-game") {
    //   this.screensaverMode(false)
    // }
  },
  methods: {
    pauseGame() {
      debug.paused = true
    },
    inspectGame() {
      debug.inspect = true
    },
    screensaverMode(bool) {
      if (bool == true) {
        console.log("screensaverMode TRU")
        this.screensaver_mode = true

        // make player disappear
        let obj = { alpha: 1 }
        gsap.to(obj, 0.5, {
          alpha: 0,
          onUpdate: () => {
            this.player.opacity = obj.alpha
          },
        })

        // slow down enemies
        this.enemy_base_speed = 0.2
        every("enemy", (e) => {
          let num_obj = { val: e.speed }
          let new_val = 10

          gsap.to(num_obj, 1, {
            val: new_val,
            roundProps: "val",
            onUpdate: function () {
              e.speed = num_obj.val
            },
          })
        })
      } else {
        console.log("screensaverMode FALS")
        // set focus on canvas
        this.$refs.mycanvas.focus()

        this.screensaver_mode = false
        // make player appear
        let obj = { alpha: this.player.opacity }
        gsap.to(obj, 0.5, {
          alpha: 1,
          onUpdate: () => {
            this.player.opacity = obj.alpha
          },
        })

        // speed enemies back up
        this.enemy_base_speed = 1
        every("enemy", (e) => {
          let num_obj = { val: e.speed }
          let new_val = e.original_speed

          gsap.to(num_obj, 1, {
            val: new_val,
            roundProps: "val",
            onUpdate: function () {
              e.speed = num_obj.val
            },
          })
        })
      }
    },
    speedupEnemies() {
      this.enemy_base_speed += 0.2
      every("enemy", (e) => {
        let num_obj = { val: e.speed }
        let new_val = e.speed + 10
        gsap.to(num_obj, 1, {
          val: new_val,
          roundProps: "val",
          onUpdate: function () {
            e.speed = num_obj.val
          },
        })
      })
    },
    slowdownEnemies() {
      this.enemy_base_speed -= 0.2
      every("enemy", (e) => {
        let num_obj = { val: e.speed }
        let new_val = e.speed - 10
        if (new_val < e.original_speed) {
          new_val = e.original_speed
        }

        gsap.to(num_obj, 1, {
          val: new_val,
          roundProps: "val",
          onUpdate: function () {
            e.speed = num_obj.val
          },
        })

        if (this.enemy_base_speed < 1) {
          this.enemy_base_speed = 1
        }
      })
    },
    initKaboom() {
      this.k = kaboom({
        global: true,
        // debug: true,
        clearColor: [1, 1, 1, 1],
        width: document.body.clientWidth * 2,
        height: (window.innerHeight - 4) * 2,
        // width: 1000,
        // height: 1000,
        canvas: document.querySelector("#mycanvas"),
        background: [255, 255, 255],
        crisp: true,
        //letterbox: true,
        //stretch: true,
      })

      // set focus on canvas
      this.$refs.mycanvas.focus()

      // Load Assets
      this.num_total_assets =
        this.assets_enemies.length +
        this.assets_friends.length +
        this.assets_ui.length

      this.loadAssetSet(this.assets_enemies)
      this.loadAssetSet(this.assets_friends)
      this.loadAssetSet(this.assets_ui)

      // define a scene
      scene("main", () => {
        console.log("main scene started")
        this.game_started = true

        layers(["game"], "game")

        // Move Enemies down screen
        action("enemy", (t) => {
          t.move(0, t.speed * 1.5)
          if (t.pos.y - t.height > height()) {
            destroy(t)
          }

          // rotate enemy as it falls. For some reason with this enabled,
          // enemies disappear from screen too early, sometimes.
          t.angle += t.rotation_speed
        })

        // Spawn enemies
        this.spawnEnemy()

        // Spawn player
        this.player = add([
          health(this.PLAYER_HEALTH),
          sprite("keyboard.svg"),
          area(),
          // color(rgba(0, 0, 0, 1)),
          pos(width() / 2, height() - 100),
          origin("center"),
          "player",
        ])

        this.player.collides("enemy", (e) => {
          if (!this.screensaver_mode) {
            shake(20)
            destroy(e)
            this.player.hurt(1)
            if (this.player.hp() < 0) {
              this.player.setHP(0)
            }
            console.log("health points: " + this.player.hp())

            this.speedupEnemies()

            // object of properties to animate
            var obj = { alpha: 1 }

            // animate the player
            gsap
              .timeline()
              .to(obj, 0.05, {
                alpha: 0,
                onUpdate: () => {
                  this.player.opacity = obj.alpha
                },
              })
              .to(obj, 0.05, {
                alpha: 1,
                onUpdate: () => {
                  this.player.opacity = obj.alpha
                },
              })
              .to(obj, 0.05, {
                alpha: 0,
                onUpdate: () => {
                  this.player.opacity = obj.alpha
                },
              })
              .to(obj, 0.05, {
                alpha: 1,
                onUpdate: () => {
                  this.player.opacity = obj.alpha
                },
              })
          }
        })

        onUpdate(() => {
          this.current_health = this.player.hp()

          if (this.player.hp() < this.PLAYER_HEALTH && this.player.hp() > 0) {
            this.player.heal(this.HEAL_RATE)
          }
        })

        keyDown("left", () => {
          if (!this.screensaver_mode) {
            this.player.move(-this.PLAYER_SPEED, 0)
            if (this.player.pos.x < 0) {
              this.player.pos.x = width()
            }
          }
        })

        keyDown("right", () => {
          if (!this.screensaver_mode) {
            this.player.move(this.PLAYER_SPEED, 0)
            if (this.player.pos.x > width()) {
              this.player.pos.x = 0
            }
          }
        })

        keyDown("up", () => {
          if (!this.screensaver_mode) {
            this.player.move(0, -this.PLAYER_SPEED)
            if (this.player.pos.y < 0) {
              this.player.pos.y = height()
            }
          }
        })

        keyDown("down", () => {
          if (!this.screensaver_mode) {
            this.player.move(0, this.PLAYER_SPEED)
            if (this.player.pos.y > height()) {
              this.player.pos.y = 0
            }
          }
        })

        keyPress("space", () => {
          if (!this.screensaver_mode) {
            this.spawnBullet(this.player.pos.sub(0, 40))
          }
        })

        // Bullet action
        action("bullet", (b) => {
          b.move(0, -this.BULLET_SPEED)
          // remove the bullet if it's out of the scene for performance
          if (b.pos.y < 0) {
            destroy(b)
          }
        })

        // Bullet collision
        collides("bullet", "enemy", (b, e) => {
          //shake(5)
          this.score++
          // destroy bullet
          destroy(b)

          // Slow enemy speed
          this.slowdownEnemies()

          // object of properties to animate
          var obj = { alpha: 1 }

          // make a copy of killed enemy, for animation (off the collision detection watcher)
          const temp_enemy = add([
            sprite(e.name),
            scale(1),
            rotate(e.angle),
            // color(rgba(0, 0, 0, 1)),
            pos(e.pos),
            origin("center"),
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
                temp_enemy.opacity = obj.alpha
              },
            })
            .to(obj, 0.05, {
              alpha: 1,
              onUpdate: () => {
                temp_enemy.opacity = obj.alpha
              },
            })
            .to(obj, 0.05, {
              alpha: 0,
              onUpdate: () => {
                temp_enemy.opacity = obj.alpha
              },
            })
            .to(obj, 0.05, {
              alpha: 1,
              onUpdate: () => {
                temp_enemy.opacity = obj.alpha
              },
            })
            .to(obj, 0.5, {
              alpha: 0,
              onUpdate: () => {
                temp_enemy.opacity = obj.alpha
              },
              onComplete: () => {
                destroy(temp_enemy)
              },
            })
            .to(temp_enemy.scale, 0.5, { x: 0.75, y: 0.75 }, "-=0.5")
        })
        // B added this
        this.screensaverMode(true)
        if (this.route_path == "/vidja-game") {
          this.screensaverMode(false)
        }
      })

      scene("screensaver", () => {
        console.log("screensvaer scene started")
      })
    },
    spawnEnemy() {
      // pick random enemy to spawn
      const name = choose(this.assets_enemies.filter((n) => n))
      const enemy_speed =
        rand(this.ENEMY_SPEED * 0.5, this.ENEMY_SPEED * 1.5) *
        this.enemy_base_speed

      add([
        sprite(name),
        area(),
        scale(1),
        rotate(rand(-360, 360)),
        // color(rgba(0, 0, 0, 1)),
        pos(rand(0, width()), -100),
        // health(this.ENEMY_HEALTH),
        origin("center"),
        "enemy",
        {
          name: name,
          speed: enemy_speed,
          original_speed: enemy_speed,
          rotation_speed: rand(-0.5, 0.5),
        },
      ])

      wait(1, this.spawnEnemy)
    },
    spawnBullet(p) {
      add([
        rect(5, 5),
        area(),
        pos(p),
        origin("center"),
        color(0, 0, 0),
        "bullet",
      ])
    },
    loadAssetSet(asset_arr) {
      for (const asset of asset_arr) {
        loadSprite(asset, `/shooter/${asset}`).then(() => {
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
    },
  },
  watch: {
    $route(to, from) {
      this.currentRoute = to.name

      if (this.currentRoute == "vidja-game") {
        this.screensaverMode(false)
      } else {
        this.screensaverMode(true)
      }
    },
  },
  updated() {},
  beforeDestroy() {},
}
</script>

<style lang="scss">
.shooter-game {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $flair;
  //opacity: 0.9;

  .game-wrap {
    mix-blend-mode: screen;
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    // width: 500px;
    // height: 500px;
    width: 100%;
    height: 100%;
  }

  .ui {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 10%;
    height: 100%;
    z-index: 1;
    transform: translateX(0%);
    transition: 0.25s transform;

    &.hidden {
      transform: translateX(calc(-100% - 10px));
    }

    .score {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      border-bottom: 2px solid black;
    }

    .health {
      margin-bottom: 20px;

      .title {
        margin-bottom: 0.25em;
      }

      .bar {
        position: relative;
        width: 100%;
        height: 30px;
        border: 2px solid black;

        div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          transition: 0.25s width;
        }
      }
    }
  }
}
</style>
