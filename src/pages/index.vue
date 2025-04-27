<script setup lang="ts">
import image8 from '@/assets/images/8.png'
import Categories from '~/components/shared/Categories.vue'
import { ArrowRight, Search } from '@element-plus/icons-vue'

useHead({
  title: 'Naslovnica',
  meta: [
    {
      name: 's.art naslovnica',
      content:
        'Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koij pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće.'
    },
    { property: 'og:title', content: 'Kontakt' },
    {
      property: 'og:description',
      content:
        'Inspirirani ljepotom našeg grada, kroz dizajn prenosimo energiju grada i stvaramo jedinstvene komade koij pričaju priču. Umjetnost koja se nosi, strast koja nas pokreće.'
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

const route = useRoute()
const appSettingsStore = useAppSettingsStore()
const { appSettings } = storeToRefs(appSettingsStore)
const searchValue = ref('')

watch(
  () => route.path,
  () => {
    if (route.name !== 'pretrazivanje') searchValue.value = ''
  }
)

function handleSearch() {
  if (searchValue.value.trim().length < 3)
    ElNotification({
      type: 'warning',
      message: 'Vrijednost pretraživanja ne smije biti kraća od 3 znaka!',
      duration: 3000
    })
  else if (searchValue.value.trim().length > 100)
    ElNotification({
      type: 'warning',
      message: 'Vrijednost pretraživanja ne smije biti duža od 100 znakova!',
      duration: 3000
    })
  else {
    navigateTo(`/pretrazivanje?value=${searchValue.value}`)
  }
}
</script>

<template>
  <div class="mb-24">
    <ClientOnly>
      <div
        class="container"
        :style="
          appSettings?.dashboardTopImage
            ? `background-image: url(${appSettings.dashboardTopImage})`
            : ''
        "
        v-motion-slide-left
        :duration="1000"
        :delay="300"
      >
        <div v-motion-slide-top :duration="1000" :delay="600">
          <ElIcon :size="28">
            <Search />
          </ElIcon>
          <input
            v-model="searchValue"
            placeholder="PRETRAŽI"
            class="search"
            @keyup.enter="handleSearch"
          />
        </div>
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
          <ElCol>
            <NuxtLink
              to="/webshop"
              class="webshop-button"
              v-motion-slide-left
              :duration="1000"
              :delay="1500"
            >
              TRGOVINA
              <ElIcon :size="28" class="ml-16">
                <ArrowRight />
              </ElIcon>
            </NuxtLink>
          </ElCol>
          <ElCol class="paragraph"> STIL KOJI TEČE S TOBOM </ElCol>
          <ElCol class="mt-24">
            <NuxtLink
              to="/motivi"
              class="webshop-button"
              v-motion-slide-left
              :duration="1000"
              :delay="1500"
            >
              GALERIJA MOTIVA
              <ElIcon :size="28" class="ml-16">
                <ArrowRight />
              </ElIcon>
            </NuxtLink>
          </ElCol>
        </ElRow>
      </div>
    </ClientOnly>

    <Categories />

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
            :src="
              appSettings?.dashboardGoalImage
                ? appSettings?.dashboardGoalImage
                : ''
            "
            class="image"
          />
        </ClientOnly>
      </ElCol>
      <ElCol :span="1" class="hidden-sm-and-up" />
      <ElCol :xs="1" :sm="1" />
      <ElCol :xs="22" :sm="7">
        <ClientOnly>
          <img
            :src="
              appSettings?.dashboardArtImage
                ? appSettings?.dashboardArtImage
                : ''
            "
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
            :src="
              appSettings?.dashboardArtImage
                ? appSettings?.dashboardArtImage
                : ''
            "
            class="image hidden-md-and-up"
          />
        </ClientOnly>
      </ElCol>
    </ElRow>

    <ClientOnly>
      <img
        :src="appSettings?.dashboardFooter ? appSettings?.dashboardFooter : ''"
        class="vidimo-se-image"
      />
    </ClientOnly>
  </div>
</template>

<style lang="css" scoped>
.container {
  height: calc(100dvh - 80px);
  min-height: fit-content;
  padding: 20px 0;
  background-size: contain;
  background-position: 120% center;
  background-repeat: no-repeat;
}
.search {
  margin-top: 70px;
  margin-left: -36px;
  background-color: #d9d9d9;
  border: none;
  width: 350px;
  height: 50px;
  text-align: end;
  font-family: amatic;
  font-size: larger;
  padding: 0 20px;
  border-radius: 4px;
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
.webshop-button {
  color: black;
  background-color: #d9d9d9;
  padding: 5px 122px;
  font-size: larger;
  border-radius: 4px;
  text-decoration: none;
  transition: 0.2s ease-in-out;
}
.webshop-button:hover {
  background-color: #b2b2b2;
  transition: 0.2s ease-in-out;
}
.paragraph {
  margin-top: 25px;
  color: black;
  font-size: larger;
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
  .image {
    width: 100%;
    height: auto;
  }
  .search {
    width: 260px;
  }
  .big-title {
    font-size: 70px;
  }
  .waves-image {
    width: 100%;
  }
  .webshop-button {
    padding: 5px 50px;
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
