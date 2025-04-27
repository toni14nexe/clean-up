<script setup lang="ts">
useHead({
  title: 'Trgovina',
  meta: [
    {
      name: 'description',
      content:
        'Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koji pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće. Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije samo grad — ona je iskustvo koje se pretače u boje, linije i teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći riječima. Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj identitet, bez obzira na promjene. Kroz naš rad želimo spojiti njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.'
    },
    { property: 'og:title', content: 'Backoffice' },
    {
      property: 'og:description',
      content:
        'Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koji pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće. Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije samo grad — ona je iskustvo koje se pretače u boje, linije i teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći riječima. Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj identitet, bez obzira na promjene. Kroz naš rad želimo spojiti njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.'
    }
  ]
})

useSeoMeta({
  description: 'Trgovina - Webshop',
  ogTitle: `Trgovina - Webshop`,
  ogDescription:
    'Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koji pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće. Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije samo grad — ona je iskustvo koje se pretače u boje, linije i teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći riječima. Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj identitet, bez obzira na promjene. Kroz naš rad želimo spojiti njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.',
  ogImage:
    'https://res.cloudinary.com/dnu0ujasf/image/upload/v1757004814/favicon-180x180_shzfaw.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnu0ujasf/image/upload/v1757004814/favicon-180x180_shzfaw.png'
})
</script>

<template>
  <div class="page-container">
    <WebshopPage />
  </div>
</template>

<style lang="css" scoped></style>
