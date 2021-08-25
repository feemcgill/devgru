
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    script: [
      { src: `/js/ztext.js`, body: true },
      { src: `/js/kaboom.js`, body: true },
    ],    
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400,700'
      }
    ]
  },
  pageTransition: {
    name: 'page',
    mode: '',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  }, 
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    "~/styles/global.scss",
  ],
  styleResources: {
    scss: [
      "~/styles/_vars.scss",
      "~/styles/_mixins.scss"
    ]
  },    
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/style-resources'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    "@nuxtjs/apollo",

  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "https://wp.d-e-v.group/graphql",
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
