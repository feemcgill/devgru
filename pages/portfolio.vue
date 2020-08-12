<template>
  <div v-if="$apollo.loading" />
  <div v-else>
    <div class="header">
      <h1>featured projects</h1>
    </div>    
    <div class="portfolio-wrap">
      <div class="bg"></div>

      <div v-for="project in portfolios.edges" v-bind:key="project.id">
        <nuxt-link :to="project.node.uri" class="project">
          <h4 v-html="project.node.title" />
          <img :src="project.node.featuredImage.node.sourceUrl" :alt="project.node.title">
          <div class="stats" v-html="project.node.PortfolioFields.projectStats"></div>
        </nuxt-link>
      </div>
    </div>
    <div>
      <NuxtChild :key="$route.params.slug" />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: () => {
    return {
      debug: false
    }
  },

  transition (to, from) {
    console.log(to, from, 'WHAT IS IT')
    if (!from) { 
      console.log('NOT FROM');
      return 'page' 
    }
    console.log('can we trans?');
    return 'page'
  },

  apollo: {
      portfolios: {
          query: gql`
            query GetPortfolios {
              portfolios {
                edges {
                  node {
                    id
                    slug
                    title
                    uri
                    PortfolioFields {
                      projectIntro
                      projectStats
                    }
                    featuredImage {
                      node {
                        sourceUrl(size: LARGE)
                      }
                    }
                  }
                }
              }
            }
        `
      }
  }  
}
</script>

<style lang="scss" scoped>
$color-flair: #ff734d;

.header {
  margin-bottom: 50px;
  z-index: 1;
  position: fixed;
  left: 50%;
  top: 30%;
  text-align: left;
  width: 50%;
  z-index: 1;
  h1 {
    font-size: 13vw;
    line-height: 0.7;
    margin-left: 50px;
    color: $color-flair;
    letter-spacing: -0.02em;
  }
}

.portfolio-wrap {
  width: 40%;
  margin: 0 10%;
  padding: 50px;
  background-color: $color-flair;
  position: relative;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: white;
    background-image: url('~assets/patterns/cross-1.png');
    mix-blend-mode: screen;

    /* background-size: 220px; */
    //filter: contrast(100);
    //mix-blend-mode: screen;
    z-index: 1;
  }

  .project {
    margin-bottom: 7rem;
    display: block;
    position: relative;
    z-index: 100;
    text-decoration: none;
    color: $color-flair;
    h4 {
      font-size: 3rem;
      padding: 10px;
      background: white;
      width: 60%;
      margin-left: 50px;
    }
    img {
      width: 100%;
      height: auto;
      display: block;
    }
    .stats{
      text-decoration: none;
      display: block;
      padding: 10px;
      background: white;
      margin-right: 50px;
      margin-left: 30%;
      font-size: 0.8em;
    }
  }
}
</style>




