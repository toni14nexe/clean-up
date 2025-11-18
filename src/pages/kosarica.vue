<script setup lang="ts">
useHead({
  title: 'Košarica',
  meta: [
    {
      name: 'description',
      content: 'Agencija za Čišćenje Horizon košarica proizvoda.'
    },
    { property: 'og:title', content: 'Kontakt' },
    {
      property: 'og:description',
      content: 'Agencija za Čišćenje Horizon košarica proizvoda.'
    }
  ]
})

useSeoMeta({
  description: 'Agencija za Čišćenje Horizon košarica proizvoda.',
  ogTitle: `Košarica`,
  ogDescription: 'Agencija za Čišćenje Horizon košarica proizvoda.',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
})
</script>

<template>
  <CartPage />
</template>
