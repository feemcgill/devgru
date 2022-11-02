<template>
  <div class="portfolio-page">
    <div class="header">
      <h1>featured projects</h1>
    </div>

    <div class="portfolio-wrap">
      <div class="bg"></div>

      <div v-for="project in portfolios.edges" v-bind:key="project.id">
        <nuxt-link :to="project.node.uri" class="project">
          <div class="card-top">
            <div
              v-if="
                project.node.PortfolioFields.year ||
                project.node.PortfolioFields.years
              "
              class="stats"
              v-html="
                project.node.PortfolioFields.years ||
                project.node.PortfolioFields.year
              "
            ></div>

            <h4 v-html="project.node.title">
              <div
                v-if="project.node.PortfolioFields.url"
                class="stats"
                v-html="project.node.PortfolioFields.url"
              ></div>
            </h4>

            <div
              v-if="project.node.PortfolioFields.description"
              class="stats"
              v-html="project.node.PortfolioFields.description"
            ></div>
          </div>
          <FadeImage
            v-if="project.node.featuredImage"
            :src="project.node.featuredImage.node.sourceUrl"
            :alt="project.node.title"
            :width="project.node.featuredImage.node.mediaDetails.width"
            :height="project.node.featuredImage.node.mediaDetails.height"
          />

          <div
            v-if="project.node.PortfolioFields.projectStats"
            class="stats"
            v-html="project.node.PortfolioFields.projectStats"
          ></div>
        </nuxt-link>
      </div>
    </div>

    <div v-if="$route.params.slug">
      <NuxtChild :key="$route.params.slug" />
    </div>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request"
import FadeImage from "~/components/FadeImage"
const gql_content = `
  edges {
    node {
      id
      slug
      title
      uri
      PortfolioFields {
        projectIntro
        projectStats
        description
        year
        years
        url
      }
      featuredImage {
        node {
          sourceUrl(size: LARGE)
          srcSet
          mediaDetails {
            height
            width
          }                        
        }
      }
    }
  }
`
export default {
  components: {
    FadeImage,
  },
  data: () => {
    return {
      debug: false,
    }
  },

  transition(to, from) {
    console.log(to, from, "WHAT IS IT")
    if (!from) {
      console.log("NOT FROM")
      return "page"
    }
    console.log("can we trans?")
    return "page"
  },
  async asyncData({ $graphql, route }) {
    const query = gql`
      query MyQuery {
        portfolios(first: 1000)  {
          ${gql_content} 
        }
      }
    `
    let { portfolios } = await $graphql.default.request(query)

    return { portfolios }
  },
}
</script>

<style lang="scss" scoped>
.portfolio-page {
  //mix-blend-mode: screen;
  //background-color: white;
}
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
    color: $flair;
    letter-spacing: -0.02em;
  }
}

.portfolio-wrap {
  width: 40%;
  margin: 0 10%;
  padding: 2.5vw;
  background-color: lighten($flair, 10%);
  position: relative;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: $white;
    background-image: url("~assets/patterns/cross-1.png");
    background-attachment: fixed;
    mix-blend-mode: screen;
    z-index: 1;
  }

  .project {
    margin-bottom: 7rem;
    display: block;
    position: relative;
    z-index: 100;
    text-decoration: none;
    isolation: isolate;
    h4 {
      font-size: 3rem;
      background: $white;
      color: $flair;
    }
    img {
      width: 100%;
      height: auto;
      display: block;
      position: relative;
      z-index: 1000;
      border: 5px solid $flair;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
      margin-top: -5px;
    }
    .card-top {
      border: 5px solid $flair;
      padding: 10px;
      background: $white;
      color: $flair;
      width: 80%;
      margin-left: 10%;
    }
    .stats {
      text-decoration: none;
      display: block;
      font-size: 0.8em;
    }
  }
}
</style>
