<script lang="ts" setup>
import WebshopCategoryPage from '~/components/webshop/WebshopCategoryPage.vue'

const route = useRoute()
const title = `${route.params.categoryName[0].toUpperCase()}${route.params.categoryName.slice(1, route.params.categoryName.length)}`

useHead({
  title: `${title}`,
  meta: [
    {
      name: 'description',
      content: `TODO`
    },
    { property: 'og:title', content: 'Horizon Escape - Trgovina' },
    {
      property: 'og:description',
      content: `TODO`
    }
  ]
})

useSeoMeta({
  description: `TODO`,
  ogTitle: `Trgovina - ${title}`,
  ogDescription: `TODO`,
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
})
</script>

<template><WebshopCategoryPage :title="title" /></template>

<style lang="css" scoped></style>
