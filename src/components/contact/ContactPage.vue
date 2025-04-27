<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import FacebookIcon from '~/assets/icons/facebook.vue'
import InstagramIcon from '~/assets/icons/instagram.vue'
import TikTokIcon from '~/assets/icons/tiktok.vue'
import ContactImage from '@/assets/images/contact.jpg'

interface RuleForm {
  fullname: string
  email: string
  message: string
}

const { $axios } = useNuxtApp()
const ruleFormRef = ref<FormInstance>()
const loading = ref({ submit: false })
const form = reactive<RuleForm>({
  fullname: '',
  email: '',
  message: ''
})
const rules = reactive<FormRules<RuleForm>>({
  fullname: [{ max: 100, message: 'Maximalno 100 znakova', trigger: 'change' }],
  email: [
    { required: true, message: 'Unesite email adresu', trigger: 'blur' },
    {
      validator: (_, value, callback) => {
        if (!validateEmail(value)) callback(new Error('Netočna email adresa'))
        else callback()
      },
      trigger: 'blur'
    }
  ],
  message: [
    { min: 10, message: 'Minimalno 10 znakova', trigger: 'change' },
    { max: 10000, message: 'Maximalno 10,000 znakova', trigger: 'change' }
  ]
})

async function sendMessage(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate(async valid => {
    if (valid) {
      loading.value.submit = true
      try {
        await $axios.post(`/contact/email`, form)
        ElNotification({
          type: 'success',
          message: 'Email je uspješno poslan.',
          duration: 3000
        })
        form.fullname = ''
        form.email = ''
        form.message = ''
      } catch (error) {
        ElNotification({
          type: 'error',
          message: 'Došlo je do greške prilikom slanja emaila.',
          duration: 3000
        })
        console.error('API Error:', error)
      } finally {
        loading.value.submit = false
      }
    }
  })
}
</script>

<template>
  <div class="page-container mb-24">
    <ElRow align="middle" justify="center">
      <h1 class="color-primary">KONTAKTIRAJTE NAS</h1>
    </ElRow>

    <ElRow justify="center">
      <ClientOnly>
        <img
          :src="ContactImage"
          alt="Kontakt slika"
          style="max-width: 100%; max-height: 40dvh; border-radius: 8px"
          class="mb-24"
        />
      </ClientOnly>
    </ElRow>

    <ElRow align="middle">
      <ElCol>
        <span
          ><b>Imate pitanje, prijedlog ili želite podijeliti dojam?</b></span
        >
      </ElCol>
      <ElCol>
        <span><b>Tu smo da slušamo, odgovorimo i povežemo se.</b></span>
      </ElCol>
    </ElRow>
    <ElRow align="middle"> </ElRow>
    <ElRow align="middle">
      <ElCol>
        <p>
          Bilo da vas zanima rad, suradnja, ili jednostavno želite reći “hej” —
          slobodno nam pišite.
        </p>
      </ElCol>
      <ElCol>
        <span>Vaša poruka nam znači.</span>
      </ElCol>
    </ElRow>
    <ElRow align="middle">
      <p>
        Kontaktirajte nas putem obrasca ispod ili na našu email adresu:
        <a href="mailto:info@horizon-escape.hr"> info@horizon-escape.hr </a>
      </p>
    </ElRow>
    <ElRow>
      <ElCol class="small-text">Horizon Escape d.o.o.</ElCol>
      <ElCol class="small-text">Stara cesta 3, 23241 Poličnik</ElCol>
      <ElCol class="small-text">OIB: 45285939281</ElCol>
      <ElCol class="small-text">Telefon: info@horizon-escape.hr</ElCol>
      <ElCol class="small-text">Banka: TODO</ElCol>
      <ElCol class="small-text">SWIFT/BIC: TODO</ElCol>
      <ElCol class="small-text">IBAN: TODO</ElCol>
    </ElRow>

    <ElRow justify="center" align="middle" class="w-100 mt-16">
      <NuxtLink to="TODO" class="icon-link ml-4" target="_blank">
        <ElIcon :size="40">
          <FacebookIcon />
        </ElIcon>
      </NuxtLink>
      <NuxtLink to="TODO" class="icon-link ml-4" target="_blank">
        <ElIcon :size="40">
          <InstagramIcon />
        </ElIcon>
      </NuxtLink>
      <NuxtLink to="TODO" class="icon-link ml-4" target="_blank">
        <ElIcon :size="40">
          <TikTokIcon />
        </ElIcon>
      </NuxtLink>
    </ElRow>

    <ElRow align="middle" justify="center">
      <h1 class="color-primary">Poruka</h1>
    </ElRow>

    <ElRow justify="center">
      <ElForm
        :label-position="$viewport.isLessThan('tablet') ? 'top' : 'left'"
        require-asterisk-position="right"
        ref="ruleFormRef"
        class="form"
        :model="form"
        :rules="rules"
        label-width="auto"
        status-icon
        style="width: 100%"
      >
        <ElFormItem label="" prop="fullname">
          <ElInput
            v-model="form.fullname"
            type="text"
            placeholder="Pero Perić"
            class="max-w-250"
          />
        </ElFormItem>
        <ElFormItem label="" prop="email">
          <ElInput
            v-model="form.email"
            type="text"
            placeholder="pero.peric@mail.com"
            class="max-w-250"
          />
        </ElFormItem>
        <ElFormItem prop="message">
          <ElInput
            v-model="form.message"
            :autosize="{ minRows: 6 }"
            type="textarea"
            placeholder="Poruka..."
          />
        </ElFormItem>
        <ElRow
          align="middle"
          :justify="$viewport.isLessThan('tablet') ? 'center' : 'end'"
          class="mt-16"
        >
          <ElButton
            type="primary"
            :loading="loading.submit"
            @click="sendMessage(ruleFormRef)"
            size="large"
            >Pošalji
          </ElButton>
        </ElRow>
      </ElForm>
    </ElRow>
  </div>
</template>

<style scoped>
p,
span {
  letter-spacing: 0.75px;
  color: #737373;
  font-size: 18px;
  font-weight: 500;
}
.small-text {
  font-weight: 600;
  letter-spacing: 0.75px;
  color: #737373;
  font-size: 14px;
  font-weight: 500;
}
.icon-link {
  color: var(--el-text-color-secondary);
  transition: 0.3s ease-in-out;
}
.icon-link:hover {
  color: var(--el-color-primary);
}
</style>
