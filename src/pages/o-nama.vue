<script setup lang="ts">
import backgroundImage from '@/assets/images/background.jpg'
import dashboardRightImage from '@/assets/images/dashboard-right.jpg'
import dashboardLeftImage from '@/assets/images/dashboard-left.jpg'

useHead({
  title: 'O nama',
  meta: [
    {
      name: 'O nama',
      content: 'TODO'
    },
    { property: 'og:title', content: 'Kontakt' },
    {
      property: 'og:description',
      content: 'TODO'
    }
  ]
})

useSeoMeta({
  description: 'TODO',
  ogTitle: `Kontakt`,
  ogDescription: 'TODO',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763395851/favicon-180x180_lamunf.png'
})
</script>

<template>
  <div class="page-container mb-24">
    <ClientOnly>
      <div style="height: calc(100vh - 60px)">
        <div
          class="background-image"
          :style="`background-image: url(${backgroundImage})`"
          v-motion-slide-left
          :duration="1000"
          :delay="300"
        />
        <div
          class="big-title"
          v-motion-slide-left
          :duration="1000"
          :delay="900"
        >
          HORIZON ESCAPE
        </div>
        <p
          v-motion-slide-bottom
          :duration="1000"
          :delay="600"
          class="on-image-text"
        >
          Čistoća je za nas više od urednog prostora — ona je osjećaj lakoće,
          jasnoće i novog početka.
        </p>
      </div>
    </ClientOnly>

    <ElRow
      class="mt-24 mb-24"
      style="text-align: center"
      justify="center"
      align="middle"
    >
      <p style="width: 80%">
        Inspirirani svježinom koju donosi uredan prostor, stvaramo okruženja
        koja vraćaju ravnotežu i jasnoću. Vjerujemo da čistoća nije samo
        vizualni dojam — to je energija koju prostor šalje, osjećaj koji te
        dočeka čim uđeš. HORIZON ESCAPE nastao je iz želje da svaki dom i radni
        prostor dobije novu dimenziju udobnosti i mira.
      </p>
    </ElRow>

    <ClientOnly>
      <ElRow class="middle-container">
        <ElCol :xs="24" :sm="12" align="center">
          <div
            class="middle-image-wrapper"
            :style="`background-image: url(${dashboardLeftImage})`"
          />
        </ElCol>
        <ElCol :xs="24" :sm="12" align="center">
          <div
            class="middle-image-wrapper"
            :style="`background-image: url(${dashboardRightImage})`"
          />
        </ElCol>
      </ElRow>
    </ClientOnly>

    <ElRow class="background-container">
      <ElCol :xs="1" :sm="4" />
      <ElCol :xs="22" :sm="7">
        <h2>Čistoća</h2>
        <p>
          <b>
            Čistoća je za nas više od urednog prostora — ona je osjećaj lakoće,
            jasnoće i novog početka. Svaki dom, ured ili prostor nosi svoju
            energiju, a naš je zadatak istaknuti njezinu najbolju verziju. Kroz
            pažnju prema detaljima i predan rad stvaramo okruženje u kojem se
            ljudi mogu ponovno povezati sa sobom i svojim prostorom.
          </b>
        </p>
        <ClientOnly>
          <div
            :style="`background-image: url(${dashboardLeftImage})`"
            class="image"
          />
        </ClientOnly>
      </ElCol>
      <ElCol :span="1" class="hidden-sm-and-up" />
      <ElCol :xs="1" :sm="1" />
      <ElCol :xs="22" :sm="7">
        <ClientOnly>
          <div
            :style="`background-image: url(${dashboardRightImage})`"
            class="image hidden-sm-and-down"
          />
        </ClientOnly>
        <h2>Naša misija</h2>
        <p>
          <b>
            Naša misija je pretvoriti svaki prostor u mjesto koje diše svježinom
            i harmonijom. Vjerujemo da čisto okruženje donosi mir, fokus i
            inspiraciju, te daje temelj za kvalitetniji život. HORIZON ESCAPE
            objedinjuje profesionalnost, pouzdanost i moderni pristup čišćenju —
            stvarajući prostore u kojima se može istinski živjeti, raditi i
            odmarati.
          </b>
        </p>
        <ClientOnly>
          <div
            :style="`background-image: url(${dashboardRightImage})`"
            class="image hidden-md-and-up"
          />
        </ClientOnly>
      </ElCol>
    </ElRow>

    <ElRow class="mt-24">
      <ElCol class="company-info-text" align="center"
        >Horizon Escape d.o.o.</ElCol
      >
      <ElCol class="company-info-text" align="center"
        >Stara cesta 3, 23241 Poličnik</ElCol
      >
      <ElCol class="company-info-text" align="center">OIB: 45285939281</ElCol>
      <ElCol class="company-info-text" align="center"
        >Email: info@horizon-escape.hr</ElCol
      >
      <ElCol class="company-info-text" align="center">Telefon: TODO</ElCol>
      <ElCol class="company-info-text" align="center">Banka: TODO</ElCol>
      <ElCol class="company-info-text" align="center">SWIFT/BIC: TODO</ElCol>
      <ElCol class="company-info-text" align="center">IBAN: TODO</ElCol>
    </ElRow>
  </div>
</template>

<style lang="css" scoped>
.container {
  height: calc(100dvh - 80px);
  padding: 20px 0;
  background-size: contain;
  background-position: center right;
  background-repeat: no-repeat;
}
.big-title {
  margin-top: 70px;
  font-size: 80px;
}
.background-image {
  max-width: 1920px;
  position: fixed;
  top: 0;
  width: 100vw;
  height: calc(100dvh - 60px);
  margin-top: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.4 !important;
  z-index: 0;
}
.company-info-text {
  font-weight: 600;
  letter-spacing: 0.75px;
  color: #737373;
  font-size: 16px;
  font-weight: 500;
}
.middle-container {
  height: 80dvh;
}
.middle-image-wrapper {
  width: 98%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.image {
  height: 500px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 24px 0;
  border-radius: 8px;
}
h2 {
  color: black;
  font-weight: 700;
  letter-spacing: 2px;
}
p {
  font-weight: 300;
  letter-spacing: 0.75px;
  color: #737373;
}
.on-image-text {
  margin-left: 8px;
  color: black;
  font-weight: 600;
  max-width: 800px;
}
@media only screen and (max-width: 991px) {
  h1 {
    font-size: 24px;
  }
  p {
    font-size: 14px;
  }
  .on-image-text {
    font-size: 24px;
  }
}
@media only screen and (max-width: 768px) {
  .image {
    height: 300px;
  }
  .big-title {
    margin-top: 24px;
    font-size: 34px;
  }
  .on-image-text {
    font-size: 18px;
  }
  .middle-container {
    height: 500px;
  }
  .middle-image-wrapper {
    width: 100%;
  }
}
</style>
