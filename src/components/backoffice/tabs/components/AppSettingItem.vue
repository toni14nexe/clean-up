<script setup lang="ts">
import type { UploadFile } from 'element-plus'

const props = defineProps(['setting'])
const emit = defineEmits(['change'])
const { $axios } = useNuxtApp()
const config = useRuntimeConfig()
const cloudinaryPreset = config.public.cloudinaryPreset
const cloudinaryCloudName = config.public.cloudinaryCloudName
const isLoading = ref(false)

async function handleDashboardImageChange(imageData: UploadFile) {
  if (imageData.raw) {
    const formData = new FormData()
    formData.append('file', imageData.raw)
    formData.append('upload_preset', cloudinaryPreset)
    formData.append('resource_type', 'image')

    // First upload image to Cloudinary
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )
      const data = await response.json()
      // Then update DB dashboard image value
      try {
        await $axios.put(`/app-settings/${props.setting.id}`, {
          imageUrl: data.secure_url
        })
        ElNotification({
          type: 'success',
          message: 'Uspješno ste ažurirali postavke.',
          duration: 3000
        })
        emit('change')
      } catch (error) {
        console.error('Upload app-settings error:', error)
        return null
      }
    } catch (error) {
      console.error('Upload failed:', error)
      return null
    }
  }
}
</script>

<template>
  <div>
    <ElRow justify="center">
      <div class="image" :style="`background-image: url(${setting.value});`" />
    </ElRow>

    <ElRow justify="center">
      <p class="image-notification">
        Preporuča se slika u jpg ili jpeg formatu radi bržeg učitavanja i bolje
        optimizacije
      </p>
    </ElRow>

    <ElRow justify="center">
      <ElUpload
        action="#"
        :auto-upload="false"
        accept="image/*"
        @change="handleDashboardImageChange"
      >
        <ElButton type="primary" plain :loading="isLoading"
          >Učitaj novu sliku</ElButton
        >
      </ElUpload>
    </ElRow>
  </div>
</template>

<style lang="css" scoped>
.image {
  width: 300px;
  height: 300px;
  border: 2px solid var(--el-color-primary);
  border-radius: 8px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.image-notification {
  color: var(--el-color-primary);
  font-size: 16px;
  width: 300px;
  text-align: center;
}
</style>
