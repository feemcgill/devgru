import { request, gql } from "graphql-request";

const generate_query = gql`
  query Pages {
    pages(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;
const seo = {
  title: "Development Group",
  description:
    "Los Angeles based web consultancy and code shop for creative agencies and brands.",
  image: "https://devgru.la/devgru-social.jpg",
};

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
        href: "https://fonts.googleapis.com",
      },
      {
        href: "https://fonts.gstatic.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
      },
    ],

    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-WRFN33PBRR",
        async: true,
      },
    ],
  },
  loading: {
    color: "#2a8122",
    height: "1px",
  },
  // // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/styles/global.scss"],
  // Sass resources available to VUE files
  styleResources: {
    scss: ["~/styles/_vars.scss", "~/styles/_mixins.scss"],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/gtag.client.js", ssr: false },
    { src: "~/plugins/vuescrollto", ssr: false },
  ],

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
            };
          });
        }
      );
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Page Tranny
  pageTransition: {
    name: "page-tranny",
    mode: "out-in",
    beforeEnter(el) {
      // console.log("before enter...")
    },
  },
};
