<template>
  <div class="shooter-game">
    <div class="game-wrap">
      <canvas id="mycanvas" ref="mycanvas" tabIndex="-1"></canvas>
      <transition name="game_dialog_transition">
        <div class="dialog_box" v-if="start_dialog_visible">
          <div class="inner">
            <h1>Video Game</h1>
            <!-- <p>
              The dependency tree has become unruley! The bundlers and
              transpilers are on the fritz and the error logs are cryptic at
              best. We need you to get in there and clean up the buggy code.
            </p> -->
            <p v-if="!mobile">
              Use the arrow keys or WASD to move the player around. Use Spacebar
              to shoot the bugs.
            </p>
            <p v-if="mobile">
              Tap your screen to move the player around and shoot the bugs.
            </p>
            <button
              class="button"
              v-on:click="toggleStartDialog(false)"
              v-on:keyup.enter="toggleStartDialog(false)"
              tabindex="1"
            >
              play
            </button>
          </div>
        </div>
      </transition>
      <transition name="game_dialog_transition">
        <div class="dialog_box" v-if="end_dialog_visible" v-bind:class="{ visible: end_dialog_visible }">
          <div class="inner">
            <h1>Game Over!</h1>
            <p v-if="score == 0">Ooof. You didn't debug anything.</p>
            <p v-if="score <= 10 && score > 0">
              Midgrade work! You slaughtered only {{ score }} bugs! Try again
              and get more!
            </p>
            <p v-if="score > 10">
              Clean code! You slaughtered {{ score }} bugs!
            </p>
            <button
              class="button"
              v-on:click="closeEndDialog"
              v-on:keyup.enter="closeEndDialog"
              tabindex="1"
            >
              play again
            </button>
          </div>
        </div>
      </transition>
      <div class="ui" v-bind:class="{
        hidden:
          this.$store.state.screensaver_mode ||
          start_dialog_visible ||
          end_dialog_visible,
      }">
        <svg width="476" height="59" viewBox="0 0 476 59" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.9731 57.28L35.2087 1.31331H473.466L440.231 57.28H1.9731Z" fill="white" stroke="black"
            stroke-width="2" />
        </svg>

        <div class="inner">
          <div class="score">
            <span class="number">{{ score }}</span>
            <span class="label">Score</span>
          </div>
          <div class="health">
            <div class="bar">
              <!-- <div
                :style="`width: ${(current_health / PLAYER_HEALTH) * 100}%;`"
              ></div> -->
              <div :style="`transform: scaleX(${current_health / PLAYER_HEALTH});`"></div>
            </div>
            <div class="label">Health</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!canvas_loaded" class="game-cloak"></div>
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
      ],
      assets_player: [
        {
          name: "keyboard-sprite.png",
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
          name: "happyface-sprite.png",
          options: {
            sliceX: 6,
            anims: {
              idle: { from: 0, to: 5, loop: true, speed: 10 },
            },
          },
        },
      ],
      player: null,
      happy_face: null,
      happy_face_directions: ["ltr", "rtl"],
      need_happy_face: false,
      happy_face_direction: null,
      health_bar: null,
      score: 0,
      num_assets_loaded: 0,
      num_total_assets: null,
      game_started: false,
      PLAYER_SPEED: 220,
      PLAYER_HEALTH: 5,
      PLAYER_SICK: 3,
      current_health: 5,
      NUM_ENEMIES: 25,
      ENEMY_SPEED: 50,
      enemy_base_speed: 1,
      old_enemy_base_speed: 1,
      BULLET_SPEED: 500,
      ENEMY_HEALTH: 4,
      HEAL_RATE: 0.001,
      currentRoute: null,
      start_dialog_visible: false,
      end_dialog_visible: false,
      route_path: this.$nuxt.$route.path,
      mobile: false,
      enemy_scale: 1,
      ui_visible: false,
      invincible: false,
      canvas_loaded: false,
    }
  },
  computed: {
    ...mapGetters(["screensaverMode"]),
  },
  mounted() {
    this.currentRoute = this.$route.name

    let kaboom_script = document.createElement("script")
    kaboom_script.setAttribute("src", "/js/kaboom.js")
    document.head.appendChild(kaboom_script)
    kaboom_script.onload = () => {
      this.initKaboom()
    }

    // check if mobile
    if (document.body.clientWidth <= 768) {
      this.mobile = true
    }
  },
  methods: {
    initKaboom() {
      this.k = kaboom({
        global: true,
        debug: true,
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
        this.invincible = true
        this.game_started = true

        layers(["game"], "game")

        /**
        SPAWN ENEMIES!
        */
        // first check if mobile, and lower num enemies
        if (width() < 768) {
          this.NUM_ENEMIES = 8
          this.enemy_scale = 0.65
        }

        this.spawnEnemy(this.NUM_ENEMIES)

        // Move Enemies down screen
        onUpdate("enemy", (t) => {
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
          sprite("keyboard-sprite.png", { anim: "idle" }),
          area(),
          scale(this.enemy_scale),
          pos(width() / 2, height() - 100),
          origin("center"),
          "player",
        ])

        /**
        PLAYER COLLISION WITH ENEMY!
        */
        this.player.onCollide("happyface", (e) => {
          this.handleKillHappyFace(null, e)
        })

        this.player.onCollide("enemy", (e) => {
          if (!this.$store.state.screensaver_mode && !this.invincible) {
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

            // check for low health, and spawn a HApPy fAcE!
            this.checkHealthLevel()

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
        SPAWN hApPy fAcE!
        */
        this.spawnHappyFace()

        /**
        KEY STROKES!
        */
        this.initKeystrokes()

        /**
        TOUCH EVENTS!
        */
        this.initTouchEvents()

        /**
        BULLET MOVEMENTS!
        */
        onUpdate("bullet", (b) => {
          b.move(0, -this.BULLET_SPEED)
          // remove the bullet if it's out of the scene for performance
          if (b.pos.y < 0) {
            destroy(b)
          }
        })

        /**
        BULLET COLLISION DETECTION!
        */
        onCollide("bullet", "happyface", (b, e) => {
          this.handleKillHappyFace(b, e)
        })

        onCollide("bullet", "enemy", (b, e) => {
          // increase score
          this.increaseScore()
          // destroy bullet
          destroy(b)
          // Fast enemy speed
          this.speedupEnemies()
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
        if (this.route_path == "/game") {
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

        setTimeout(() => {
          this.canvas_loaded = true
        }, 1000)
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
        if (this.happy_face) {
          let hf_obj = { alpha: 1 }
          gsap.to(hf_obj, 0.5, {
            alpha: 0,
            onUpdate: () => {
              this.happy_face.opacity = hf_obj.alpha
            },
          })
        }

        // slow down enemies
        this.old_enemy_base_speed = this.enemy_base_speed
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
        // make player invincible for a few seconds
        this.activateInvincibility()

        // make happy face appear
        let hf_obj = { alpha: 0 }
        if (this.happy_face) {
          gsap.to(hf_obj, 0.5, {
            alpha: 1,
            onUpdate: () => {
              this.happy_face.opacity = hf_obj.alpha
            },
          })
        }

        // speed enemies back up
        this.enemy_base_speed = this.old_enemy_base_speed
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
    slowdownEnemies(speed = null) {
      this.enemy_base_speed -= 0.2
      if (speed) this.enemy_base_speed = speed
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
        let enemy_speed =
          rand(this.ENEMY_SPEED * 0.5, this.ENEMY_SPEED * 1.5) *
          this.enemy_base_speed

        add([
          sprite(name),
          area(),
          scale(this.enemy_scale),
          rotate(rand(-360, 360)),
          pos(rand(0, width()), rand(0, -height())),
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
    increaseScore() {
      this.score++
    },
    increaseHealth() {
      if (this.player.hp() + 1 > this.PLAYER_HEALTH) {
        this.player.setHP(this.PLAYER_HEALTH)
      } else {
        this.player.heal(1)
      }

      this.checkHealthLevel()
    },
    checkHealthLevel() {
      // check for low health, and spawn a HApPy fAcE!
      if (this.player.hp() < this.PLAYER_SICK) {
        this.need_happy_face = true
      } else {
        this.need_happy_face = false
      }
    },
    toggleStartDialog(bool) {
      this.start_dialog_visible = bool
      this.$store.commit("setScreensaverMode", bool)
      this.isScreensaverMode(bool)

      if (bool == false) {
        this.trackGameEvent("initial play")
      }
    },
    gameOverAnimation() {
      this.invincible = true
      shake(200)
      gsap.delayedCall(1, this.openEndDialog)
    },
    openEndDialog() {
      this.end_dialog_visible = true
      this.$store.commit("setScreensaverMode", true)
      this.trackGameEvent("score: " + this.score)
    },
    closeEndDialog() {
      this.end_dialog_visible = false
      gsap.delayedCall(1, this.resetGame)
      this.trackGameEvent("play again")
    },
    activateInvincibility() {
      this.invincible = true
      let player_obj = { alpha: 1 }
      if (this.player) {
        gsap.to(player_obj, 0.075, {
          alpha: 0.5,
          onUpdate: () => {
            this.player.opacity = player_obj.alpha
          },
          yoyo: true,
          repeat: 51,
          onComplete: () => {
            this.invincible = false
          },
        })
      }
    },
    resetGame() {
      this.$store.commit("setScreensaverMode", false)
      this.isScreensaverMode(false)
      this.current_health = this.PLAYER_HEALTH
      this.player.setHP(this.PLAYER_HEALTH)
      this.score = 0
      this.happy_face.pos.x = -99
      this.need_happy_face = false

      // return enemies to original speed
      this.enemy_base_speed = 1
      this.old_enemy_base_speed = 1
      every("enemy", (e) => {
        let num_obj = { val: e.speed }
        let new_val =
          rand(this.ENEMY_SPEED * 0.5, this.ENEMY_SPEED * 1.5) *
          this.enemy_base_speed
        e.original_speed = new_val

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
      onKeyDown(["left", "a"], () => {
        if (!this.$store.state.screensaver_mode) {
          this.player.move(-this.PLAYER_SPEED, 0)
          if (this.player.pos.x < 0) {
            this.player.pos.x = width()
          }
        }
      })

      onKeyDown(["right", "d"], () => {
        if (!this.$store.state.screensaver_mode) {
          this.player.move(this.PLAYER_SPEED, 0)
          if (this.player.pos.x > width()) {
            this.player.pos.x = 0
          }
        }
      })

      onKeyDown(["up", "w"], () => {
        if (!this.$store.state.screensaver_mode) {
          this.player.move(0, -this.PLAYER_SPEED)
          if (this.player.pos.y < 0) {
            this.player.pos.y = height()
          }
        }
      })

      onKeyDown(["down", "s"], () => {
        if (!this.$store.state.screensaver_mode) {
          this.player.move(0, this.PLAYER_SPEED)
          if (this.player.pos.y > height()) {
            this.player.pos.y = 0
          }
        }
      })

      onKeyPress("space", () => {
        if (!this.$store.state.screensaver_mode) {
          this.spawnBullet(this.player.pos.sub(0, 40))
          this.player.play("shoot")
        }
      })

      // kill canvas focus if Tab button is hit
      onKeyPress("tab", () => {
        this.$refs.mycanvas.blur()
        if (!this.start_dialog_visible || !this.end_dialog_visible) {
          let burg = document.getElementById("burg")
          if (burg) burg.focus()
        }
      })
    },
    initTouchEvents() {
      onTouchStart((e, finger_pos) => {
        // shoot bullet
        this.spawnBullet(this.player.pos.sub(0, 40))
        this.player.play("shoot")
        // move player to touch position
        let pos = this.player.pos
        gsap.killTweensOf(pos)
        gsap.to(pos, 0.5, {
          x: finger_pos.x,
          y: finger_pos.y - this.player.height / 2,
          onUpdate: () => {
            this.player.pos.x = pos.x
            this.player.pos.y = pos.y
          },
        })
      })
      onTouchMove((e, finger_pos) => {
        // move player to touch position
        let pos = this.player.pos
        gsap.killTweensOf(pos)
        gsap.to(pos, 0.5, {
          x: finger_pos.x,
          y: finger_pos.y - this.player.height / 2,
          onUpdate: () => {
            this.player.pos.x = pos.x
            this.player.pos.y = pos.y
          },
        })
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
    spawnHappyFace() {
      this.happy_face_direction =
        this.happy_face_directions[
        Math.floor(Math.random() * this.happy_face_directions.length)
        ]

      this.happy_face = add([
        sprite("happyface-sprite.png", { anim: "idle" }),
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
      onUpdate("happyface", (t) => {
        if (this.need_happy_face) {
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
        }
      })

      // Add the horizontal animation to HApPy fAcE
      this.animateHappyFace()
    },
    handleKillHappyFace(b, e) {
      // destroy bullet
      destroy(b)
      // increase health
      this.increaseHealth()
      // kill all enemies
      this.killAllEnemies()
      // Slow enemy speed
      this.slowdownEnemies(2)
      // make a copy of happy face, for animation (off the collision detection watcher)
      // object of properties to animate
      var obj = { alpha: 1 }
      const temp_happy_face = add([
        sprite("happyface-sprite.png"),
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
        .to(temp_enemy.scale, 0.1, {
          x: this.enemy_scale + 0.5,
          y: this.enemy_scale + 0.5,
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
        this.increaseScore()
        // kill enemy
        this.killEnemy(e)
      })
    },
    trackGameEvent(value) {
      // console.log(value)
      this.$gtag("event", "Game Page Events", {
        event_category: "DevGru Custom",
        event_label: "game events",
        value: value,
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

      if (this.currentRoute == "game") {
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
  beforeDestroy() {
    this.$refs.mycanvas.blur()
  },
}
</script>

<style lang="scss">
body {
  overscroll-behavior: contain;
}

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
    background-color: $white;
    padding: 20px;
    color: $black;
    font-size: 0.8em;

    @include breakpoint(short) {
      overflow: auto;
      justify-content: center;
    }

    p {
      margin-bottom: 1em;
      text-align: left;
    }

    .inner {
      max-width: 800px;
      //border: 2px solid $black;
      padding: 1em;
      background-color: white;
      text-align: left;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: 1s transform;
      margin: auto;

      h1 {
        margin-bottom: 0em;
        font-size: 4em;
        font-size: 13vw;
        line-height: 0.7;
        letter-spacing: -0.02em;
      }

      p {
        line-height: 1.5em;
        max-width: 500px;
        text-align: left;
      }

      .button {
        margin-top: 1.5em;
        font-weight: bold;
        border: 2px solid $black;
        border-radius: 100%;
        padding: 1em 1.5em;
        cursor: pointer;

        &:hover {
          background-color: $black;
          color: white;
        }
      }
    }
  }

  .ui {
    position: absolute;
    top: 10px;
    left: 10px;
    //background: yellow;
    height: 59px;
    overflow: hidden;
    width: 476px;
    z-index: 1;
    transform: translateX(0%);
    transition: 0.25s transform;
    pointer-events: none;
    color: $black;

    @include breakpoint(small) {
      width: 60%;
    }

    &.hidden {
      transform: translateX(calc(-100% - 10px));
    }

    svg {
      position: absolute;
      width: 100%;
    }

    .inner {
      position: relative;
      z-index: 1;
      padding: 0px 50px;

      @include breakpoint(small) {
        padding: 0px 5vw;
      }
    }

    .score {
      position: absolute;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      align-items: center;
      // border-left: 2px solid black;
      height: 58px;
      width: 100px;
      right: 20px;
      padding-bottom: 5px;

      @include breakpoint(small) {
        font-size: 12px;
        border-width: 1px;
        margin-bottom: 10px;
        padding-bottom: 17px;
        width: 60px;
      }

      .number {
        font-size: 1.7em;
        margin-bottom: 0px;

        @include breakpoint(small) {
          font-size: 1em;
        }
      }

      .label {
        text-transform: uppercase;
        font-size: 0.7em;
      }
    }

    .health {
      margin-bottom: 20px;
      height: 58px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-right: 100px;
      padding-bottom: 5px;

      @include breakpoint(small) {
        font-size: 12px;
        border-width: 1px;
        margin-bottom: 10px;
        padding-bottom: 17px;
        padding-right: 65px;
      }

      .label {
        text-transform: uppercase;
        font-size: 0.7em;
      }

      .bar {
        position: relative;
        width: 100%;
        height: 10px;
        border: 2px solid black;
        margin-bottom: 8px;

        @include breakpoint(small) {
          margin-bottom: 5px;
          height: 15px;
          border-width: 1px;
          height: 1vw;
        }

        div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          transition: 0.25s transform;
          -webkit-transform-origin: 0;
        }
      }
    }
  }
}

.game-cloak {
  background: $white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
