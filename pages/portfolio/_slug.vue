<template>
    <site-loading v-if="$apollo.loading" />

    <article v-else>
      <section :class="'primary '  + state" >
        <div class="img-zone">
          <div class="content">
            <div class="img-bg-bg"></div>
            <div class="img-bg-overlay"></div>
            <ImageCycle v-if="portfolioBy.PortfolioFields.gallery" class="imagecycle" :image-data="portfolioBy.PortfolioFields.gallery" />
            <img v-else class="img-img" :src="portfolioBy.featuredImage.sourceUrl" />

          </div>
          <div class="expand-button">
            <button v-on:click="updateState('visuals')">expand</button>
          </div>
        </div>
        <div class="project-info">
          <h1 class="title">{{portfolioBy.title}}</h1>
          <div class="content-box">
            <div class="stats" v-html="portfolioBy.PortfolioFields.projectStats" />
            <div class="info" v-html="portfolioBy.PortfolioFields.projectIntro" />
          </div>
          <nuxt-link to="/projects">
            <button>All Projects</button>
          </nuxt-link>
        </div>
      </section>
      <!-- <section v-html="portfolioBy.PortfolioFields.projectCaseStudy" ></section>   -->

    </article>
</template>

<script>
import gql from 'graphql-tag'
import ImageCycle from '~/components/ImageCycle'
export default {
  name: 'Portfolio',
  props: {
  },
  components: {
    ImageCycle
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
  apollo: { 
    portfolioBy: {
      query: gql`query ($uri: String) {
        portfolioBy(uri: $uri) {
          id
          title
          content
          featuredImage {
            sourceUrl(size: LARGE)
            srcSet
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
            uri: this.$route.params.slug
        }
      },
    }
  }
}
</script>
<style lang="scss" scoped>

$color-flair: #ff734d;

.primary {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  //border: 20px solid $color-flair;
  .img-zone {
    position: absolute;
    width: calc(100% - 10vw);
    height: calc(100% - 10vw);
    width: 60vw;
    height: 60vh;
    top: 50px;
    right: 50px;
    transition: all 0.5s ease-in-out;
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
      background-image: url('~assets/pattern.jpg');
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
    transition: all 0.5s ease-in-out;
    margin: 0 0 5vh 5vw;
    .content-box {
      background: white;
      display: inline-block;
      color: $color-flair;
      padding: 20px;
      border: 10px solid $color-flair;
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
    /*
    .stats {
      right: 0;
    }
    .info {
      bottom: 0;
    } */
  }
  &.visuals {
    .project-info {
      opacity: 0;
      transform:  rotateX(-163deg) rotateY(-133deg) rotateZ(67deg) translateX(-173px) translateY(200px) translateZ(39px) skewX(97deg) skewY(49deg);
      transform:  rotateX(76deg) skewY(-23deg);
      //transform:  rotateX(99deg) translateY(-200px) skewX(23deg) skewY(1deg);



    }
    .img-zone {
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
    }    
  }
}
</style>
