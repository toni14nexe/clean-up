<script setup lang="ts">
useHead({
  title: 'Usluge',
  meta: [
    {
      name: 'description',
      content:
        'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.'
    },
    { property: 'og:title', content: 'Backoffice' },
    {
      property: 'og:description',
      content:
        'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.'
    }
  ]
})

useSeoMeta({
  description: 'Usluge',
  ogTitle: `Usluge`,
  ogDescription:
    'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
})
</script>

<template>
  <div class="page-container">
    <WebshopPage />
  </div>
</template>

<style lang="css" scoped></style>
