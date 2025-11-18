<script lang="ts" setup>
import OrderStatePage from '~/components/webshop/OrderStatePage.vue'

useHead({
  title: 'Narudžba',
  meta: [
    {
      name: 'description',
      content: `Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.`
    },
    { property: 'og:title', content: 'Portal' },
    {
      property: 'og:description',
      content: `Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.`
    }
  ]
})

useSeoMeta({
  description:
    'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.',
  ogTitle: `Narudžba`,
  ogDescription:
    'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
})
</script>

<template><OrderStatePage /></template>

<style lang="css" scoped></style>
