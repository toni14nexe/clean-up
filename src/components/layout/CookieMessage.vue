<script setup lang="ts">
import { ref } from 'vue'

const cookieAgreement = useCookie<string | null>('cookie_agreement', {
  default: () => null,
  secure: true,
  expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 365 days expiration time
})

const show = ref(!cookieAgreement.value)

function acceptCookies() {
  cookieAgreement.value = '1'
  show.value = false
}
</script>

<template>
  <div v-if="show" class="cookie-message-container">
    <ElRow>
      <h3>Postavke kolačića</h3>
    </ElRow>
    <ElRow>
      <p>
        U svrhu pružanja boljeg korisničkog iskustva, Horizon Escape koristi
        obavezne kolačiće (cookies). Detaljne informacije možete pronaći na
        stranici <a href="/cookies" class="link">Politika kolačića</a>.
      </p>
    </ElRow>
    <ElButton plain size="large" @click="acceptCookies">Razumijem</ElButton>
  </div>
</template>

<style scoped>
.cookie-message-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 2px solid black;
  color: white;
  padding: 36px;
  text-align: center;
  font-weight: 700;
  z-index: 9999;
  font-size: 18px;
}
h3,
p {
  color: black;
}
.link {
  color: gray;
  transition: 0.2s ease-in-out;
}
.link:hover {
  color: lightgray;
  transition: 0.2s ease-in-out;
}
@media (max-width: 767px) {
  .cookie-message-container {
    font-size: 14px;
  }
}
</style>
