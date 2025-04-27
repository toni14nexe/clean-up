// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'netlify'
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: [
    '@prisma/nuxt',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-viewport',
    '@vueuse/motion/nuxt',
    '@nuxtjs/sitemap',
    '@primevue/nuxt-module'
  ],
  runtimeConfig: {
    siteUrl: process.env.APP_BASE_URL,
    public: {
      enviroment: process.env.ENVIROMENT,
      appBaseUrl: process.env.APP_BASE_URL,
      axiosApiBaseUrl: process.env.AXIOS_API_BASE_URL,
      cloudinaryPreset: process.env.CLOUDINARY_PRESET,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME
      /* stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      stripeButtonId: process.env.STRIPE_BUTTON_ID, */
    }
  },
  site: {
    url: 'horizon-escape.hr',
    name: 'Horizon Escape'
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls']
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      }
    },
    components: {
      include: ['Editor']
    }
  },
  css: ['~/assets/styles/main.css'],
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser':
          './node_modules/.prisma/client/index-browser.js'
      }
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [
        {
          src: 'https://js.stripe.com/v3/buy-button.js',
          async: true
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Inclusive+Sans&display=swap'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395850/favicon-32x32_j3b0qa.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395850/favicon-16x16_gg3waa.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395850/favicon-96x96_d0nnz4.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
        }
        /* {
          rel: 'manifest',
          href: webManifest
        } */
      ],
      meta: [
        {
          name: 'Horizon Escape',
          content: 'TODO'
        },
        {
          name: 'keywords',
          content: 'TODO'
        },
        { name: 'author', content: 'InnovaTech obrt za informatičke usluge' },
        { property: 'og:title', content: 'Horizon Escape' },
        {
          property: 'og:description',
          content: 'TODO'
        },
        {
          property: 'og:image',
          content:
            'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
        }
      ]
    }
  }
})
