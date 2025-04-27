<script setup lang="ts">
useHead({
  title: 'Galerija motiva',
  meta: [
    {
      name: 'description',
      content: 'TODO'
    },
    { property: 'og:title', content: 'Kontakt' },
    {
      property: 'og:description',
      content: 'TODO'
    }
  ]
})

useSeoMeta({
  description: 'TODO',
  ogTitle: `Galerija motiva`,
  ogDescription: 'TODO',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
})
</script>

<template>
  <MotivesPage />
</template>
