<script setup lang="ts">
import backgroundImage from '@/assets/images/background.jpg'
import dashboardLeftImage from '@/assets/images/dashboard-left.jpg'
import dashboardRightImage from '@/assets/images/dashboard-right.jpg'
import Categories from '~/components/shared/Categories.vue'
import { Search } from '@element-plus/icons-vue'

useHead({
  title: 'Naslovnica',
  meta: [
    {
      name: 'Agencija za Čišćenje Horizon',
      content:
        'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.'
    },
    { property: 'og:title', content: 'Kontakt' },
    {
      property: 'og:description',
      content:
        'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.'
    }
  ]
})

useSeoMeta({
  description:
    'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.',
  ogTitle: `Naslovnica`,
  ogDescription:
    'Agencija za čišćenje Horizon — profesionalne usluge čišćenja domova, apartmana, poslovnih prostora i turističkog smještaja. Brzo, pouzdano i temeljito.',
  ogImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png',
  twitterCard: 'summary_large_image',
  twitterImage:
    'https://res.cloudinary.com/dnahqjamb/image/upload/v1763502590/favicon-180x180_ajos55.png'
})

const route = useRoute()
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
          Agencija za Čišćenje Horizon
        </div>
        <div class="ml-16" v-motion-slide-top :duration="1000" :delay="600">
          <ElIcon :size="18">
            <Search />
          </ElIcon>
          <input
            v-model="searchValue"
            placeholder="Pretraži..."
            class="search"
            @keyup.enter="handleSearch"
          />
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

    <Categories />

    <ElRow>
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
            inspiraciju, te daje temelj za kvalitetniji život. Agencija za
            Čišćenje Horizon objedinjuje profesionalnost, pouzdanost i moderni
            pristup čišćenju — stvarajući prostore u kojima se može istinski
            živjeti, raditi i odmarati.
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
  </div>
</template>

<style lang="css" scoped>
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
.container {
  height: calc(100dvh - 80px);
  min-height: fit-content;
  padding: 20px 0;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}
.on-image-text {
  margin-left: 8px;
  color: black;
  font-weight: 600;
  max-width: 800px;
}
.search {
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: -36px;
  background-color: white;
  border: none;
  width: 350px;
  height: 50px;
  text-align: end;
  font-family: 'Inclusive Sans';
  font-size: 18px;
  padding: 0 20px;
  border-radius: 4px;
  border: 2px solid #409eff;
}
.big-title {
  margin-top: 70px;
  font-size: 80px;
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
  .search {
    width: 260px;
  }
  .big-title {
    margin-top: 24px;
    font-size: 34px;
  }
  .waves-image {
    width: 100%;
  }
  .on-image-text {
    font-size: 18px;
  }
}
</style>
