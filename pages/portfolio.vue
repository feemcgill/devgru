<template>
  <div v-if="$apollo.loading" />
  <div v-else>
    <div v-for="project in portfolios.edges" v-bind:key="project.id">
      <nuxt-link :to="project.node.uri" ><h4 v-html="project.node.title" /></nuxt-link>
      {{project.node.uri}}
    </div>
    <div>
      <NuxtChild :key="$route.params.slug" />
    </div>
    <div v-if="debug">
      {{portfolios}}
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
                      sourceUrl(size: LARGE)
                    }
                  }
                }
              }
            }`
      }
  }  
}
</script>

<style>
</style>




