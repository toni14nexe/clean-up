<script lang="ts" setup>
import WebshopCategoryPage from '~/components/webshop/WebshopCategoryPage.vue'

const route = useRoute()
const title = `${route.params.categoryName[0].toUpperCase()}${route.params.categoryName.slice(1, route.params.categoryName.length)}`

useHead({
  title: `${title}`,
  meta: [
    {
      name: 'description',
      content: `Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.`
    },
    {
      property: 'og:title',
      content: 'Agencija za Čišćenje Horizon - Usluge'
    },
    {
      property: 'og:description',
      content: `Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.`
    }
  ]
})

useSeoMeta({
  description: `Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.`,
  ogTitle: `Usluge - ${title}`,
  ogDescription: `Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.`,
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
})
</script>

<template><WebshopCategoryPage :title="title" /></template>

<style lang="css" scoped></style>
