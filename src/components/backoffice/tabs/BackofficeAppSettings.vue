<script setup lang="ts">
import AppSettingItem from './components/AppSettingItem.vue'

const { $axios } = useNuxtApp()
const isLoading = ref(true)
const appSettings = ref()

onMounted(() => getAppSettingsData())

async function getAppSettingsData() {
  isLoading.value = true
  try {
    const response = await $axios.get('/app-settings')
    appSettings.value = response.data
  } catch (error) {
    console.error('API Error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="backoffice-page">
    <ElRow justify="center">
      <h3 class="color-primary">Postavke aplikacije</h3>
    </ElRow>

    <template v-if="isLoading">
      <span class="color-primary">Učitavanje podataka...</span>
    </template>

    <template v-else>
      <ElRow justify="center">
        <h4 class="color-primary"><b>Naslovna stranica</b></h4>
      </ElRow>

      <ElRow align="middle" :gutter="24">
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Glavna slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[0]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Umjetnost slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[1]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Naš cilj slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[2]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Podnožje slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[3]"
            @change="getAppSettingsData"
          />
        </ElCol>
      </ElRow>

      <ElRow justify="center">
        <h4 class="color-primary"><b>O nama stranica</b></h4>
      </ElRow>

      <ElRow align="middle" :gutter="24">
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Glavna slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[4]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Gore lijevo slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[5]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Gore desno slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[6]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Umjetnost slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[7]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Naš cilj slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[8]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Dolje lijevo slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[9]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Dolje desno slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[10]"
            @change="getAppSettingsData"
          />
        </ElCol>
        <ElCol :span="8" align="middle" class="mt-24">
          <span class="color-primary"><b>Podnožje slika</b></span>
          <AppSettingItem
            class="mt-12"
            :setting="appSettings[11]"
            @change="getAppSettingsData"
          />
        </ElCol>
      </ElRow>
    </template>
  </div>
</template>

<style lang="css" scoped>
.image {
  width: 300px;
  height: auto;
  border: 2px solid var(--el-color-primary);
  border-radius: 8px;
}
.image-notification {
  color: var(--el-color-primary);
  font-size: 16px;
  width: 300px;
  text-align: center;
}
</style>
