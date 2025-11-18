<script setup lang="ts">
import FacebookIcon from '~/assets/icons/facebook.vue'
import InstagramIcon from '~/assets/icons/instagram.vue'
import MessageIcon from '~/assets/icons/message.vue'
import FooterMenuCard from '~/components/layout/FooterMenuCard.vue'
import LogoIcon from '~/assets/icons/logo.vue'

defineProps(['dividerMarginTop'])

const categoriesStore = useCategoriesStore()
const { categoriesLoading, webshopCategories } = storeToRefs(categoriesStore)
const mainCategories = ref([
  { id: 1, name: 'Naslovnica', url: '' },
  { id: 2, name: 'Usluge', url: 'webshop' },
  { id: 3, name: 'O nama', url: 'o-nama' },
  { id: 5, name: 'Kontakt', url: 'kontakt' }
])
</script>

<template>
  <div class="footer-top">
    <ElDivider
      class="divider"
      :style="`margin-top: ${dividerMarginTop ? `${dividerMarginTop}px` : '4px'} !important`"
    />

    <FooterMenuCard :categories="mainCategories" title="Izbornik" />

    <FooterMenuCard
      :categories="webshopCategories"
      title="Usluge"
      urlPrefix="/webshop/"
      :loading="categoriesLoading"
    />

    <ElRow
      justify="center"
      align="middle"
      class="w-100 color-zinc text-align-center"
    >
      <NuxtLink to="/kontakt" class="icon-link">
        <ElIcon :size="46">
          <MessageIcon />
        </ElIcon>
      </NuxtLink>
      <NuxtLink
        to="https://web.facebook.com/profile.php?id=100076552197691"
        class="icon-link"
        style="margin-left: 2px"
        target="_blank"
      >
        <ElIcon :size="40">
          <FacebookIcon />
        </ElIcon>
      </NuxtLink>
      <NuxtLink
        to="https://www.instagram.com/agencijazaciscenjezadarhorizon/#"
        class="icon-link ml-4"
        target="_blank"
      >
        <ElIcon :size="40">
          <InstagramIcon />
        </ElIcon>
      </NuxtLink>
    </ElRow>

    <ElRow justify="center" align="middle" style="margin: 16px 0">
      <ElCol align="middle" class="small-text">Horizon Escape d.o.o.</ElCol>
      <ElCol align="middle" class="small-text"
        >Stara cesta 3, 23241 Poličnik</ElCol
      >
      <ElCol align="middle" class="small-text">OIB: 45285939281</ElCol>
      <ElCol align="middle" class="small-text">Telefon: +385 99 7900 257</ElCol>
      <ElCol align="middle" class="small-text"
        >Email:
        <a href="mailto:info@horizon-escape.hr"
          >info@horizon-escape.hr</a
        ></ElCol
      >
      <ElCol align="middle" class="small-text"
        >Banka: Privredna Banka Zagreb</ElCol
      >
      <ElCol align="middle" class="small-text">SWIFT/BIC: PBZGHR2X</ElCol>
      <ElCol align="middle" class="small-text"
        >IBAN: HR9523400091111344203</ElCol
      >
    </ElRow>

    <ElRow justify="center">
      <ElIcon :size="120">
        <LogoIcon />
      </ElIcon>
    </ElRow>

    <ElRow
      justify="center"
      align="middle"
      class="w-100 color-zinc mt-8 text-align-center"
    >
      <NuxtLink to="/kolacici" class="link"> Politika kolačića </NuxtLink>
    </ElRow>
    <ElRow
      justify="center"
      align="middle"
      class="w-100 color-zinc text-align-center"
    >
      <NuxtLink to="/zastita-privatnosti" class="link">
        Zaštita privatnosti
      </NuxtLink>
    </ElRow>
    <ElRow
      justify="center"
      align="middle"
      class="w-100 color-zinc text-align-center"
    >
      <NuxtLink to="/uvjeti-koristenja" class="link">
        Uvjeti korištenja
      </NuxtLink>
    </ElRow>
    <ElRow
      justify="center"
      align="middle"
      class="w-100 color-zinc text-align-center"
    >
      <NuxtLink to="/uvjeti-prodaje" class="link"> Uvjeti prodaje </NuxtLink>
    </ElRow>
    <ElRow
      justify="center"
      align="middle"
      class="w-100 color-zinc text-align-center"
    >
      <NuxtLink to="/online-placanje" class="link"> Online plaćanje </NuxtLink>
    </ElRow>

    <ElRow
      justify="center"
      align="middle"
      class="w-100 color-zinc mt-8 text-align-center fs-16"
    >
      Sva prava pridržana, Horizon Escape d.o.o.
    </ElRow>

    <ElRow
      justify="center"
      align="middle"
      class="w-100 color-zinc mt-8 text-align-center"
    >
      <NuxtLink to="https://innova-tech.hr/" class="link" target="_blank">
        Web aplikaciju izradio Innovatech obrt za informatičke usluge
      </NuxtLink>
    </ElRow>
  </div>

  <ElRow justify="center" align="middle" class="w-100 bottom-line mt-8">
    Copyright © 2025 Horizon Escape d.o.o.
  </ElRow>
</template>

<style scoped>
.divider {
  margin-bottom: 24px !important;
}
.footer-top {
  max-width: calc(1600px - 40px);
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}
.link {
  font-size: 16px;
  color: var(--el-text-color-secondary);
}
.link:hover {
  text-decoration: none;
  color: var(--el-color-primary);
}
.icon-link {
  color: var(--el-text-color-secondary);
  transition: 0.3s ease-in-out;
}
.icon-link:hover {
  color: var(--el-color-primary);
}
.bottom-line {
  background-color: var(--el-text-color-secondary);
  height: 30px;
  font-size: small;
}
.color-zinc {
  color: var(--el-text-color-secondary);
}
.text-align-center {
  text-align: center;
}
.fs-16 {
  font-size: 16px;
}
.small-text {
  color: var(--el-text-color-secondary);
  font-size: small;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
