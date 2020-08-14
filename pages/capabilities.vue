<template>
  <div>
    <div id="matter-js">
      
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

// export default {
//   apollo: { 
//     page: {
//       query: gql`
//       `,
//     }
//   }
// }
export default {
  data: function() {
    return {
      wordsArr1: [
        'HTML/CSS',
        'Javascript',
        'jQuery',
        'Javascript Frameworks',
        'Front End Frameworks',
        'CSS Preprocessors',
        'RESTful Services / APIs',
        'Responsive / Mobile Design',
        'Cross-Browser Development',
        'Content Management Systems',
        'Testing / Debugging',
        'Git / Version Control',
        'Problem Solving',
        'Being Smart'
      ],
      wordsArr2: ["Shoulder", "turducken", "fatback", "pork", "loin", "bresaola", "pastrami", "ball", "tip.", "Cupim", "shank", "ribeye", "turkey", "capicola", "buffalo", "chislic", "drumstick", "andouille", "doner", "pig", "porchetta", "spare", "ribs", "fatback.", "Jerky", "tongue", "ball", "tip", "kevin", "pancetta", "tri-tip", "jowl", "beef", "ribs", "pork", "shoulder", "salami", "meatloaf", "short", "loin.", "Ground", "round", "t-bone", "chislic", "shankle", "tenderloin", "short", "ribs", "capicola", "prosciutto", "frankfurter", "pork", "loin."],
      wordsArr3: ["Lorizzle", "ipsum", "hizzle", "amizzle,", "consectetuer", "adipiscing", "tellivizzle.", "Nullam", "sapizzle", "velizzle,", "yippiyo", "volutpizzle,", "da", "bomb", "boom", "shackalack,", "fo", "shizzle", "vel,", "arcu.", "Pellentesque", "fizzle", "tortizzle.", "Check", "out", "this", "erizzle.", "Fo", "shizzle", "izzle", "for", "sure", "dapibizzle", "turpis", "tempus", "yippiyo.", "Maurizzle", "pellentesque", "nibh", "et", "turpizzle.", "Uhuh", "...", "yih!", "hizzle", "i", "saw", "beyonces", "tizzles", "and", "my", "pizzle", "went", "crizzle.", "Pellentesque", "cool", "rhoncizzle", "hizzle.", "In", "pot", "habitasse", "platea", "dictumst.", "Cool", "dapibus.", "Curabitizzle", "sheezy", "the", "bizzle,", "pretium", "eu,", "mattis", "fo", "shizzle,", "eleifend", "vitae,", "pot.", "I'm", "in", "the", "shizzle", "suscipizzle.", "Integizzle", "shut", "the", "shizzle", "up", "ass", "sizzle", "crackalackin."],
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
    }
  },
  mounted() {
    if (process.client) {

      // force fonts to load before rendering canvas
      document.fonts.load('20px "ITC Garamond"').then(()=> {
        
        let width = window.innerWidth
        let height = window.innerHeight - 55

        // create an engine
        let engine = Engine.create()

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
        let render = Render.create({
            element: document.querySelector("#matter-js"),
            engine: engine,
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

        // generate words
        let yPos = -50;
        for (let i = 0; i < this.wordsArr1.length; i ++) {
          let randomFontSize = Math.random() * (75 - 30) + 30; 
          let wordImage = this.createWordImage( this.wordsArr1[i], randomFontSize );
          let randomXPos = Math.random() * ((width - wordImage.width) - wordImage.width) + wordImage.width;
          let randomRotation = Math.random() * (45 - -45) + -45; 
          let word =      Bodies.rectangle(randomXPos, yPos, wordImage.width, wordImage.height, { render: { sprite: { texture: wordImage.image } } })
          Body.rotate(word, Math.PI/randomRotation)
          yPos -= 200
          bodiesArr.push(word)
        }

        let bodiesArr2 = []
        setTimeout(()=> {
          yPos = -50;
          for (let i = 0; i < this.wordsArr2.length; i ++) {
            let randomFontSize = Math.random() * (50 - 20) + 20; 
            let wordImage = this.createWordImage( this.wordsArr2[i], randomFontSize );
            let randomXPos = Math.random() * ((width - wordImage.width) - wordImage.width) + wordImage.width;
            let randomRotation = Math.random() * (45 - -45) + -45; 
            let word =      Bodies.rectangle(randomXPos, yPos, wordImage.width, wordImage.height, { render: { sprite: { texture: wordImage.image } } })
            Body.rotate(word, Math.PI/randomRotation)
            yPos -= 200
            bodiesArr2.push(word)
          }
          World.add(engine.world, bodiesArr2)
        }, 6000)

        let bodiesArr3 = []
        setTimeout(()=> {
          yPos = -50;
          for (let i = 0; i < this.wordsArr3.length; i ++) {
            let randomFontSize = Math.random() * (30 - 10) + 10; 
            let wordImage = this.createWordImage( this.wordsArr3[i], randomFontSize );
            let randomXPos = Math.random() * ((width - wordImage.width) - wordImage.width) + wordImage.width;
            let randomRotation = Math.random() * (45 - -45) + -45; 
            let word =      Bodies.rectangle(randomXPos, yPos, wordImage.width, wordImage.height, { render: { sprite: { texture: wordImage.image } } })
            Body.rotate(word, Math.PI/randomRotation)
            yPos -= 200
            bodiesArr3.push(word)
          }
          World.add(engine.world, bodiesArr3)
        }, 12000)

        // Final word
        setTimeout(()=> {
          let wordImage = this.createWordImage( 'devgru', 250 );
          let word =      Bodies.rectangle(width / 2, -300, wordImage.width, wordImage.height, { render: { sprite: { texture: wordImage.image } } })
          World.add(engine.world, [word])
        }, 12000)

        bodiesArr.push(ground, wallLeft, wallRight);

        // add all of the bodies to the world
        World.add(engine.world, bodiesArr)

        // add mouse control
        let mouse = Mouse.create(render.canvas),
          mouseConstraint = MouseConstraint.create(engine, {
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

        World.add(engine.world, mouseConstraint)
        engine.world.gravity.scale = 0.0005

        // keep the mouse in sync with rendering
        render.mouse = mouse

        // run the engine
        Engine.run(engine)

        // run the renderer
        Render.run(render)
      });
    }
  }
}
</script>



<style lang="scss">
#matter-js {
  canvas {
    
  }
}
</style>