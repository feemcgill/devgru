<template>
  <div class="portfolio-page">
    <div class="header">
      <div class="auto-scroll-toggler" @click="toggle_autopilot">
        <AutoPilotToggle :auto_pilot="auto_pilot" />
      </div>
      <div class="inner">
        <h1>Work</h1>
        <div :class="mobile_filters_open ? 'buttons open' : 'buttons'">
          <a tabindex="0" class="mobile-button" href="#" @click="mobile_filters_open = !mobile_filters_open">
            <div class="x" v-if="mobile_filters_open">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50.6 63.2"
                style="enable-background:new 0 0 50.6 63.2;" xml:space="preserve">
                <g>
                  <path
                    d="M37.2,34h13.5v3.8L25.3,63.2L0,37.8V34h13.5V0h23.7V34z M41.1,41.8h-7.9V7.9H17.4v33.9H9.6l15.8,15.8L41.1,41.8z" />
                </g>
              </svg>
            </div>
            <div v-else>
              <span>Filters</span>
            </div>
          </a>
          <h3>Filters</h3>
          <div class="button-section">
            <h4>Year</h4>
            <button v-for="(year, index) in year_options" :key="index" v-html="year"
              v-bind:style="year_positions[index] && `transform: translate(${year_positions[index].x}px, ${year_positions[index].y}px) rotate(${year_positions[index].r}deg);`"
              @click="toggle_filter(year, year_filters)" :class="year_filters.includes(year) && 'active'" tabindex="0" />
          </div>
          <div class="button-section">
            <h4>Category</h4>

            <button v-for="(cat, index) in cat_options" :key="cat.slug + index" v-html="cat.name"
              v-bind:style="cat_positions[index] && `transform: translate(${cat_positions[index].x}px, ${cat_positions[index].y}px) rotate(${cat_positions[index].r}deg);`"
              @click="toggle_filter(cat.slug, cat_filters)" :class="cat_filters.includes(cat.slug) && 'active'" />
          </div>
          <div class="button-section">
            <h4>Partner</h4>
            <button v-for="(friend, index) in friend_options" :key="friend.slug + index" v-html="friend.title"
              v-bind:style="friend_positions[index] && `transform: translate(${friend_positions[index].x}px, ${friend_positions[index].y}px) rotate(${friend_positions[index].r}deg);`"
              @click="toggle_filter(friend.slug, friend_filters)"
              :class="friend_filters.includes(friend.slug) && 'active'" />
          </div>
          <div class="clear-div">
            <a v-if="
              year_filters.length != 0 ||
              cat_filters.length != 0 ||
              friend_filters.length != 0
            " @click="clear_filters" v-on:keyup.enter="clear_filters" class="clear-em" tabindex="0">
              Clear Filters &times;
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="portfolio-wrap">
      <div class="bg"></div>
      <div class="no-results" v-if="portfolio.length < 1">
        <h5>Nothing to see here.</h5>
        <p>Too many filters, not enough projects!</p>
      </div>
      <div v-for="(project, index) in portfolio" v-bind:key="project.id">
        <div class="project" v-bind:class="animating && 'animating'"
          :style="!animating && `transition - delay: ${index * 0.03} s; `">
          <div class="info-card">
            <h4>
              <span v-html="project.node.title" />
              <a v-if="project.node.PortfolioFields.url" :href="project.node.PortfolioFields.url" target="_blank">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 323.5 323" xml:space="preserve">
                  <g>
                    <path
                      d="M14.2,29.4C6.2,29.4,0,35.5,0,43.6v265.2c0,8.1,6.2,14.2,14.2,14.2h265.2c8.1,0,14.2-6.2,14.2-14.2V157.2h-28.4v137.3H28.4
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              		                  V57.8h137.3V29.4C165.8,29.8,14.2,29.8,14.2,29.4L14.2,29.4z" />
                    <path d="M164.3,178.5L295,48.3v52.6h28.4V0H222.1v28.4h52.6L144.4,158.6L164.3,178.5z" />
                  </g>
                </svg>
              </a>
            </h4>

            <div v-if="project.node.PortfolioFields.description" class="stats"
              v-html="project.node.PortfolioFields.description"></div>
          </div>
          <div class="image-wrap">
            <ProjectImage :image="project.node.featuredImage" :title="project.node.title" />
          </div>
          <div class="info-card bottom">
            <div class="pills">
              <div v-if="
                project.node.PortfolioFields.year ||
                project.node.PortfolioFields.years
              " v-html="
  project.node.PortfolioFields.years ||
  project.node.PortfolioFields.year
" :class="
  year_filters.includes(project.node.PortfolioFields.year) &&
  'active'
" @click="
  toggle_filter(project.node.PortfolioFields.year, year_filters)
"></div>

              <div v-for="cat in project.node.categories.nodes" :key="cat.slug + project.node.PortfolioFields.title"
                v-html="cat.name" :class="cat_filters.includes(cat.slug) && 'active'"
                @click="toggle_filter(cat.slug, cat_filters)" />
              <div v-for="friend in project.node.PortfolioFields.friends"
                :key="friend.slug + project.node.PortfolioFields.title" v-html="'With: ' + friend.title"
                :class="friend_filters.includes(friend.slug) && 'active'"
                @click="toggle_filter(friend.slug, friend_filters)" />
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
    <div id="bottom"></div>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request"
import FadeImage from "~/components/FadeImage"
import VueScrollTo from "vue-scrollto"
import gsap from 'gsap'
import EasePack from 'gsap/dist/EasePack'
gsap.registerPlugin(EasePack.RoughEase)

function checkSlugs(obj, list) {
  var i
  for (i = 0; i < list.length; i++) {
    if (list[i].slug === obj.slug) {
      return true
    }
  }

  return false
}

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
  head() {
    return {
      title: "Devlopment Group's Work",
    }
  },
  data() {
    let that = this;
    return {
      debug: false,
      year_options: [],
      cat_options: [],
      friend_options: [],
      year_filters: [],
      cat_filters: [],
      friend_filters: [],
      year_positions: [],
      cat_positions: [],
      friend_positions: [],
      mobile_filters_open: false,
      animating: false,
      auto_pilot: false,
      auto_pilot_options: {
        speed: 0,
        easing: 'linear',
        force: true,
        cancelable: true,
        onStart: function (element) {
          // scrolling started
        },
        onDone: function (element) {
          // scrolling is done
          that.disable_autopilot()
        },
        onCancel: function () {
          // scrolling has been interrupted
          // console.log('onCancel')
          that.disable_autopilot()
        },
        x: false,
        y: true
      },
      disable_auto_pilot_toggler: false,
      viewport_height: 0,
      current_scroll_pos: 0,
      refresh_scrollable_area: null,
    }
  },
  created() {
    this.refresh_scrollable_area = setInterval(() => {
      if (typeof window !== 'undefined') {
        // We are in the browser
        this.viewport_height = document.body.offsetHeight;
        this.current_scroll_pos = document.documentElement.scrollTop
      }
    }, 250);
  },
  beforeDestroy() {
    this.disable_autopilot();
    clearInterval(this.refresh_scrollable_area);
  },
  methods: {
    toggle_autopilot() {
      if (!this.auto_pilot && !this.disable_auto_pilot_toggler) {
        // get height of page, then calculate scrolling speed from that.
        let body = document.body,
          html = document.documentElement;
        let scroll_height = Math.max(body.scrollHeight, body.offsetHeight,
          html.clientHeight, html.scrollHeight, html.offsetHeight);
        // subtract scroll position location
        scroll_height = scroll_height - this.current_scroll_pos;
        // divide scrollable height by viewport height to get number of screen heights to scroll
        scroll_height = scroll_height / this.viewport_height;
        // console.log('calculated scrollable distance:', scroll_height);
        // multiply number of screen heights by 4000 or 4 seconds
        this.auto_pilot_options.speed = scroll_height * 4000;
        // console.log('calculated speed:', this.auto_pilot_options.speed);
        // console.log('calculated time per viewport of scrollable height:', this.auto_pilot_options.speed / scroll_height);

        // toggle it
        if (this.auto_pilot_options.speed > 0) {
          this.auto_pilot = true
          this.auto_scroll_window()
        }
      }
    },
    disable_autopilot() {
      this.auto_pilot = false
      // to prevent overlap of click / onCancel events, add timeout
      this.disable_auto_pilot_toggler = true
      setTimeout(() => {
        this.disable_auto_pilot_toggler = false
      }, 250)
    },
    auto_scroll_window() {
      VueScrollTo.scrollTo("#bottom", this.auto_pilot_options.speed, this.auto_pilot_options)
    },
    toggle_filter(item, list) {
      if (list.includes(item)) {
        list.splice(list.indexOf(item), 1)
      } else {
        list.push(item)
      }

      // filter game thing
      // this.filter_game()

      // scroll to top
      setTimeout(() => {
        VueScrollTo.scrollTo("#pages-container", 0)
      }, 250);
      // track event
      this.track_filter_event()
    },
    clear_filters() {
      this.year_filters = []
      this.cat_filters = []
      this.friend_filters = []

      this.year_positions = [];
      this.cat_positions = [];
      this.friend_positions = [];

      // scroll to top
      setTimeout(() => {
        VueScrollTo.scrollTo("#pages-container", 0)
      }, 250);
    },
    filter_game() {
      let num_filters_selected = this.year_filters.length + this.cat_filters.length + this.friend_filters.length;
      let intensity = num_filters_selected / 2;
      let speed = num_filters_selected / 100;

      // SHAKE IT
      if (num_filters_selected >= 5) {
        gsap.fromTo('#__nuxt', speed / 2, { x: -intensity }, { x: intensity, clearProps: "x", repeat: 40 });
        gsap.fromTo('#__nuxt', speed, { y: -intensity }, { y: intensity, clearProps: "y", repeat: 20 })
      }

      // RAINBOWS
      if (num_filters_selected >= 10) {
        gsap.to("html", {
          "--primary_color": "hsl(+=360, +=100%, +=25%)", duration: 1, yoyo: true, repeat: 1, onComplete: () => {
            // gsap.to("html", { "--primary_color": "hsl(115, 58, 32)", duration: 1 })
            gsap.set("html", { "--primary_color": "var(--forest)" })
          }
        });
      }

      // SCATTER BUTTONS
      this.year_positions = [];
      this.cat_positions = [];
      this.friend_positions = [];
      if (num_filters_selected >= 10) {
        this.year_options.forEach(element => {
          let x = Math.round(Math.random() * (20 - -20) + -20);
          let y = Math.round(Math.random() * (20 - -20) + -20);
          let r = Math.round(Math.random() * (20 - -20) + -20);
          this.year_positions.push({ x: x, y: y, r: r })
        });
        this.cat_options.forEach(element => {
          let x = Math.round(Math.random() * (20 - -20) + -20);
          let y = Math.round(Math.random() * (20 - -20) + -20);
          let r = Math.round(Math.random() * (20 - -20) + -20);
          this.cat_positions.push({ x: x, y: y, r: r })
        });
        this.friend_options.forEach(element => {
          let x = Math.round(Math.random() * (20 - -20) + -20);
          let y = Math.round(Math.random() * (20 - -20) + -20);
          let r = Math.round(Math.random() * (20 - -20) + -20);
          this.friend_positions.push({ x: x, y: y, r: r })
        });
      }
    },
    track_filter_event() {
      const years = this.year_filters.join(", ")
      const cats = this.cat_filters.join(", ")
      const friends = this.friend_filters.join(", ")
      const combined_filters = []

      if (years != "") combined_filters.push(years)
      if (cats != "") combined_filters.push(cats)
      if (friends != "") combined_filters.push(friends)

      if (combined_filters === undefined || combined_filters.length == 0) {
        return
      } else {
        // console.log(combined_filters.join(", "))
        this.$gtag("event", "Portfolio Page Filter Selected", {
          event_category: "DevGru Custom",
          event_label: "selected filters",
          value: combined_filters.join(", "),
        })
      }
    },
    animate() {
      // window.scrollTo(0, 0)
      this.animating = true

      setTimeout(() => {
        this.animating = false
      }, 250)
    },
  },
  computed: {
    portfolio_raw() {
      const output = []
      if (!this.portfolios) {
        return false
      }
      for (let i = 0; i < this.portfolios.edges.length; i++) {
        const element = this.portfolios.edges[i]
        const filters = []
        filters.push(element.node.PortfolioFields.year)
        if (
          !this.year_options.includes(element.node.PortfolioFields.year) &&
          element.node.PortfolioFields.year &&
          element.node.PortfolioFields.year > 2012
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
            if (
              !checkSlugs(friend, this.friend_options) &&
              friend.slug != "development-group"
            ) {
              this.friend_options.push(friend)
            }
            filters.push(friend.slug)
          }
        }
        if (element.node.categories) {
          for (let c = 0; c < element.node.categories.nodes.length; c++) {
            const cat = element.node.categories.nodes[c]
            if (!checkSlugs(cat, this.cat_options)) {
              this.cat_options.push(cat)
            }
            filters.push(cat.slug)
          }
        }
        element.filters = filters
        output.push(element)
      }

      this.friend_options.sort((a, b) => (a.slug > b.slug ? 1 : -1))
      this.cat_options.sort((a, b) => (a.slug > b.slug ? 1 : -1))
      this.year_options.sort((a, b) => (a > b ? 1 : -1))
      this.year_options.reverse()
      return output
    },
    portfolio() {
      this.animate()

      if (
        this.cat_filters.length == 0 &&
        this.year_filters.length == 0 &&
        this.friend_filters.length == 0
      ) {
        return this.portfolio_raw
      }
      var processed_data, years, cats, friends

      if (this.year_filters.length != 0) {
        years = this.portfolio_raw.filter((item) =>
          this.year_filters.some((v) => item.filters.includes(v))
        )
      } else {
        years = this.portfolio_raw
      }

      if (this.cat_filters.length != 0) {
        cats = years.filter((item) =>
          this.cat_filters.some((v) => item.filters.includes(v))
        )
      } else {
        cats = years
      }

      if (this.friend_filters.length != 0) {
        friends = cats.filter((item) =>
          this.friend_filters.some((v) => item.filters.includes(v))
        )
      } else {
        friends = cats
      }

      processed_data = friends

      return processed_data
    },
  },
  async asyncData({ $graphql, route }) {
    const query = gql`
      query MyQuery {
        portfolios(first: 1000, where: {orderby: {field: MENU_ORDER, order: ASC}})  {
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
.buttons {
  max-width: 450px;

  h3 {
    margin-left: 10px;
    margin-bottom: 10px;
    display: none;

    @include breakpoint(medium) {
      display: block;
    }
  }

  >.button-section {

    //margin: 1em 0;
    //border-top: 1px solid var(--primary_color);
    h4 {
      margin-left: 10px;
      font-size: 0.6em;
      padding-top: 10px;
      display: none;

      @include breakpoint(medium) {
        display: block;
      }
    }
  }

  .clear-div {
    margin-top: 10px;
    min-height: 25px;
  }

  .clear-em {
    font-size: 0.7em;
    margin: 10px;
    margin-top: 50px;
    border-bottom: 2px solid var(--primary_color);
    cursor: pointer;
  }

  .mobile-button {
    display: none;
  }

  @include breakpoint(large) {
    max-width: 350px;
  }

  @include breakpoint(medium) {
    max-width: 100%;
    background: var(--background);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 50px 20px;
    transform: translateY(100%);
    transition: all 0.2s ease-out;
    border: 2px solid var(--primary_color);
    max-height: calc(100vh - 0px);

    &.open {
      transform: translateY(0);
    }

    .mobile-button {
      display: block;
      position: absolute;
      text-decoration: none;
      // height: 50px;
      // width: 50px;
      background: var(--background);
      border-radius: 100%;
      top: -60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--primary_color);
      cursor: pointer;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
      font-size: 0.6em;
      //text-transform: uppercase;
      padding: 1em 2em;
      font-weight: bold;
      right: calc(50% - 47px);

      svg {
        width: 24px;
        height: 24px;

        * {
          fill: var(--primary_color);
        }
      }
    }
  }

  @include breakpoint(medium) {
    @include breakpoint(really-short) {
      //overflow: scroll;
      height: calc(100vh - 12px);
      padding-top: 100px;

      &.open {
        overflow: scroll;
      }
    }
  }


  &.open {
    .mobile-button {
      padding: 0;
      height: 50px;
      width: 50px;
      right: 20px;
      right: calc(50% - 25px);
      top: -25px;
      font-size: 1em;

      @include breakpoint(really-short) {
        top: 25px;
        right: auto;
        left: 25px;
      }
    }
  }
}

button {
  background-color: transparent;
  color: var(--primary_color);
  border: 2px solid var(--primary_color);
  margin: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 0.8em;
  font-size: clamp(0.6em, 1vw, 0.8em);
  padding-top: 6px;
  transition: 5s transform;

  &.active {
    background-color: var(--primary_color);
    color: var(--background);
  }

  @include breakpoint(medium) {
    letter-spacing: 1;
    margin: 3px;
  }
}

.portfolio-page {
  background-color: rgba(255, 255, 255, 0.9);
}

.header {
  margin-bottom: 50px;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 50%;
  min-height: 100vh;
  text-align: left;
  width: 50%;
  z-index: 1;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @include breakpoint(medium) {
    position: absolute;
    width: 100%;
    left: auto;
    top: auto;
    margin: 0;
    padding-top: 30px;
    display: block;
    min-height: auto;
    z-index: 1000;
    padding: 30px 5vw 0 5vw;
  }

  h1 {
    font-size: var(--big_font);
    line-height: 0.7;
    color: var(--primary_color);
    letter-spacing: -0.02em;

    @include breakpoint(medium) {
      font-size: 65px;
    }
  }

  .auto-scroll-toggler {
    position: absolute;
    bottom: 10px;
    right: 10px;

    @include breakpoint(medium) {
      display: none;
    }
  }
}

.portfolio-wrap {
  position: relative;
  width: 50%;
  left: 0%;
  min-height: 100vh;
  padding: 2.5vw;
  // background-color: lighten(var(--primary_color), 0%);
  background-color: var(--primary_color);
  display: flex;
  flex-direction: column;
  justify-content: center;

  @include breakpoint(medium) {
    position: relative;
    width: 100%;
    left: auto;
    top: auto;
    padding: 100px 5vw;
  }

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: var(--background);
    background-image: url("~assets/patterns/diag-stripe-top-right.png");
    //background-size: 300px;
    background-attachment: fixed;
    mix-blend-mode: screen;
    z-index: 1;
  }

  .no-results {
    position: relative;
    z-index: 100;
    padding: 2rem;
    text-shadow: 0 0 5px var(--white);
    // background-color: var(--primary_color);
    // color: var(--background);
    //border: 5px solid var(--background);
    // box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);

    h5 {
      font-size: 3em;
      @include headline_font;
      font-weight: 300;
      line-height: 0.8;
      margin-bottom: 10px;
    }
  }

  .project {
    margin-bottom: 3rem;
    display: block;
    position: relative;
    z-index: 100;
    text-decoration: none;
    isolation: isolate;
    border: 2px solid var(--primary_color);
    //padding: 2rem;
    background-color: var(--background);
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    transition: 0.5s transform, 0.5s opacity;
    overflow: hidden;

    &.animating {
      opacity: 0;
      transform: translate(-30px, 100px) rotate(-10deg) scale(0.5);
      transition: 0s transform;
    }

    h4 {
      font-size: 3rem;
      //background: var(--background);
      color: var(--primary_color);
      margin-bottom: 20px;
      //width: 80%;
      padding-right: 40%;

      @include breakpoint(small) {
        font-size: 1em;
      }

      svg {
        width: 20px;
        height: 20px;

        * {
          fill: var(--primary_color);
        }

        @include breakpoint(small) {
          width: 12px;
          height: 12px;
        }
      }

      a {
        text-decoration: none;
      }
    }

    .image-wrap {
      position: absolute;
      right: 0;
      top: 0;
      // background-color: var(--primary_color);
      // background-color: var(--flair);
      // background-color: lighten(var(--primary_color), 20%);
      // background-color: var(--background);
      // background-image: url("~assets/dots-white-trans.png");
      background-size: 90px;
      height: 100%;
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100000;
      padding: 0 10px;

      @include breakpoint(small) {
        width: 40%;
        padding: 0;
        //overflow: hidden;
        align-items: unset;
      }
    }

    img {
      width: 100%;
      // margin-left: -20%;
      max-width: 200px;
      height: auto;
      display: block;
      position: relative;
      aspect-ratio: 16/9;
      // width: 100%;
      // height: 100%;
      object-fit: cover;

      // left: 0;
      // transform: rotate(-5deg);
      z-index: 1;
      z-index: 1000;
      border: 1px solid var(--primary_color);
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);

      //margin: 20px;
      //margin-top: -5px;
      // display: none;
      @include breakpoint(small) {
        // box-shadow: none;
        border: none;
        border-left: 2px solid var(--primary_color);
      }
    }

    .info-card {
      //border: 5px solid var(--primary_color);
      padding: 10px;
      color: var(--primary_color);
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
        position: relative;
        z-index: 100000;
      }

      div {
        //margin-top: 10px;
      }
    }

    .pills {
      display: flex;

      //padding-top: 10px;
      div {
        // background: var(--primary_color);
        // color: var(--background);
        background-color: var(--background);
        padding: 5px 10px;
        font-size: 0.6em;
        border-radius: 20px;
        margin-right: 10px;
        border: 2px solid var(--primary_color);
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;

        &.active,
        &:hover {
          background: var(--primary_color);
          color: var(--background);
        }

        @include breakpoint(small) {
          font-size: 0.5em;
        }
      }
    }

    .stats {
      text-decoration: none;
      display: block;
      margin-right: 35%;
      line-height: 1.2em;

      @include breakpoint(small) {
        font-size: 0.8em;
        margin-right: 50%;
      }
    }
  }
}
</style>