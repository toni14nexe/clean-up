<script lang="ts" setup>
import SearchPage from '~/components/search/SearchPage.vue'

const route = useRoute()

useHead({
  title: `Pretraživanje: ${route.query.value}`,
  meta: [
    {
      name: 'description',
      content: 'Rezultati pretraživanja.'
    },
    { property: 'og:title', content: `Pretraživanje ${route.query.value}` },
    {
      property: 'og:description',
      content: 'Rezultati pretraživanja.'
    }
  ]
})

useSeoMeta({
  description: 'Rezultati pretraživanja.',
  ogTitle: `Pretraživanje: ${route.query.value}`,
  ogDescription:
    'Rezultati pretraživanja. Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koji pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće. Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije samo grad — ona je iskustvo koje se pretače u boje, linije i teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći riječima. Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj identitet, bez obzira na promjene. Kroz naš rad želimo spojiti njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
})
</script>

<template><SearchPage /></template>

<style lang="css" scoped></style>
