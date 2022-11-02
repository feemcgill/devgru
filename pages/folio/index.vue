<template>
  <div class="portfolio-page">
    <div class="header">
      <h1>Work</h1>
      <div class="buttons">
        <button class="active" @click="the_filters = []">Show all</button>
        <button
          v-for="year in year_options"
          :key="year"
          v-html="year"
          @click="the_filters.push(year)"
        />

        <div>
          <button
            v-for="friend in friend_options"
            :key="friend.slug"
            v-html="friend.title"
            @click="the_filters.push(friend.slug)"
          />
        </div>

        <div>
          <button
            v-for="cat in cat_options"
            :key="cat.slug"
            v-html="cat.name"
            @click="the_filters.push(cat.slug)"
          />
        </div>
      </div>
    </div>

    <div class="portfolio-wrap">
      <div class="bg"></div>

      <div v-for="project in portfolio" v-bind:key="project.id">
        <div class="project">
          <div class="info-card">
            <h4>
              <span v-html="project.node.title" />
              <a
                v-if="project.node.PortfolioFields.url"
                :href="project.node.PortfolioFields.url"
                target="_blank"
              >
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 323.5 323"
                  style="enable-background: new 0 0 323.5 323"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      d="M14.2,29.4C6.2,29.4,0,35.5,0,43.6v265.2c0,8.1,6.2,14.2,14.2,14.2h265.2c8.1,0,14.2-6.2,14.2-14.2V157.2h-28.4v137.3H28.4
		                  V57.8h137.3V29.4C165.8,29.8,14.2,29.8,14.2,29.4L14.2,29.4z"
                    />
                    <path
                      d="M164.3,178.5L295,48.3v52.6h28.4V0H222.1v28.4h52.6L144.4,158.6L164.3,178.5z"
                    />
                  </g>
                </svg>
              </a>
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
          <div class="info-card bottom">
            <div class="pills">
              <div
                v-if="
                  project.node.PortfolioFields.year ||
                  project.node.PortfolioFields.years
                "
                v-html="
                  project.node.PortfolioFields.years ||
                  project.node.PortfolioFields.year
                "
              ></div>

              <div
                v-for="cat in project.node.categories.nodes"
                :key="cat.slug + project.node.PortfolioFields.title"
                v-html="cat.name"
              />
              <div
                v-for="friend in project.node.PortfolioFields.friends"
                :key="friend.slug + project.node.PortfolioFields.title"
                v-html="'With: ' + friend.title"
              />
            </div>
          </div>

          <!-- <div
            v-if="project.node.PortfolioFields.projectStats"
            class="stats"
            v-html="project.node.PortfolioFields.projectStats"
          ></div> -->
        </div>
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
        friends {
          __typename
          ... on Friend {
            title
            slug
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
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
      the_filters: [],
      year_options: [],
      friend_options: [],
      cat_options: [],
    }
  },
  computed: {
    portfolio_raw() {
      const output = []
      for (let i = 0; i < this.portfolios.edges.length; i++) {
        const element = this.portfolios.edges[i]
        const filters = []
        filters.push(element.node.PortfolioFields.year)
        if (
          !this.year_options.includes(element.node.PortfolioFields.year) &&
          element.node.PortfolioFields.year
        ) {
          this.year_options.push(element.node.PortfolioFields.year)
        }
        if (element.node.PortfolioFields.friends) {
          for (
            let f = 0;
            f < element.node.PortfolioFields.friends.length;
            f++
          ) {
            const friend = element.node.PortfolioFields.friends[f]
            if (!this.friend_options.includes(friend)) {
              this.friend_options.push(friend)
            }
            filters.push(friend.slug)
          }
        }
        if (element.node.categories) {
          for (let c = 0; c < element.node.categories.nodes.length; c++) {
            const cat = element.node.categories.nodes[c]
            if (!this.cat_options.includes(cat)) {
              this.cat_options.push(cat)
            }
            filters.push(cat.slug)
          }
        }
        element.filters = filters
        output.push(element)
      }
      console.log("FRIENDS: ", this.friend_options)
      console.log("CATS: ", this.cat_options)
      console.log("YEARS: ", this.year_options)
      return output
    },
    portfolio() {
      console.log(this.the_filters)
      if (this.the_filters.length == 0) {
        return this.portfolio_raw
      }
      return this.portfolio_raw.filter((item) =>
        this.the_filters.every((v) => item.filters.includes(v))
      )
    },
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
  background-color: rgba(255, 255, 255, 0.5);
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
  //background-color: lighten($flair, 80%);
  position: relative;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    //background-color: $white;
    //background-image: url("~assets/patterns/cross-1.png");
    background-attachment: fixed;
    mix-blend-mode: screen;
    z-index: 1;
  }

  .project {
    margin-bottom: 3rem;
    display: block;
    position: relative;
    z-index: 100;
    text-decoration: none;
    isolation: isolate;
    border: 5px solid $flair;
    //padding: 2rem;
    background-color: $white;
    h4 {
      font-size: 3rem;
      //background: $white;
      color: $flair;
      margin-bottom: 20px;
      //width: 80%;
      padding-right: 40%;

      svg {
        width: 20px;
        height: 20px;
        * {
          fill: $flair;
        }
      }
      a {
        text-decoration: none;
      }
    }
    img {
      width: 30%;
      //margin-left: 40%;
      height: auto;
      display: block;
      position: relative;
      aspect-ratio: 16/9;
      position: absolute;
      // width: 100%;
      // height: 100%;
      object-fit: cover;
      top: 0px;
      right: 0px;
      // left: 0;
      z-index: 1;
      z-index: 1000;
      border: 1px solid $flair;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
      margin: 20px;
      //margin-top: -5px;
      // display: none;
    }
    .info-card {
      //border: 5px solid $flair;
      padding: 10px;
      background: rgba(255, 255, 255, 1);
      color: $flair;
      width: 100%;
      margin-left: 0%;
      font-size: 0.8em;
      position: relative;
      z-index: 100;
      &:not(.bottom) {
        border-bottom: none;
        padding-bottom: 20px;
      }
      &.bottom {
        //margin-top: -10px;
        border-top: none;
      }
      div {
        //margin-top: 10px;
      }
    }
    .pills {
      display: flex;
      //padding-top: 10px;
      div {
        // background: $flair;
        // color: $white;
        padding: 5px 10px;
        font-size: 0.6em;
        border-radius: 20px;
        margin-right: 10px;
        border: 2px solid $flair;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          background: $flair;
          color: $white;
        }
      }
    }
    .stats {
      text-decoration: none;
      display: block;
      margin-right: 40%;
      line-height: 1.2em;
    }
  }
}
</style>
