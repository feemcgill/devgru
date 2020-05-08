<template>
  <site-loading v-if="$apollo.loading" />
  <div v-else>
    <div v-for="project in portfolios.edges" v-bind:key="project.id">
      <nuxt-link :to="project.node.uri" ><h4 v-html="project.node.title" /></nuxt-link>
      {{project.node.uri}}
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




