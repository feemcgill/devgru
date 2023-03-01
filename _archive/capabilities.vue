<template>
  <div v-if="page">

    <div class="skill-window">

      <h2 class="title"></h2>

      <div class="content"></div>

    </div>

    <div id="capabilities-matter-js"> </div>

  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request"

const gql_content = `
  title
  CapabilitiesFields {
    skillList1 {
      ... on Skill {
        content
        title
      }
    }
    delayBeforeSkillList2
    skillList2 {
      ... on Skill {
        content
        title
      }
    }
    delayBeforeSkillList3
    skillList3 {
      ... on Skill {
        content
        title
      }
    }
    delayBeforeBigWord
    bigWord
  }
`
import {
  Engine,
  Render,
  World,
  Bodies,
  Body,
  Events,
  Composite,
  Composites,
  Constraint,
  Vertices,
  Mouse,
  MouseConstraint,
  Query,
  Common
} from "matter-js"
import decomp from "poly-decomp"

export default {
  data: function () {
    return {
      skillWindow: null,
      matterJSContainer: null,
      resetMatterDelayTimer: null,
      engine: null,
      render: null
    }
  },
  computed: {},
  methods: {
    createWordImage($string, randomFontSize) {
      let drawing = document.createElement("canvas")
      drawing.width = "500"
      drawing.height = "100"

      let ctx = drawing.getContext("2d")

      // draw text first to then get text measurements
      ctx.fillStyle = "#000"
      ctx.font = randomFontSize + 'px "ITC Garamond"'
      ctx.textAlign = "center"
      ctx.fillText($string, 75, 30)

      const metrics = ctx.measureText($string)
      // console.log(metrics)

      // resize canvas to text measurements
      drawing.width = metrics.width
      drawing.height =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

      // clear canvas
      ctx.clearRect(0, 0, drawing.width, drawing.height)

      // re-draw text
      ctx.fillStyle = "#000"
      ctx.font = randomFontSize + 'px "ITC Garamond"'
      ctx.textAlign = "center"
      ctx.fillText($string, metrics.width / 2, metrics.actualBoundingBoxAscent)

      // return image object
      let imgObj = {
        image: drawing.toDataURL("image/png"),
        width: metrics.width,
        height:
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      }

      return imgObj
    },
    shuffleArr(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
          ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },
    onResize(e) {
      clearTimeout(this.resetMatterDelayTimer)
      this.resetMatterDelayTimer = setTimeout(e => {
        this.destroyMatterJS()
        this.setupMatterJS()
      }, 500)
    },
    explosion() {
      let bodies = Composite.allBodies(this.engine.world)

      for (let i = 0; i < bodies.length; i++) {
        let body = bodies[i]

        if (!body.isStatic) {
          let forceMagnitude = 0.02 * body.mass

          Body.applyForce(body, body.position, {
            x:
              (forceMagnitude + Common.random() * forceMagnitude) *
              Common.choose([1, -1]),
            y: -forceMagnitude + Common.random() * -forceMagnitude
          })
        }
      }
    },
    setupMatterJS() {
      let width = window.innerWidth
      let height = window.innerHeight

      this.matterJSContainer = document.querySelector("#capabilities-matter-js")

      // create an engine
      this.engine = Engine.create()

      let renderOptions = {
        width,
        height,
        wireframes: false,
        wireframeBackground: "transparent",
        // background: "transparent",
        background: "#ffff99",
        showSleeping: true,
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showSeparations: false,
        showAxes: false,
        showAngleIndicator: false,
        showIds: false,
        showShadows: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false
      }

      // create a renderer
      this.render = Render.create({
        element: this.matterJSContainer,
        engine: this.engine,
        options: renderOptions
      })

      // create bodies
      let boundariesArr = []
      let wallThickness = 1000
      let wallLength = 10000
      let ceiling = Bodies.rectangle(
        width / 2,
        -wallThickness,
        width,
        wallThickness,
        { isStatic: true }
      )
      let ground = Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width,
        wallThickness,
        { isStatic: true }
      )
      let wallLeft = Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        wallLength,
        { isStatic: true }
      )
      let wallRight = Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        wallLength,
        { isStatic: true }
      )

      let bomb = Bodies.rectangle(450, 50, 70, 54, {
        render: {
          sprite: {
            texture: require("~/assets/graphix/bomb.svg")
          }
        }
      })

      boundariesArr.push(ground, wallLeft, wallRight, bomb)
      // add all of the boundaries to the world
      World.add(this.engine.world, boundariesArr)

      // generate words
      this.rainWords(this.page.CapabilitiesFields.skillList1, [75, 30])

      setTimeout(() => {
        this.rainWords(this.page.CapabilitiesFields.skillList2, [50, 20])
      }, this.page.CapabilitiesFields.delayBeforeSkillList2 * 1000)

      setTimeout(() => {
        this.rainWords(this.page.CapabilitiesFields.skillList3, [30, 20])
      }, this.page.CapabilitiesFields.delayBeforeSkillList3 * 1000)

      // Final word
      setTimeout(() => {
        let wordImage = this.createWordImage(
          this.page.CapabilitiesFields.bigWord,
          width / 6
        )
        let word = Bodies.rectangle(
          width / 2,
          -300,
          wordImage.width,
          wordImage.height,
          { render: { sprite: { texture: wordImage.image } } }
        )
        let randomRotation = Math.random() * (45 - -45) + -45
        Body.rotate(word, Math.PI / randomRotation)
        World.add(this.engine.world, [word])
      }, this.page.CapabilitiesFields.delayBeforeBigWord * 1000)

      // gravity
      this.engine.world.gravity.y = 0.3

      // setInterval(()=>{
      //   this.explosion()
      // },5000)

      // add mouse control
      let mouse = Mouse.create(this.render.canvas),
        mouseConstraint = MouseConstraint.create(this.engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.01, // low setting causes mouse drag to have elasticity
            render: {
              visible: false
            }
          }
        })

      // re-enable mouse scrolling
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel)
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel)

      // mouse events
      Events.on(mouseConstraint, "mousemove", event => {
        let bodies = this.engine.world.bodies
        let foundPhysics = Query.point(bodies, event.mouse.position)
        if (foundPhysics[0] != undefined) {
          this.matterJSContainer.classList.add("cursor-pointer")
        } else {
          this.matterJSContainer.classList.remove("cursor-pointer")
        }
      })

      Events.on(mouseConstraint, "mousedown", event => {
        let bodies = this.engine.world.bodies
        let foundPhysics = Query.point(bodies, event.mouse.position)
        //Your custom code here
        if (foundPhysics[0] != undefined && foundPhysics[0].windowContent) {
          this.showSkillWindow(foundPhysics[0].windowContent)
        } else {
          this.explosion()
          this.hideSkillWindow()
        }
      })

      World.add(this.engine.world, mouseConstraint)
      // engine.world.gravity.scale = 0.0005

      // keep the mouse in sync with rendering
      this.render.mouse = mouse

      // run the engine
      Engine.run(this.engine)

      // run the renderer
      Render.run(this.render)
    },
    setupSkillWindow() {
      console.log("setupSkillWindow")
      this.skillWindow = document.querySelector(".skill-window")
      this.skillWindow.addEventListener("click", e => {
        this.skillWindow.classList.remove("show")
      })
    },
    showSkillWindow(info) {
      console.log(this.skillWindow)
      let titleEl = this.skillWindow.querySelector(".title")
      let contentEl = this.skillWindow.querySelector(".content")

      titleEl.innerHTML = info[0]
      contentEl.innerHTML = info[1]

      this.skillWindow.classList.add("show")
    },
    hideSkillWindow() {
      this.skillWindow.classList.remove("show")
    },
    rainWords(wordsArr, sizeRangeArr) {
      let width = window.innerWidth
      let height = window.innerHeight
      let yPos = -50
      let bodiesArr = []
      wordsArr = this.shuffleArr(wordsArr)
      for (let i = 0; i < wordsArr.length; i++) {
        let randomFontSize =
          Math.random() * (sizeRangeArr[0] - sizeRangeArr[1]) + sizeRangeArr[1]
        let skillTitle = wordsArr[i].title
        let skillContent = wordsArr[i].content
        let wordImage = this.createWordImage(skillTitle, randomFontSize)
        let randomXPos =
          Math.random() * (width - wordImage.width - wordImage.width) +
          wordImage.width
        let randomRotation = Math.random() * (45 - -45) + -45
        let word = Bodies.rectangle(
          randomXPos,
          yPos,
          wordImage.width,
          wordImage.height,
          {
            render: {
              sprite: {
                texture: wordImage.image
              }
            },
            windowContent: [skillTitle, skillContent]
          }
        )
        Body.rotate(word, Math.PI / randomRotation)
        yPos -= 200
        bodiesArr.push(word)
      }

      // add all of the bodies to the world
      World.add(this.engine.world, bodiesArr)
    },
    destroyMatterJS() {
      if (this.engine != null) {
        World.clear(this.engine.world)
        Engine.clear(this.engine)
        Render.stop(this.render)
        this.render.canvas.remove()
        this.render.canvas = null
        this.render.context = null
        this.render.textures = {}
      }
    }
  },
  mounted() {
    console.log("capabilities: MOUNTED")
    if (process.client) {
      // remove scrollbars
      document.getElementsByTagName("body")[0].style.overflow = "hidden"

      // add resize listeners
      window.addEventListener("resize", this.onResize)

      // force fonts to load before rendering canvas
      document.fonts.load('20px "ITC Garamond"').then(() => {
        if (this.page) {
          this.setupMatterJS()
          this.setupSkillWindow()
        }
      })
    }
  },
  updated() {
    console.log("capabilities: UPDATED")
    // force fonts to load before rendering canvas
    document.fonts.load('20px "ITC Garamond"').then(() => {
      if (this.page) {
        this.destroyMatterJS()
        this.setupMatterJS()
        this.setupSkillWindow()
      }
    })
  },
  beforeDestroy() {
    this.destroyMatterJS()
    document.getElementsByTagName("body")[0].style.overflow = "initial"
  },

  async asyncData({ $graphql, route }) {
    const query = gql`
      query MyQuery {
        page(id: "100", idType: DATABASE_ID) {
          ${gql_content}
          isPreview
          preview {
            node {
              ${gql_content}
            }
          }  
        }
      }
    `
    let { page } = await $graphql.default.request(query)
    if (route.query && route.query.preview && page.preview) {
      page = page.preview.node
    }
    return { page }
  }
}
</script>

<style lang="scss">
.skill-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background-color: var(--white);
  border: 10px solid var(--flair);
  border-top-width: 20px;
  padding: 30px 20px;
  transition: 0.5s transform;

  &.show {
    transform: translate(-50%, -50%) scale(1);
  }

  .title {}

  .content {}
}

#capabilities-matter-js {
  &.cursor-pointer {
    cursor: pointer;
  }

  canvas {
    width: 100vw;
    height: 100vh;
  }
}
</style>

