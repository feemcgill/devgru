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
        { name: "bomb.svg", options: null },
        { name: "computer.svg", options: null },
        { name: "documents.svg", options: null },
        { name: "folder.svg", options: null },
        { name: "peace.svg", options: null },
        { name: "shout.svg", options: null },
        { name: "star-circle.svg", options: null },
        { name: "thumbs-up.svg", options: null },
        { name: "pencil.svg", options: null },
        { name: "scissors.svg", options: null },
        { name: "telephone.svg", options: null },
        { name: "mailbox.svg", options: null },
        { name: "mouse.svg", options: null },
        { name: "floppydisk.svg", options: null },
        { name: "logo.svg", options: null },
      ],
      assets_player: [
        {
          name: "keyboard-sprite.svg",
          options: {
            sliceX: 4,
            anims: {
              idle: 3,
              shoot: {
                from: 0,
                to: 3,
              },
            },
          },
        },
      ],
      assets_friends: [
        {
          name: "happyface-sprite.svg",
          options: {
            sliceX: 2,
            anims: {
              idle: { from: 0, to: 1, loop: true, speed: 1 },
            },
          },
        },
      ],
      player: null,
      happy_face: null,
      happy_face_directions: ["ltr", "rtl"],
      happy_face_direction: null,
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
        canvas: document.querySelector("#mycanvas"),
        background: [255, 255, 255],
        crisp: true,
      })
      // debug.inspect = true

      /**
      SET FOCUS ON CANVAS!
      */
      this.$refs.mycanvas.focus()

      /**
      LOAD ASSETS!
      */
      this.num_total_assets =
        this.assets_enemies.length +
        this.assets_player.length +
        this.assets_friends.length

      this.loadAssetSet(this.assets_enemies)
      this.loadAssetSet(this.assets_player)
      this.loadAssetSet(this.assets_friends)

      /**
      DEFINE MAIN SCENE!
      */
      scene("main", () => {
        this.game_started = true

        layers(["game"], "game")

        /**
        SPAWN ENEMIES!
        */
        this.spawnEnemy(this.NUM_ENEMIES)

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

        /**
        SPAWN PLAYER!
        */
        this.player = add([
          health(this.PLAYER_HEALTH),
          sprite("keyboard-sprite.svg", { anim: "idle" }),
          area(),
          // color(rgba(0, 0, 0, 1)),
          pos(width() / 2, height() - 100),
          origin("center"),
          "player",
        ])

        /**
        PLAYER COLLISION WITH ENEMY!
        */
        this.player.collides("happyface", (e) => {
          this.handleKillHappyFace(null, e)
        })

        this.player.collides("enemy", (e) => {
          if (!this.$store.state.screensaver_mode) {
            // hurt player
            this.player.hurt(1)
            // shake screen
            shake(20)
            // destroy enemy
            destroy(e)
            // spawn new enemy
            this.spawnEnemy(1)
            // speed up enemies
            this.speedupEnemies()

            // check for GAME OVER
            if (this.player.hp() < 0) {
              this.player.setHP(0)
              this.gameOverAnimation()
            }

            // animate the player getting hurt
            // object of player properties to animate
            var obj = { alpha: 1 }

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

        /**
        SPAWN HApPy fAcE!
        */
        this.happy_face_direction =
          this.happy_face_directions[
            Math.floor(Math.random() * this.happy_face_directions.length)
          ]

        this.happy_face = add([
          sprite("happyface-sprite.svg", { anim: "idle" }),
          area(),
          scale(1),
          rotate(rand(-360, 360)),
          pos(
            this.happy_face_direction == "ltr" ? -100 : width() + 100,
            rand(0, height())
          ),
          origin("center"),
          "happyface",
          {
            name: name,
            speed:
              rand(this.ENEMY_SPEED * 0.5, this.ENEMY_SPEED * 1.5) *
              this.enemy_base_speed,
            rotation_speed: rand(-2, 2),
          },
        ])

        // Move HApPy fAcE down screen
        action("happyface", (t) => {
          if (this.happy_face_direction == "ltr") {
            t.move(t.speed * 1.5, 0)
            if (t.pos.x > width() + 100) {
              t.pos.x = -100
              t.pos.y = rand(0, height())
              this.animateHappyFace()
            }
          }
          if (this.happy_face_direction == "rtl") {
            t.move(-t.speed * 1.5, 0)
            if (t.pos.x < -100) {
              t.pos.x = width() + 100
              t.pos.y = rand(0, height())
              this.animateHappyFace()
            }
          }
          // rotate HApPy fAcE as it falls.
          t.angle += t.rotation_speed
        })

        // Add the horizontal animation to HApPy fAcE
        this.animateHappyFace()

        /**
        KEY STROKES!
        */
        this.initKeystrokes()

        /**
        BULLET MOVEMENTS!
        */
        action("bullet", (b) => {
          b.move(0, -this.BULLET_SPEED)
          // remove the bullet if it's out of the scene for performance
          if (b.pos.y < 0) {
            destroy(b)
          }
        })

        /**
        BULLET COLLISION DETECTION!
        */
        collides("bullet", "happyface", (b, e) => {
          this.handleKillHappyFace(b, e)
        })

        collides("bullet", "enemy", (b, e) => {
          // increase score
          this.score++
          // destroy bullet
          destroy(b)
          // Slow enemy speed
          this.slowdownEnemies()
          // if enemy is logo, kill all
          if (e.name == "logo.svg") {
            this.killAllEnemies()
          } else {
            // kill enemy
            this.killEnemy(e)
          }
        })

        /**
        CHECK IF ON VIDJA GAME ROUTE AND START GAME
        */
        this.isScreensaverMode(true)
        if (this.route_path == "/vidja-game") {
          this.$store.commit("setScreensaverMode", false)
          this.resetGame()
          this.toggleStartDialog(true)
        }

        /**
        GAME TICKER!
        */
        onUpdate(() => {
          // Auto increase player's health
          this.current_health = this.player.hp()

          if (this.player.hp() < this.PLAYER_HEALTH && this.player.hp() > 0) {
            this.player.heal(this.HEAL_RATE)
          }
        })
      })
    },
    loadAssetSet(asset_arr) {
      for (const asset of asset_arr) {
        if (asset.options != null) {
          loadSprite(asset.name, `/shooter/${asset.name}`, asset.options).then(
            () => {
              this.checkAssetsLoaded()
            }
          )
        } else {
          loadSprite(asset.name, `/shooter/${asset.name}`).then(() => {
            this.checkAssetsLoaded()
          })
        }
      }
    },
    checkAssetsLoaded() {
      this.num_assets_loaded++
      if (
        this.num_assets_loaded == this.num_total_assets &&
        this.game_started == false
      ) {
        // start the game
        go("main")
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

        // make happy face disappear
        let hf_obj = { alpha: 1 }
        gsap.to(hf_obj, 0.5, {
          alpha: 0,
          onUpdate: () => {
            this.happy_face.opacity = hf_obj.alpha
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

        // make happy face appear
        let hf_obj = { alpha: 0 }
        gsap.to(hf_obj, 0.5, {
          alpha: 1,
          onUpdate: () => {
            this.happy_face.opacity = hf_obj.alpha
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
        const name = choose(this.assets_enemies.filter((n) => n)).name
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
    initKeystrokes() {
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
          this.player.play("shoot")
        }
      })
    },
    animateHappyFace() {
      // reset happy face direction
      this.happy_face_direction =
        this.happy_face_directions[
          Math.floor(Math.random() * this.happy_face_directions.length)
        ]
      if (this.happy_face_direction == "ltr") {
        this.happy_face.pos.x = -99
      } else {
        this.happy_face.pos.x = width() + 99
      }
      // set random y position of happy face
      this.happy_face.pos.y = rand(0, height())
      // Move HApPy fAcE up and down
      let hf_pos = { y: this.happy_face.pos.y }
      let speed = rand(1, 5)
      gsap.killTweensOf(hf_pos)
      gsap.to(hf_pos, speed, {
        y: hf_pos.y + rand(-100, 100),
        yoyo: true,
        repeat: -1,
        // ease: "steps(12)",
        ease: "none",
        onUpdate: () => {
          this.happy_face.pos.y = hf_pos.y
        },
      })
    },
    handleKillHappyFace(b, e) {
      // destroy bullet
      destroy(b)
      // increase health
      this.increaseHealth()
      // make a copy of happy face, for animation (off the collision detection watcher)
      // object of properties to animate
      var obj = { alpha: 1 }
      const temp_happy_face = add([
        sprite("happyface-sprite.svg"),
        scale(1),
        rotate(e.angle),
        // color(rgba(0, 0, 0, 1)),
        pos(e.pos),
        origin("center"),
      ])
      // animate the copy of killed enemy
      gsap
        .timeline()
        .to(temp_happy_face.scale, 0.1, { x: 1.5, y: 1.5 })
        .to(obj, 0.05, {
          alpha: 0,
          onUpdate: () => {
            temp_happy_face.opacity = obj.alpha
          },
        })
        .to(obj, 0.05, {
          alpha: 1,
          onUpdate: () => {
            temp_happy_face.opacity = obj.alpha
          },
        })
        .to(obj, 0.05, {
          alpha: 0,
          onUpdate: () => {
            temp_happy_face.opacity = obj.alpha
          },
        })
        .to(obj, 0.05, {
          alpha: 1,
          onUpdate: () => {
            temp_happy_face.opacity = obj.alpha
          },
        })
        .to(obj, 0.5, {
          alpha: 0,
          onUpdate: () => {
            temp_happy_face.opacity = obj.alpha
          },
          onComplete: () => {
            destroy(temp_happy_face)
          },
        })
        .to(temp_happy_face.scale, 0.5, { x: 0.75, y: 0.75 }, "-=0.5")

      // move real happy face over to force resetting
      this.animateHappyFace()
    },
    killEnemy(e) {
      // make a copy of killed enemy, for animation (off the collision detection watcher)
      // object of properties to animate
      var obj = { alpha: 1 }
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
    },
    killAllEnemies() {
      every("enemy", (e) => {
        // increase score
        this.score++
        // kill enemy
        this.killEnemy(e)
      })
    },
  },
  watch: {
    screensaverMode: {
      deep: true,
      handler(bool) {
        // console.log("screensaver mode: ", bool)
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
    object-fit: cover;
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
