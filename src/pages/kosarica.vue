<script setup lang="ts">
useHead({
  title: 'Košarica',
  meta: [
    {
      name: 'description',
      content: 'Horizon Escape košarica proizvoda.'
    },
    { property: 'og:title', content: 'Kontakt' },
    {
      property: 'og:description',
      content: 'Horizon Escape košarica proizvoda.'
    }
  ]
})

useSeoMeta({
  description: 'Horizon Escape košarica proizvoda.',
  ogTitle: `Košarica`,
  ogDescription: 'Horizon Escape košarica proizvoda.',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
})
</script>

<template>
  <CartPage />
</template>
