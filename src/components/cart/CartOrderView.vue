<script setup lang="ts">
import { ShoppingCartFull } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Back } from '@element-plus/icons-vue'

interface RuleForm {
  totalPrice: number
  buyerFullname: string
  buyerEmail: string
  buyerNumber: string
  buyerAddress: string
  buyerPlace: string
  objectType: string
  date: Date | string
  time: string
  datetime: Date | undefined
  persons: number
  additional: string[]
  payment: string
  description: string
}

const emits = defineEmits(['backStep'])

const { $axios } = useNuxtApp()
const fullscreenLoading = ref(false)
const ruleFormRef = ref<FormInstance>()
const objectTypes = ref([
  'Kuća / Stan',
  'Ured',
  'Stubište',
  'Vila',
  'Apartman(i)',
  'Soba / Sobe'
])
const additionalOptions = ref([
  { label: 'Eko sredstva + 5€', price: 5 },
  { label: 'Ljestve + 5€', price: 5 },
  { label: 'Parni čistać + 5€', price: 5 },
  { label: 'Visokotlačni čistać + 5€', price: 5 }
])
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const form = reactive<RuleForm>({
  totalPrice: 0,
  buyerFullname: '',
  buyerEmail: '',
  buyerNumber: '',
  buyerAddress: '',
  buyerPlace: '',
  payment: '',
  objectType: 'Kuća / Stan',
  date: tomorrow,
  time: '9:00',
  datetime: undefined,
  persons: 1,
  additional: [],
  description: ''
})
const rules = reactive<FormRules<RuleForm>>({
  buyerFullname: [
    { required: true, message: 'Unesite ime i prezime', trigger: 'change' },
    {
      validator: (_, value, callback) => {
        if (!validateFullname(value))
          callback(new Error('Ispravno unesite ime i prezime'))
        else callback()
      },
      trigger: 'change'
    }
  ],
  buyerEmail: [
    { required: true, message: 'Unesite email', trigger: 'change' },
    {
      validator: (_, value, callback) => {
        if (!validateEmail(value)) callback(new Error('Unesite ispravni email'))
        else callback()
      },
      trigger: 'change'
    }
  ],
  buyerAddress: [
    { required: true, message: 'Unesite adresu', trigger: 'change' },
    {
      validator: (_, value, callback) => {
        if (!validateAddress(value))
          callback(new Error('Unesite ispravnu adresu'))
        else callback()
      },
      trigger: 'change'
    }
  ],
  buyerNumber: [
    { required: true, message: 'Unesite mjesto', trigger: 'change' },
    {
      validator: (_, value, callback) => {
        if (!validateMobileNumber(value))
          callback(new Error('Unesite ispravni broj mobitela'))
        else callback()
      },
      trigger: 'change'
    }
  ],
  buyerPlace: [
    { required: true, message: 'Unesite mjesto', trigger: 'change' },
    { min: 3, message: 'Unesite ispravno mjesto', trigger: 'change' }
  ],
  description: [
    {
      max: 300,
      message: 'Maximalno 300 znakova',
      trigger: 'change'
    }
  ],
  payment: [
    { required: true, message: 'Odaberite način plaćanja', trigger: 'change' }
  ],
  objectType: [
    { required: true, message: 'Odaberite objekt', trigger: 'change' }
  ],
  date: [{ required: true, message: 'Odaberite datum', trigger: 'change' }],
  time: [{ required: true, message: 'Odaberite vrijeme', trigger: 'change' }],
  persons: [
    { required: true, message: 'Odaberite broj djelatnika', trigger: 'change' }
  ]
})
const disablePastDates = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date <= today
}
const totalPrice = computed(() => {
  const base = getCartTotal()
  const additionalSum = form.additional
    .map(label => {
      const item = additionalOptions.value.find(opt => opt.label === label)
      return item ? item.price : 0
    })
    .reduce((a, b) => a + b, 0)
  return (base + additionalSum).toFixed(2)
})

function setDates() {
  const [hours, minutes] = form.time.split(':').map(Number)
  const combined = new Date(form.date)
  combined.setHours(hours, minutes, 0, 0)
  form.datetime = combined
  form.date = formatISOToDate(combined.toISOString())
}

async function proceed(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate(async valid => {
    if (valid) {
      setDates()

      if (form.payment === 'Gotovinom') {
        placeCashOrder()
      } else if (form.payment === 'Karticom jednokratno') {
        fullscreenLoading.value = true
        try {
          const amount = Number(totalPrice.value)
          const cartList = getCartItems()
          localStorage.setItem(
            'dbForm',
            JSON.stringify({
              ...form,
              list: cartList,
              totalPrice: Number(totalPrice.value)
            })
          )
          const { data } = await $axios.post('/checkout', {
            amount,
            description: `Narudžba kupca ${form.buyerFullname} (${form.buyerEmail})`
          })
          window.location.href = data.url
        } catch (error) {
          console.error('Stripe error:', error)
          ElNotification({
            type: 'error',
            message: 'Greška prilikom pokretanja plaćanja!',
            duration: 5000
          })
        } finally {
          fullscreenLoading.value = false
        }
      }
    }
  })
}

async function placeCashOrder() {
  fullscreenLoading.value = true
  const cartList = getCartItems()
  try {
    const response = await $axios.post('/order', {
      ...form,
      list: cartList,
      totalPrice: totalPrice.value
    })

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
  <div class="page-container">
    <ElRow align="middle" justify="center">
      <h3 class="color-primary">Narudžba</h3>
    </ElRow>
    <ElRow justify="center" align="middle">
      <ElForm
        :label-position="$viewport.isLessThan('tablet') ? 'top' : 'left'"
        require-asterisk-position="right"
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <ElFormItem label="Ime i prezime" prop="buyerFullname">
          <ElInput
            v-model="form.buyerFullname"
            placeholder="Pero Perić"
            autocomplete="name"
            class="maxw-300"
          />
        </ElFormItem>
        <ElFormItem label="Email" prop="buyerEmail">
          <ElInput
            v-model="form.buyerEmail"
            placeholder="pero.peric@mail.com"
            autocomplete="email"
            class="maxw-300"
          />
        </ElFormItem>
        <ElFormItem label="Broj mobitela" prop="buyerNumber">
          <ElInput
            v-model="form.buyerNumber"
            placeholder="+385912345678"
            autocomplete="tel"
            class="maxw-300"
          />
        </ElFormItem>
        <ElFormItem label="Adresa" prop="buyerAddress">
          <ElInput
            v-model="form.buyerAddress"
            placeholder="Trg J. b. Jelačića 123AB"
            autocomplete="street-address"
            class="maxw-300"
          />
        </ElFormItem>
        <ElFormItem label="Mjesto" prop="buyerPlace">
          <ElInput
            v-model="form.buyerPlace"
            placeholder="Zagreb"
            autocomplete="address-level2"
            class="maxw-300"
          />
        </ElFormItem>

        <ElDivider />

        <ElFormItem label="Objekt" prop="objectType" class="mt-16">
          <ElSelect
            v-model="form.objectType"
            placeholder="Odaberite objekt"
            class="maxw-300"
          >
            <ElOption
              v-for="object in objectTypes"
              :key="object"
              :label="object"
              :value="object"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="Datum" prop="date">
          <ElDatePicker
            v-model="form.date"
            type="date"
            format="DD.MM.YYYY."
            :disabled-date="disablePastDates"
            :clearable="false"
            class="maxw-300"
          />
        </ElFormItem>

        <ElFormItem label="Vrijeme" prop="time">
          <ElTimePicker
            v-model="form.time"
            arrow-control
            placeholder="Vrijeme"
            format="HH:mm"
            value-format="HH:mm"
            :clearable="false"
            class="maxw-300"
          />
        </ElFormItem>

        <ElFormItem label="Djelatnika" prop="persons">
          <ElSelect
            v-model="form.persons"
            placeholder="Odaberite djelatnike"
            class="maxw-300"
          >
            <ElOption
              v-for="number in 5"
              :key="number"
              :label="number"
              :value="number"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="Dodatno" prop="additional">
          <ElSelect
            v-model="form.additional"
            placeholder="Dodatno"
            multiple
            class="multiselect"
          >
            <ElOption
              v-for="option in additionalOptions"
              :key="option.label"
              :label="option.label"
              :value="option.label"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="Napomena" prop="description">
          <ElInput
            v-model="form.description"
            placeholder="Napomena..."
            type="textarea"
            autosize
            :rows="2"
            class="maxw-300"
          />
        </ElFormItem>

        <ElDivider />

        <ElFormItem label="Plaćanje" prop="payment" class="mt-16">
          <ElRadioGroup v-model="form.payment" class="maxw-100">
            <ElRadio value="Gotovinom" size="large">Gotovinom</ElRadio>
            <ElRadio value="Karticom jednokratno" size="large"
              >Karticom - jednokratno</ElRadio
            >
          </ElRadioGroup>
        </ElFormItem>

        <ElDivider />

        <ElFormItem label="Ukupna cijena" prop="totalPrice" class="mt-16">
          <b class="ml-4 total-price">{{ totalPrice }} €</b>
        </ElFormItem>

        <ElDivider />
      </ElForm>
    </ElRow>

    <ElRow justify="center" align="middle" class="mt-24">
      <ElButton type="danger" plain size="large" @click="emits('backStep')">
        <ElIcon :size="20" class="mr-8"><Back /></ElIcon>
        Natrag
      </ElButton>
      <ElButton
        type="primary"
        plain
        size="large"
        @click="proceed(ruleFormRef)"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        <ElIcon :size="20" class="mr-8"><ShoppingCartFull /></ElIcon>
        Naruči
      </ElButton>
    </ElRow>
  </div>
</template>

<style lang="css" scoped>
.product-card {
  min-height: 147px;
  width: fit-content;
  height: fit-content;
  padding: 1rem 1rem;
}
.total-price {
  font-size: 18px;
}
.multiselect {
  max-width: 220.66px;
}
.w-200 {
  width: 200px;
}
.maxw-100 {
  max-width: 100px;
}
.maxw-300 {
  max-width: 300px;
}
</style>
