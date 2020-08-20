<template>
  <div v-if="!$apollo.loading && page">
    <!-- <span class="shadow" v-html="page.CapabilitiesFields.wordGroup1"></span> -->
    <div id="capabilities-matter-js">
      
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
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
} from 'matter-js'
import decomp from 'poly-decomp'

export default {
  data: function() {
    return {
      resetMatterDelayTimer: null,
      engine: null,
      render: null,
    };
  },
  computed: {
    
  },
  methods: {
    createWordImage($string, randomFontSize) {
      let drawing = document.createElement("canvas");
      drawing.width = '500'
      drawing.height = '100'

      let ctx = drawing.getContext("2d");

      // draw text first to then get text measurements
      ctx.fillStyle = "#000";
      ctx.font = randomFontSize + 'px "ITC Garamond"';
      ctx.textAlign = "center";
      ctx.fillText($string, 75, 30);

      const metrics = ctx.measureText($string);
      // console.log(metrics)

      // resize canvas to text measurements
      drawing.width = metrics.width
      drawing.height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

      // clear canvas
      ctx.clearRect(0, 0, drawing.width, drawing.height);

      // re-draw text 
      ctx.fillStyle = "#000";
      ctx.font = randomFontSize + 'px "ITC Garamond"';
      ctx.textAlign = "center";
      ctx.fillText($string, metrics.width / 2, metrics.actualBoundingBoxAscent)

      // return image object
      let imgObj = {
        image: drawing.toDataURL("image/png"),
        width: metrics.width,
        height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      }

      return imgObj
    },
    shuffleArr(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    onResize(e) {
      clearTimeout(this.resetMatterDelayTimer)
      this.resetMatterDelayTimer = setTimeout( (e) => {
        this.destroyMatterJS()
        this.setupMatterJS()
      }, 500)
    },
    setupMatterJS() {
      let width = window.innerWidth
      let height = window.innerHeight

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
          element: document.querySelector("#capabilities-matter-js"),
          engine: this.engine,
          options: renderOptions
      })

      // create bodies
      let bodiesArr = [];
      let wallThickness = 1000
      let wallLength = 10000
      // let boxA =        Bodies.rectangle(400, 200, 80, 80)
      // let boxB =        Bodies.rectangle(450, 50, 180, 80)
      let ceiling =     Bodies.rectangle(width / 2, -wallThickness, width, wallThickness, { isStatic: true })
      let ground =      Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true })
      let wallLeft =    Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, wallLength, { isStatic: true })
      let wallRight =   Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, wallLength, { isStatic: true })
      bodiesArr.push(ground, wallLeft, wallRight);

      // generate words
      let yPos = -50;
      let wordsArr1 = this.page.CapabilitiesFields.wordGroup1.split(',')
      wordsArr1 = this.shuffleArr(wordsArr1)
      for (let i = 0; i < wordsArr1.length; i ++) {
        let randomFontSize = Math.random() * (75 - 30) + 30; 
        let wordImage = this.createWordImage( wordsArr1[i], randomFontSize );
        let randomXPos = Math.random() * ((width - wordImage.width) - wordImage.width) + wordImage.width;
        let randomRotation = Math.random() * (45 - -45) + -45; 
        let word =      Bodies.rectangle(randomXPos, yPos, wordImage.width, wordImage.height, { render: { sprite: { texture: wordImage.image } } })
        Body.rotate(word, Math.PI/randomRotation)
        yPos -= 200
        bodiesArr.push(word)
      }
      
      // add all of the bodies to the world
      World.add(this.engine.world, bodiesArr)

      let bodiesArr2 = []
      let wordsArr2 = this.page.CapabilitiesFields.wordGroup2.split(',')
      setTimeout(()=> {
        yPos = -50;
        for (let i = 0; i < wordsArr2.length; i ++) {
          let randomFontSize = Math.random() * (50 - 20) + 20; 
          let wordImage = this.createWordImage( wordsArr2[i], randomFontSize );
          let randomXPos = Math.random() * ((width - wordImage.width) - wordImage.width) + wordImage.width;
          let randomRotation = Math.random() * (45 - -45) + -45; 
          let word =      Bodies.rectangle(randomXPos, yPos, wordImage.width, wordImage.height, { render: { sprite: { texture: wordImage.image } } })
          Body.rotate(word, Math.PI/randomRotation)
          yPos -= 200
          bodiesArr2.push(word)
        }
        World.add(this.engine.world, bodiesArr2)
      }, this.page.CapabilitiesFields.delayBeforeWordGroup2 * 1000)

      let bodiesArr3 = []
      let wordsArr3 = this.page.CapabilitiesFields.wordGroup3.split(',')
      setTimeout(()=> {
        yPos = -50;
        for (let i = 0; i < wordsArr3.length; i ++) {
          let randomFontSize = Math.random() * (30 - 10) + 10; 
          let wordImage = this.createWordImage( wordsArr3[i], randomFontSize );
          let randomXPos = Math.random() * ((width - wordImage.width) - wordImage.width) + wordImage.width;
          let randomRotation = Math.random() * (45 - -45) + -45; 
          let word =      Bodies.rectangle(randomXPos, yPos, wordImage.width, wordImage.height, { render: { sprite: { texture: wordImage.image } } })
          Body.rotate(word, Math.PI/randomRotation)
          yPos -= 200
          bodiesArr3.push(word)
        }
        World.add(this.engine.world, bodiesArr3)
      }, this.page.CapabilitiesFields.delayBeforeWordGroup3 * 1000)

      // Final word
      setTimeout(()=> {
        let wordImage = this.createWordImage( this.page.CapabilitiesFields.bigWord, width / 6 );
        let word =      Bodies.rectangle(width / 2, -300, wordImage.width, wordImage.height, { render: { sprite: { texture: wordImage.image } } })
        World.add(this.engine.world, [word])
      }, this.page.CapabilitiesFields.delayBeforeBigWord * 1000)


      // add mouse control
      let mouse = Mouse.create(this.render.canvas),
        mouseConstraint = MouseConstraint.create(this.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

      // re-enable mouse scrolling
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel)
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel)

      World.add(this.engine.world, mouseConstraint)
      // engine.world.gravity.scale = 0.0005

      // keep the mouse in sync with rendering
      this.render.mouse = mouse

      // run the engine
      Engine.run(this.engine)

      // run the renderer
      Render.run(this.render)
    },
    destroyMatterJS() {
      if (this.engine != null) {
        World.clear(this.engine.world);
        Engine.clear(this.engine);
        Render.stop(this.render);
        this.render.canvas.remove();
        this.render.canvas = null;
        this.render.context = null;
        this.render.textures = {};
      }
    }
  },
  mounted() {
    console.log('capabilities: MOUNTED')
    if (process.client) {

      // remove scrollbars
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'

      // add resize listeners
      window.addEventListener('resize', this.onResize)

      // force fonts to load before rendering canvas
      document.fonts.load('20px "ITC Garamond"').then(()=> {
        
        if (this.page) {
          this.setupMatterJS()
        }
        
      });
    }
  },
  updated() {
    console.log('capabilities: UPDATED')
      // force fonts to load before rendering canvas
      document.fonts.load('20px "ITC Garamond"').then(()=> {
        
        if (this.page) {
          this.destroyMatterJS()
          this.setupMatterJS()
        }
        
      });
  },
  beforeDestroy() {
    this.destroyMatterJS()
    document.getElementsByTagName('body')[0].style.overflow = 'initial'
  },
  apollo: { 
    page: {
      error: function(error) {
        console.log(error)
      },
      query: gql`
        query CapabilitiesQuery {
          page(id: "100", idType: DATABASE_ID) {
            title                 
            CapabilitiesFields {
              wordGroup1
              wordGroup2
              wordGroup3
              delayBeforeWordGroup3
              delayBeforeWordGroup2
              delayBeforeBigWord
              bigWord
            }
          }
        } 
      `,
    }
  }
}
</script>



<style lang="scss">
#capabilities-matter-js {

  canvas {
    width: 100vw;
    height: 100vh;
  }  
}


</style>