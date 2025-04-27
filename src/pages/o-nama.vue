<script setup lang="ts">
import image8 from '@/assets/images/8.png'

const appSettingsStore = useAppSettingsStore()
const { appSettings } = storeToRefs(appSettingsStore)

useHead({
  title: 'O nama',
  meta: [
    {
      name: 's.art - O nama',
      content:
        'Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koji pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće. Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije samo grad — ona je iskustvo koje se pretače u boje, linije i teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći riječima. Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj identitet, bez obzira na promjene. Kroz naš rad želimo spojiti njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.'
    },
    { property: 'og:title', content: 'Kontakt' },
    {
      property: 'og:description',
      content:
        'Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koji pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće. Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije samo grad — ona je iskustvo koje se pretače u boje, linije i teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći riječima. Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj identitet, bez obzira na promjene. Kroz naš rad želimo spojiti njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.'
    }
  ]
})

useSeoMeta({
  description:
    'Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koji pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće. Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije samo grad — ona je iskustvo koje se pretače u boje, linije i teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći riječima. Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj identitet, bez obzira na promjene. Kroz naš rad želimo spojiti njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.',
  ogTitle: `Kontakt`,
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
  <div class="page-container mb-24">
    <ClientOnly>
      <div
        class="container"
        :style="
          appSettings?.aboutUsMain
            ? `background-image: url(${appSettings.aboutUsMain})`
            : ''
        "
        v-motion-slide-left
        :duration="1000"
        :delay="300"
      >
        <ElRow>
          <ElCol :span="8" align="center">
            <div
              class="big-title"
              v-motion-slide-left
              :duration="1000"
              :delay="900"
            >
              S.ART
            </div>
          </ElCol>
          <ElCol :span="16" />
          <ElCol :span="8" align="center">
            <div
              class="waves-image"
              :style="{ backgroundImage: `url(${image8})` }"
              v-motion-slide-bottom
              :duration="1000"
              :delay="1200"
            />
          </ElCol>
          <ElCol :span="16" />
        </ElRow>
      </div>
    </ClientOnly>

    <ElRow
      class="mt-24 mb-24"
      style="text-align: center"
      justify="center"
      align="middle"
    >
      <h3 style="width: 80%">
        inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i
        stvaramo jedinstvene komade koji pričaju priču. umjetnost koja se nosi,
        strast koja nas pokreće.
      </h3>
    </ElRow>

    <ClientOnly>
      <ElRow class="middle-container mt-24 mb-24">
        <ElCol
          :xs="24"
          :sm="12"
          class="middle-image-wrapper"
          :style="
            appSettings?.aboutUsTopLeft
              ? `background-image: url(${appSettings.aboutUsTopLeft})`
              : ''
          "
          align="left"
        />
        <ElCol
          :xs="24"
          :sm="12"
          class="middle-image-wrapper"
          :style="
            appSettings?.aboutUsTopRight
              ? `background-image: url(${appSettings.aboutUsTopRight})`
              : ''
          "
          align="right"
        />
      </ElRow>
    </ClientOnly>

    <ElRow class="background-container">
      <ElCol :xs="1" :sm="4" />
      <ElCol :xs="22" :sm="7">
        <h2>Umjetnost</h2>
        <p>
          <b>
            Kroz umjetnost istražujemo kako prostor postaje osjećaj. Rijeka nije
            samo grad — ona je iskustvo koje se pretače u boje, linije i
            teksture. Kroz vizualni jezik bilježimo ono što se ne može izreći
            riječima.
          </b>
        </p>
        <ClientOnly>
          <img
            :src="appSettings?.aboutUsGoal ? appSettings?.aboutUsGoal : ''"
            class="image"
          />
        </ClientOnly>
      </ElCol>
      <ElCol :span="1" class="hidden-sm-and-up" />
      <ElCol :xs="1" :sm="1" />
      <ElCol :xs="22" :sm="7">
        <ClientOnly>
          <img
            :src="appSettings?.aboutUsArt ? appSettings?.aboutUsArt : ''"
            class="image hidden-sm-and-down"
          />
        </ClientOnly>
        <h2>Naš cilj</h2>
        <p>
          <b>
            Naš cilj je očuvati duh Rijeke – grada koji nikad ne gubi svoj
            identitet, bez obzira na promjene. Kroz naš rad želimo spojiti
            njezinu industrijsku prošlost, suvremeni puls i neukrotivu slobodu.
          </b>
        </p>
        <ClientOnly>
          <img
            :src="appSettings?.aboutUsArt ? appSettings?.aboutUsArt : ''"
            class="image hidden-md-and-up"
          />
        </ClientOnly>
      </ElCol>
    </ElRow>

    <ElRow
      class="middle-container mb-24"
      :style="`margin-top: ${$viewport.isLessThan('tablet') ? '0' : '150px'};`"
    >
      <ClientOnly>
        <ElCol
          :xs="24"
          :sm="12"
          class="middle-image-wrapper"
          :style="
            appSettings?.aboutUsBottomLeft
              ? `background-image: url(${appSettings.aboutUsBottomLeft})`
              : ''
          "
          align="left"
        />
        <ElCol
          :xs="24"
          :sm="12"
          class="middle-image-wrapper"
          :style="
            appSettings?.aboutUsBottomRight
              ? `background-image: url(${appSettings.aboutUsBottomRight})`
              : ''
          "
          align="right"
        />
      </ClientOnly>
    </ElRow>

    <ClientOnly>
      <img
        :src="appSettings?.aboutUsFooter ? appSettings?.aboutUsFooter : ''"
        class="vidimo-se-image"
      />
    </ClientOnly>
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
  font-size: 150px;
}
.waves-image {
  width: 50%;
  height: 90px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 75px;
}
.background-image {
  height: calc(100dvh - 62px);
  margin-top: -18px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.15;
}
.middle-container {
  height: 80dvh;
}
.middle-image-wrapper {
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
  font-weight: 500;
  letter-spacing: 0.75px;
  color: #737373;
}
.vidimo-se-image {
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
@media only screen and (max-width: 768px) {
  .background-image {
    background-size: 100px;
  }
  .image {
    width: 100%;
    height: auto;
  }
  .big-title {
    font-size: 70px;
  }
  .waves-image {
    width: 100%;
  }
}
@media only screen and (max-width: 991px) {
  h1 {
    font-size: 24px;
  }
  p {
    font-size: 14px;
  }
}
</style>
