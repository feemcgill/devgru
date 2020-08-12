<template>
    <div v-if="$apollo.loading" />




    <article class="single-portfolio" v-else-if="portfolioBy">
      <section :class="'primary '  + state" >
        <div class="img-zone">
          <div class="content">
            <div class="img-bg-bg"></div>
            <div class="img-bg-overlay"></div>
            <ImageCycle v-if="portfolioBy.PortfolioFields.gallery" class="imagecycle" :image-data="portfolioBy.PortfolioFields.gallery" />
            <img v-else class="img-img" :src="portfolioBy.featuredImage.node.sourceUrl" />

          </div>
          <div class="expand-button">
            <button v-on:click="updateState('visuals')">
              <span v-if="state == 'visuals'">contract</span>
              <span v-else>expand</span>
            </button>
          </div>
        </div>
        <div class="project-info">
          <h1 class="title">{{portfolioBy.title}}</h1>
          <div class="content-box">
            <div class="stats" v-html="portfolioBy.PortfolioFields.projectStats" />
            <div class="info" v-html="portfolioBy.PortfolioFields.projectIntro" />
          </div>
        </div>
        <ProjectFooter class="project-footer" />
      </section>
    </article>
</template>

<script>
import gql from 'graphql-tag'
import ImageCycle from '~/components/ImageCycle'
import ProjectFooter from '~/components/ProjectFooter'
export default {
  name: 'Portfolio',
  props: {
  },
  components: {
    ImageCycle,
    ProjectFooter
  },
  data () {
    return {
      state: 'normalcy'
    }
  },
  methods: {
    updateState(newState) {
      console.log(newState)
      if (newState == this.state) {
        this.state = 'normalcy'  
      } else {
        this.state = newState
      }
    }
  },
  transition: 'page',
  // transition (to, from) {
  //   console.log(to, from, 'WHAT IS IT')
  //   if (!from) { 
  //     console.log('NOT FROM');
  //     return 'page' 
  //   }
  //   console.log('LETS BOUNCE');
  //   return 'bounce'
  // },
  apollo: { 
    portfolioBy: {
      query: gql`
        query ($uri: String) {
          portfolioBy(uri: $uri) {
            id
            title
            content
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                srcSet
              }
            }
            PortfolioFields {
              mobileViewImage {
                sourceUrl(size: LARGE)
              }
              projectCaseStudy
              projectStats
              projectIntro
              desktopViewImage {
                sourceUrl(size: LARGE)
                srcSet
              }
              gallery {
                sourceUrl
              }
            }
          }
        }
      `,
      variables() {
        return {
            uri: 'portfolio/' + this.$route.params.slug
        }
      },
    }
  }
}
</script>
<style lang="scss" scoped>

$color-flair: #ff734d;

.primary {
  background: rgba(255,255,255,1);
  border: 5px solid $color-flair;
  position: fixed;
  width: 96vw;
  height: 96vh;
  display: flex;
  align-items: flex-end;
  top: 2vh;
  left: 2vw;
  //border: 20px solid $color-flair;
  z-index: 1000;
  .img-zone {
    position: absolute;
    width: calc(100% - 10vw);
    height: calc(100% - 10vw);
    width: 60vw;
    height: 60vh;
    top: 50px;
    right: 50px;
    transition: all 0.75s ease-in;
    .content {
      .imagecycle,
      > img, 
      > div {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
      }
    }
    .expand-button {
      position: absolute;
      bottom: 20px;
      right: 20px;
      z-index: 500;
      //width: 100%;
    }
    .img-bg-bg {
      z-index: 100;
      background-image: url('~assets/patterns/diag-stripe-top-right.png');
      background-size: 50px;
      mix-blend-mode: lighten;
    }
    .img-bg-overlay {
      /* 
      #ff734d
      #FF8200
      #ffad62
      */      
      z-index: 200;
      background-color: $color-flair;
      mix-blend-mode: lighten;
    }
    .img-img {
      object-fit: contain;
      z-index: 300;
      top: 20px;
      left: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
    }
  }
  .project-info {
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: space-around;
    align-items: flex-start;
    z-index: 200;
    height: 70%;
    transition: all 0.4s ease-in-out 0.3s;
    margin: 0 0 5vh 5vw;
    .content-box {
      background: white;
      display: inline-block;
      color: $color-flair;
      padding: 20px;
      border: 5px solid $color-flair;
      margin: 20px;
      margin-bottom: 100px;
      z-index: 200;
      max-width:40vw;
    
    }
   .title {
      padding-bottom: 12px;
      top: 0;
      margin: 20px;
      color: $color-flair;
      font-size: 12vw;
      letter-spacing: -0.03em;
      line-height: 0.8;
      width: 70%;
    }
    .stats {
      right: 0;
      margin-bottom: 1em;
    }
    .info {
      bottom: 0;
      font-size: 0.8em;
    }
  }
  .project-footer {
    transition: all 0.4s ease-in 0.4s;
  }
  &.visuals {
    .project-info {
      opacity: 0;
      transition: all 0.5s ease-in-out 0.1s;
      transform:  rotateX(-163deg) rotateY(-133deg) rotateZ(67deg) translateX(-173px) translateY(200px) translateZ(39px) skewX(97deg) skewY(49deg);
      transform:  rotateX(76deg) skewY(-23deg);
    }
    .img-zone {
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
    }
    .project-footer {
      opacity: 0;
      transition: all 0.6s ease-out 0.2s;
      transform:  rotateX(99deg) translateY(200px) skewX(3deg) skewY(10deg);
    }  
  }
  
}

</style>
