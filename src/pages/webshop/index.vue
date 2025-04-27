<script setup lang="ts">
useHead({
  title: 'Trgovina',
  meta: [
    {
      name: 'description',
      content: 'TODO'
    },
    { property: 'og:title', content: 'Backoffice' },
    {
      property: 'og:description',
      content: 'TODO'
    }
  ]
})

useSeoMeta({
  description: 'Trgovina',
  ogTitle: `Trgovina`,
  ogDescription: 'TODO',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
})
</script>

<template>
  <div class="page-container">
    <WebshopPage />
  </div>
</template>

<style lang="css" scoped></style>
