import { request, gql } from "graphql-request"

const generate_query = gql`
  query Pages {
    pages(first: 1000) {
      nodes {
        slug
      }
    }
  }
`
const seo = {
  title: "Development Group",
  description:
    "Los Angeles Based web development for creative agencies and brands.",
  image: "/devgru-social.jpg",
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: seo.title,
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "og:title", name: "og:title", content: seo.title },
      { hid: "twitter:title", name: "twitter:title", content: seo.title },
      { hid: "og:site_name", name: "og:site_name", content: seo.title },
      { hid: "theme-color", name: "theme-color", content: "#2a8122" },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      { hid: "description", name: "description", content: seo.description },

      {
        hid: "description",
        name: "description",
        content: seo.description,
      },
      {
        hid: "og:description",
        name: "og:description",
        content: seo.description,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: seo.description,
      },
      {
        hid: "og:image",
        name: "og:image",
        content: seo.image,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: seo.image,
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700",
      },
    ],
    script: [
      // { src: `/js/kaboom.js`, body: true }
    ],
  },

  // // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/styles/global.scss"],
  // Sass resources available to VUE files
  styleResources: {
    scss: ["~/styles/_vars.scss", "~/styles/_mixins.scss"],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: [
  //   { src: "~/plugins/flickity", ssr: false },
  //   { src: "~/plugins/vuescrollto", ssr: false },
  //   "~/plugins/preview.client.js"
  // ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources", "nuxt-graphql-request"],

  graphql: {
    clients: {
      default: {
        endpoint: process.env.WP_GRAPHQL_ENDPOINT,
        options: {
          credentials: "include",
          mode: "cors",
        },
      },
    },
  },
  generate: {
    fallback: true,
    interval: 50,
    concurrency: 10,
    routes() {
      return request(process.env.WP_GRAPHQL_ENDPOINT, generate_query).then(
        (res) => {
          return res.pages.nodes.map((page) => {
            return {
              route: `/${page.slug}`,
            }
          })
        }
      )
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/google-analytics"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Google Analytics settings
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
}
