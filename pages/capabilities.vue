<template>
  <div id="matter-js">
    
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
      skillsArr: [
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
      ]
    };
  },
  computed: {
    
  },
  methods: {
    createWordImage($string) {
      let drawing = document.createElement("canvas");
      drawing.width = '150'
      drawing.height = '50'

      let ctx = drawing.getContext("2d");
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, 150, 50);
      ctx.beginPath();
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "20pt sans-serif";
      ctx.textAlign = "center";
      ctx.fillText($string, 75, 30);

      return drawing.toDataURL("image/png");
    }
  },
  mounted() {
    if (process.client) {
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
      let wallThickness = 20;
      // let boxA =        Bodies.rectangle(400, 200, 80, 80)
      // let boxB =        Bodies.rectangle(450, 50, 180, 80)
      let ceiling =     Bodies.rectangle(width / 2, -wallThickness, width, wallThickness, { isStatic: true })
      let ground =      Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true })
      let wallLeft =    Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true })
      let wallRight =   Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true })
      let word =        Bodies.rectangle(350, 50, 150, 50, { render: { sprite: { texture: this.createWordImage("Mad Skillz!") } } });

      bodiesArr.push(ceiling, ground, wallLeft, wallRight, word);

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
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      World.add(engine.world, mouseConstraint);

      // keep the mouse in sync with rendering
      render.mouse = mouse;

      // run the engine
      Engine.run(engine)

      // run the renderer
      Render.run(render)

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