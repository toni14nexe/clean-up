<script setup lang="ts">
import 'element-plus/theme-chalk/display.css'
import hr from 'element-plus/es/locale/lang/hr'

useHead({
  titleTemplate: title =>
    title ? `Horizon Escape - ${title}` : 'Horizon Escape',
  meta: [
    {
      name: 'keywords',
      content: 'TODO'
    },
    { name: 'author', content: 'InnovaTech obrt za informatičke usluge' },
    { property: 'og:type', content: 'website' },

    // Image
    {
      property: 'og:image',
      content:
        'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
    },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: process.env.APP_BASE_URL },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:image',
      content:
        'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
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
      href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395850/favicon-96x96_d0nnz4.png'
    },
    {
      rel: 'apple-touch-icon',
      href: 'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
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
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763395850/favicon-32x32_j3b0qa.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763395850/favicon-16x16_gg3waa.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763395850/favicon-96x96_d0nnz4.png"
        sizes="96x96"
      />
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href="https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png"
      />
      <meta name="apple-mobile-web-app-title" content="Horizon Escape" />
    </head>
  </ClientOnly>

  <ElConfigProvider :locale="hr">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>
