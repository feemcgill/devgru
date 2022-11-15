<template>
  <div class="shooter-game">
    <div class="bg"></div>
    <div class="game-wrap">
      <canvas id="mycanvas" ref="mycanvas"></canvas>
      <div class="dialog_box" v-bind:class="{ visible: start_dialog_visible }">
        <div class="inner">
          <h1>2 much tooling</h1>
          <p>
            Use the arrow keys or WASD to move the keyboard around. Use Spacebar
            to shoot the computer bugs. Shoot the smiley faces to get a health
            boost if you're in trouble!
          </p>
          <div class="button" v-on:click="toggleStartDialog(false)">play</div>
        </div>
      </div>
      <div class="dialog_box" v-bind:class="{ visible: end_dialog_visible }">
        <div class="inner">
          <h1>Game OVER!</h1>
          <p v-if="score == 0">
            Horrible job. You didn't kill ANY computer bugs.
          </p>
          <p v-if="score <= 10 && score > 0">
            Shitty job! You only slaughtered {{ score }} computer bugs!
          </p>
          <p v-if="score > 10">
            Great job! You slaughtered {{ score }} computer bugs!
          </p>
          <div class="button" v-on:click="closeEndDialog">play again</div>
        </div>
      </div>
      <div
        class="ui"
        v-bind:class="{ hidden: this.$store.state.screensaver_mode }"
      >
        <div class="score">
          Score: <span class="number">{{ score }}</span>
        </div>
        <div class="health">
          <div class="title">Health</div>
          <div class="bar">
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
import { mapGetters } from "vuex"

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
      NUM_ENEMIES: 25,
      ENEMY_SPEED: 50,
      enemy_base_speed: 1,
      BULLET_SPEED: 500,
      ENEMY_HEALTH: 4,
      HEAL_RATE: 0.001,
      currentRoute: null,
      start_dialog_visible: false,
      end_dialog_visible: false,
      route_path: this.$nuxt.$route.path,
    }
  },
  computed: {
    ...mapGetters(["screensaverMode"]),
  },
  mounted() {
    this.currentRoute = this.$route.name

    let kaboom_script = document.createElement("script")
    kaboom_script.setAttribute("src", "/js/kaboom_new.js")
    document.head.appendChild(kaboom_script)
    kaboom_script.onload = () => {
      this.initKaboom()
    }
  },
  methods: {
    initKaboom() {
      this.k = kaboom({
        global: true,
        // debug: true,
        clearColor: [1, 1, 1, 1],
        width: document.body.clientWidth,
        height: window.innerHeight - 4,
        // width: 1000,
        // height: 1000,
        canvas: document.querySelector("#mycanvas"),
        background: [255, 255, 255],
        crisp: true,
        // letterbox: true,
        // stretch: true,
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
        this.game_started = true

        layers(["game"], "game")

        // Move Enemies down screen
        action("enemy", (t) => {
          t.move(0, t.speed * 1.5)
          if (t.pos.y - t.height > height()) {
            t.pos.x = rand(0, width())
            t.pos.y = rand(0, -height())
          }

          // rotate enemy as it falls. For some reason with this enabled,
          // enemies disappear from screen too early, sometimes.
          t.angle += t.rotation_speed
        })

        // Spawn enemies
        this.spawnEnemy(this.NUM_ENEMIES)

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
          if (!this.$store.state.screensaver_mode) {
            shake(20)
            // destroy enemy
            destroy(e)
            // spawn new enemy
            this.spawnEnemy(1)
            this.player.hurt(1)

            // GAME OVER
            if (this.player.hp() < 0) {
              this.player.setHP(0)
              this.gameOverAnimation()
            }

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

        keyDown(["left", "a"], () => {
          if (!this.$store.state.screensaver_mode) {
            this.player.move(-this.PLAYER_SPEED, 0)
            if (this.player.pos.x < 0) {
              this.player.pos.x = width()
            }
          }
        })

        keyDown(["right", "d"], () => {
          if (!this.$store.state.screensaver_mode) {
            this.player.move(this.PLAYER_SPEED, 0)
            if (this.player.pos.x > width()) {
              this.player.pos.x = 0
            }
          }
        })

        keyDown(["up", "w"], () => {
          if (!this.$store.state.screensaver_mode) {
            this.player.move(0, -this.PLAYER_SPEED)
            if (this.player.pos.y < 0) {
              this.player.pos.y = height()
            }
          }
        })

        keyDown(["down", "s"], () => {
          if (!this.$store.state.screensaver_mode) {
            this.player.move(0, this.PLAYER_SPEED)
            if (this.player.pos.y > height()) {
              this.player.pos.y = 0
            }
          }
        })

        keyPress("space", () => {
          if (!this.$store.state.screensaver_mode) {
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
          if (e.name == "happyface.svg") {
            this.increaseHealth()
          }
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
          // spawn new enemy
          this.spawnEnemy(1)

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

        this.isScreensaverMode(true)
        if (this.route_path == "/vidja-game") {
          this.$store.commit("setScreensaverMode", false)
          this.resetGame()
          this.toggleStartDialog(true)
        }
      })
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
    isScreensaverMode(bool) {
      if (bool == true) {
        // make player disappear
        let pos = this.player.pos
        gsap.killTweensOf(pos)
        gsap.to(pos, 2, {
          x: width() / 2,
          y: height() + 300,
          onUpdate: () => {
            this.player.pos.x = pos.x
            this.player.pos.y = pos.y
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
      }
      if (
        bool == false &&
        this.start_dialog_visible == false &&
        this.end_dialog_visible == false
      ) {
        // set focus on canvas
        this.$refs.mycanvas.focus()

        // make player appear
        let pos = this.player.pos
        gsap.killTweensOf(pos)
        gsap.to(pos, 1, {
          x: width() / 2,
          y: height() - 100,
          onUpdate: () => {
            this.player.pos.x = pos.x
            this.player.pos.y = pos.y
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
    spawnEnemy(num_enemies) {
      let i = 0
      while (i < num_enemies) {
        i++
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
          pos(rand(0, width()), rand(0, -height())),
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
      }
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
    increaseHealth() {
      if (this.player.hp() + 1 > this.PLAYER_HEALTH) {
        this.player.setHP(this.PLAYER_HEALTH)
      } else {
        this.player.heal(1)
      }
    },
    toggleStartDialog(bool) {
      this.start_dialog_visible = bool
      this.$store.commit("setScreensaverMode", bool)
      this.isScreensaverMode(bool)
    },
    gameOverAnimation() {
      shake(200)
      gsap.delayedCall(1, this.openEndDialog)
    },
    openEndDialog() {
      this.end_dialog_visible = true
      this.$store.commit("setScreensaverMode", true)
    },
    closeEndDialog() {
      this.end_dialog_visible = false
      gsap.delayedCall(1, this.resetGame)
    },
    resetGame() {
      this.$store.commit("setScreensaverMode", false)
      this.isScreensaverMode(false)
      this.current_health = this.PLAYER_HEALTH
      this.player.setHP(this.PLAYER_HEALTH)
      this.score = 0

      // return enemies to original speed
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
    },
  },
  watch: {
    screensaverMode: {
      deep: true,
      handler(bool) {
        console.log("screensaver mode: ", bool)
        this.isScreensaverMode(bool)
      },
    },
    $route(to, from) {
      this.currentRoute = to.name

      if (this.currentRoute == "vidja-game") {
        this.resetGame()
        this.toggleStartDialog(true)
      } else {
        this.$store.commit("setScreensaverMode", true)
        this.start_dialog_visible = false
        this.end_dialog_visible = false
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
  background: $primary_color;
  //opacity: 0.9;

  .game-wrap {
    mix-blend-mode: screen;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  .dialog_box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0;
    background-color: rgba(255, 255, 255, 0.75);
    transition: 1s opacity;
    padding: 20px;

    &.visible {
      pointer-events: all;
      opacity: 1;

      .inner {
        transform: scale(1);
      }
    }

    .inner {
      max-width: 800px;
      border: 2px solid $primary_color;
      padding: 1em;
      background-color: white;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: scale(0);
      transition: 1s transform;

      h1 {
        margin-bottom: 0.5em;
      }

      p {
        line-height: 1.5em;
      }

      .button {
        margin-top: 1.5em;
        font-weight: bold;
        border: 2px solid $primary_color;
        border-radius: 100%;
        padding: 1em;
        cursor: pointer;

        &:hover {
          background-color: $primary_color;
          color: white;
        }
      }
    }
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
