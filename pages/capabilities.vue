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
    };
  },
  computed: {
    
  },
  methods: {
    createImage($string) {
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
      let height = window.innerHeight

      // create an engine
      let engine = Engine.create()

      let renderOptions = {
        width,
        height,
        wireframes: false,
        wireframeBackground: "transparent",
        background: "transparent",
        //background: "#ffffff99",
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

      // create two boxes and a ground
      let boxA = Bodies.rectangle(400, 200, 80, 80)
      let boxB = Bodies.rectangle(450, 50, 180, 80)
      let ground = Bodies.rectangle(0, height, width, 10, { isStatic: true })

      let word = Bodies.rectangle(350, -50, 150, 50, {
        render: {
            sprite: {
                texture: this.createImage("Mad Skillz!")
            }
        }
      });

      // add all of the bodies to the world
      World.add(engine.world, [boxA, boxB, ground, word])

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