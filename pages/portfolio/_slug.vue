<template>
    <article>
      <section class="primary">
        <img :src="portfolioBy.featuredImage.sourceUrl" />
        <div class="project-info">
          <h2>{{portfolioBy.title}}</h2>
          <div v-html="portfolioBy.PortfolioFields.projectIntro" />
        </div>
      </section>
      <section class="stats" v-html="portfolioBy.PortfolioFields.projectStats" ></section>  
      <!-- <section v-html="portfolioBy.PortfolioFields.projectCaseStudy" ></section>   -->

    </article>
</template>

<script>
import gql from 'graphql-tag'

export default {
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
section {
  background-color: #ffad62;
  border: 20px solid #FF8200;
  h2 {
    background-color: #ff734d;
    color: white;
    padding: 20px;
  }
}
.primary {
  display: flex;
  .project-info {
    margin-left: -100px;
    background: white;
  }
}
</style>
