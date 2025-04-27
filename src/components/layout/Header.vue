<script setup lang="ts">
import { ShoppingCart, ShoppingCartFull } from '@element-plus/icons-vue'
import LogoIcon from '~/assets/icons/logo.vue'

const { $viewport } = useNuxtApp()
const categoriesStore = useCategoriesStore()
const cartStore = useCartStore()
const { cartChangeState } = storeToRefs(cartStore)
const route = useRoute()
const mobileSearchPopoverRef = ref()
const searchValue = ref('')
const mounted = ref(false)

onMounted(() => {
  categoriesStore.getCategories()
  mounted.value = true
})

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
    if (mobileSearchPopoverRef.value) mobileSearchPopoverRef.value.hide()
  }
}
</script>

<template>
  <!-- MOBILE HEADER -->
  <div class="sticky">
    <ElHeader>
      <div v-if="$viewport.isLessThan('tablet')" class="header-container">
        <NuxtLink to="/" v-motion-slide-top :duration="1000">
          <ElIcon :size="36">
            <LogoIcon />
          </ElIcon>
        </NuxtLink>
        <NuxtLink
          to="/webshop"
          v-motion-slide-top
          :duration="1000"
          :delay="300"
          class="icon-link"
        >
          <p>TRGOVINA</p>
        </NuxtLink>
        <NuxtLink
          to="/o-nama"
          v-motion-slide-top
          :duration="1000"
          :delay="600"
          class="icon-link"
        >
          <p>O NAMA</p>
        </NuxtLink>
        <NuxtLink
          to="/kontakt"
          v-motion-slide-top
          :duration="1000"
          :delay="900"
          class="icon-link"
        >
          <p>KONTAKT</p>
        </NuxtLink>
        <NuxtLink
          to="/kosarica"
          v-motion-slide-top
          :duration="1000"
          :delay="1200"
          class="icon-link"
        >
          <div :key="cartChangeState">
            <ElRow v-if="!getCartTotal()">
              <ElIcon :size="28">
                <ShoppingCart />
              </ElIcon>
            </ElRow>
            <ElRow v-else justify="end" align="middle">
              <span>{{ getCartCount() > 99 ? '99+' : getCartCount() }}</span>
              <ElIcon :size="36">
                <ShoppingCartFull />
              </ElIcon>
            </ElRow>
          </div>
        </NuxtLink>
      </div>

      <!-- DESKTOP HEADER -->
      <template v-else>
        <ElRow
          justify="space-between"
          align="middle"
          style="width: 100%; padding: 0 20px; background-color: white"
        >
          <ElRow align="middle">
            <NuxtLink to="/" class="title" v-motion-slide-top :duration="1000">
              <h3 :class="{ 'color-primary': route.name === 'index' }">
                <ElRow justify="center" align="middle">
                  <ElIcon :size="36">
                    <LogoIcon style="margin-right: 8px" />
                  </ElIcon>
                  NASLOVNICA
                </ElRow>
              </h3>
            </NuxtLink>
            <NuxtLink
              to="/webshop"
              class="title ml-24"
              v-motion-slide-top
              :duration="1000"
              :delay="300"
            >
              <h3 :class="{ 'color-primary': route.name === 'webshop' }">
                <ElRow justify="center" align="middle"> TRGOVINA </ElRow>
              </h3>
            </NuxtLink>
            <NuxtLink
              to="/o-nama"
              class="title ml-24"
              v-motion-slide-top
              :duration="1000"
              :delay="600"
            >
              <h3 :class="{ 'color-primary': route.name === 'o-nama' }">
                <ElRow justify="center" align="middle"> O NAMA </ElRow>
              </h3>
            </NuxtLink>
            <NuxtLink
              to="/kontakt"
              class="title ml-24"
              v-motion-slide-top
              :duration="1000"
              :delay="900"
            >
              <h3 :class="{ 'color-primary': route.name === 'kontakt' }">
                <ElRow justify="center" align="middle"> KONTAKT </ElRow>
              </h3>
            </NuxtLink>
          </ElRow>
          <ElRow
            align="middle"
            v-motion-slide-top
            :duration="1000"
            :delay="1500"
          >
            <ClientOnly>
              <ElRow
                v-motion-slide-top
                :duration="mounted ? 0 : 400"
                :delay="mounted ? 0 : 1400"
                justify="end"
                align="middle"
                :key="cartChangeState"
              >
                <NuxtLink to="/kosarica" style="text-decoration: none">
                  <ElRow v-if="!getCartTotal()" class="cart">
                    <span class="mr-24">KOŠARICA</span>
                    <ElIcon :size="20">
                      <ShoppingCart />
                    </ElIcon>
                  </ElRow>
                  <ElRow v-else justify="end" align="middle" class="cart">
                    <span class="mr-24">KOŠARICA</span>
                    <span>{{
                      getCartCount() > 99 ? '99+' : getCartCount()
                    }}</span>
                    <ElIcon :size="20">
                      <ShoppingCartFull />
                    </ElIcon>
                  </ElRow>
                </NuxtLink>
              </ElRow>
            </ClientOnly>
          </ElRow>
        </ElRow>
      </template>
    </ElHeader>
  </div>
</template>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 999;
}
.el-header {
  --el-header-padding: 0;
}
.header-container {
  width: 100%;
  background-color: white;
  padding: 12px 5px;
  height: 60px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}
.header-container::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  height: 2px;
  background-color: var(--el-border-color);
}
.title {
  text-decoration: none;
  color: black;
  transition: 0.1s ease-in-out;
  font-size: 18px;
}
.title:hover {
  color: var(--el-color-primary);
  transition: 0.1s ease-in-out;
}
.mobile-portal-more-button {
  width: 100%;
  height: 45px;
  border-radius: 0 8px 8px 0;
  border-left: none;
}
.mobile-portal-more-button:hover {
  color: var(--el-button-hover-text-color) !important;
  background-color: var(--el-color-primary-light-9) !important;
}
.home-icon {
  width: 18px;
  margin-right: 4px;
}
.cart {
  background-color: black;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 18px;
  border: 3px solid black;
  border-radius: 20px;
  padding: 5px 20px;
}
.cart:hover {
  color: var(--el-color-primary);
}
.icon-link {
  color: var(--el-text-color-secondary);
  transition: 0.3s ease-in-out;
  text-decoration: none;
}
.icon-link:hover {
  color: var(--el-color-primary);
}

@media only screen and (max-width: 991px) {
  .title {
    font-size: 14px;
  }
}
@media only screen and (max-width: 768px) {
  a {
    font-size: 18px;
  }
}
@media only screen and (max-width: 415px) {
  a {
    font-size: 16px;
  }
}
@media only screen and (max-width: 340px) {
  a {
    font-size: 14px;
  }
}
</style>
