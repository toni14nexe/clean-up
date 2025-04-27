<script lang="ts" setup>
import OrderStatePage from '~/components/webshop/OrderStatePage.vue'

useHead({
  title: 'Narudžba',
  meta: [
    {
      name: 'description',
      content: `TODO`
    },
    { property: 'og:title', content: 'Portal' },
    {
      property: 'og:description',
      content: `TODO`
    }
  ]
})

useSeoMeta({
  description: 'TODO',
  ogTitle: `Narudžba`,
  ogDescription: 'TODO',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
})
</script>

<template><OrderStatePage /></template>

<style lang="css" scoped></style>
