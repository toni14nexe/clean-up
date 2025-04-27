<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const { $axios } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const showError = ref(false)
const fullscreenLoading = ref(false)
const dbForm = ref()

onMounted(async () => {
  const sessionId = route.query.session_id
  if (!sessionId || !localStorage.getItem('dbForm'))
    return router.push('/kosarica')

  dbForm.value = JSON.parse(localStorage.getItem('dbForm')!)
  localStorage.removeItem('dbForm')

  try {
    const response = await $axios.get(
      `/checkout/check-stripe-payment?session_id=${sessionId}`
    )

    if (response.data.paid) await placePaidOrder()
    else {
      showError.value = true
      setTimeout(() => router.push('/kosarica'), 4000)
    }
  } catch (err) {
    showError.value = true
    ElNotification({
      type: 'error',
      title: 'Neuspješno plaćanje',
      message: 'Došlo je do greške prilikom plaćanja.',
      duration: 5000
    })
    setTimeout(() => router.push('/kosarica'), 4000)
  }
})

async function placePaidOrder() {
  fullscreenLoading.value = true
  try {
    const response = await $axios.post('/order', dbForm.value)
    clearCart()
    navigateTo(`/narudzba/${response.data.id}`)
    ElNotification({
      type: 'success',
      message: 'Uspješno smo zaprimili vašu narudžbu!',
      duration: 10000
    })
  } catch (error) {
    console.error('API Error:', error)
  } finally {
    fullscreenLoading.value = false
  }
}
</script>

<template>
  <ElRow justify="center" v-loading.fullscreen.lock="fullscreenLoading">
    <h2 v-if="showError" style="margin: 100px 0" class="color-danger">
      ❌ Plaćanje nije uspjelo
    </h2>
    <h2 v-else style="margin: 100px 0">Provjera plaćanja...</h2>
  </ElRow>
</template>
