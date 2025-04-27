<script lang="ts" setup>
import WebshopCategoryPage from '~/components/webshop/WebshopCategoryPage.vue'

const route = useRoute()
const title = `${route.params.categoryName[0].toUpperCase()}${route.params.categoryName.slice(1, route.params.categoryName.length)}`

useHead({
  title: `${title}`,
  meta: [
    {
      name: 'description',
      content: `Ovdje možete pronaći sve s.art proizvode vezane uz ${title}. Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koji pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće. Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije samo grad — ona je iskustvo koje se pretače u boje, linije i teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći riječima. Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj identitet, bez obzira na promjene. Kroz naš rad želimo spojiti njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.`
    },
    { property: 'og:title', content: 's.art - Trgovina' },
    {
      property: 'og:description',
      content: `Ovdje možete pronaći sve naše proizvode vezane uz ${title}. Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koji pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće. Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije samo grad — ona je iskustvo koje se pretače u boje, linije i teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći riječima. Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj identitet, bez obzira na promjene. Kroz naš rad želimo spojiti njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.`
    }
  ]
})

useSeoMeta({
  description: `Ovdje možete pronaći sve naše proizvode vezane uz ${title}.`,
  ogTitle: `Trgovina - ${title}`,
  ogDescription: `Ovdje možete pronaći sve naše proizvode vezane uz ${title}.`,
  ogImage:
    'https://res.cloudinary.com/dnu0ujasf/image/upload/v1757004814/favicon-180x180_shzfaw.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnu0ujasf/image/upload/v1757004814/favicon-180x180_shzfaw.png'
})
</script>

<template><WebshopCategoryPage :title="title" /></template>

<style lang="css" scoped></style>
