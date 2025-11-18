<script setup lang="ts">
import 'element-plus/theme-chalk/display.css'
import hr from 'element-plus/es/locale/lang/hr'

useHead({
  titleTemplate: title =>
    title
      ? `Agencija za Čišćenje Horizon - ${title}`
      : 'Agencija za Čišćenje Horizon',
  meta: [
    {
      name: 'keywords',
      content:
        'čišćenje, agencija za čišćenje, čišćenje apartmana, čišćenje stanova, čišćenje kuća, Horizon, Agencija za Čišćenje Horizon, čišćenje poslovnih prostora, generalno čišćenje, čišćenje nakon najma, čišćenje, usluge čišćenja'
    },
    { name: 'author', content: 'InnovaTech obrt za informatičke usluge' },
    { property: 'og:type', content: 'website' },

    // Image
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
    },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: process.env.APP_BASE_URL },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:image',
      content:
        'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
    },
    {
      name: 'google-site-verification',
      content: 'XcMEZOdux3Ig-o3E4zproRBhHJiC-7GhdOnmmAogY7Q'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-96x96_sby9di.png'
    },
    {
      rel: 'apple-touch-icon',
      href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
    }
  ]
})
</script>

<template>
  <ClientOnly>
    <head>
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-32x32_o5emn9.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-16x16_gkwvoc.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-96x96_sby9di.png"
        sizes="96x96"
      />
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png"
      />
      <meta
        name="apple-mobile-web-app-title"
        content="Agencija za Čišćenje Horizon"
      />
    </head>
  </ClientOnly>

  <ElConfigProvider :locale="hr">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>
