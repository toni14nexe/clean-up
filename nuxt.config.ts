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
    name: 'Agencija za Čišćenje Horizon'
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
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-32x32_o5emn9.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-16x16_gkwvoc.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-96x96_sby9di.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
        }
        /* {
          rel: 'manifest',
          href: webManifest
        } */
      ],
      meta: [
        {
          name: 'Agencija za Čišćenje Horizon',
          content:
            'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.'
        },
        {
          name: 'keywords',
          content:
            'čišćenje, agencija za čišćenje, čišćenje apartmana, čišćenje stanova, čišćenje kuća, Horizon, Agencija za Čišćenje Horizon, čišćenje poslovnih prostora, generalno čišćenje, čišćenje nakon najma, čišćenje, usluge čišćenja'
        },
        { name: 'author', content: 'InnovaTech obrt za informatičke usluge' },
        { property: 'og:title', content: 'Agencija za Čišćenje Horizon' },
        {
          property: 'og:description',
          content:
            'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.'
        },
        {
          property: 'og:image',
          content:
            'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
        }
      ]
    }
  }
})
