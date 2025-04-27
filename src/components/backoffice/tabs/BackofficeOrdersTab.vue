<script setup lang="ts">
import type { Order } from '~/types/webshop'
import { Download, InfoFilled, Search } from '@element-plus/icons-vue'
import Pagination from '~/components/shared/Pagination.vue'

type Sort = {
  column: Object
  order: 'ascending' | 'desceding'
  prop: 'orderNumber' | 'buyerFullname' | 'totalPrice'
}

const { $axios } = useNuxtApp()
const isLoading = ref<{
  orders: boolean
  export: boolean
}>({
  orders: true,
  export: false
})
const orders = ref<Order[]>()
const searchValue = ref('')
const sorting = ref<{
  sort: 'asc' | 'desc'
  sortBy: 'orderNumber' | 'buyerFullname' | 'totalPrice'
}>({
  sort: 'desc',
  sortBy: 'orderNumber'
})
const dialog = ref<{
  isOpened: boolean
  order: Order | undefined
}>({
  isOpened: false,
  order: undefined
})
const pagination = ref({
  page: 1,
  perPage: 10,
  total: 0
})
const isExportDialogOpen = ref(false)
const exportDetails = ref({
  showProducts: false,
  selectDatesSwicth: false,
  timeRange: [],
  timeRangeShortcuts: [
    {
      text: 'Zadnji tjedan',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setDate(start.getDate() - 7)
        return [start, end]
      }
    },
    {
      text: 'Zadnji mjesec',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 1)
        return [start, end]
      }
    },
    {
      text: 'Zadnja 3 mj',
      value: () => {
        const end = new Date()
        const start = new Date()
        start.setMonth(start.getMonth() - 3)
        return [start, end]
      }
    }
  ]
})

onMounted(() => getOrders())

function handleSearch() {
  pagination.value.page = 1
  debounceSearch()
}
const debounceSearch = debounce(getOrders, 300)

async function getOrders() {
  isLoading.value.orders = true
  try {
    const response = await $axios.get(
      `/order?page=${pagination.value.page}&perPage=${pagination.value.perPage}&search=${searchValue.value}&sort=${sorting.value.sort}&sortBy=${sorting.value.sortBy}`
    )
    orders.value = response.data.orders
    pagination.value.total = response.data.total
  } catch (error) {
    console.error('API Error:', error)
  } finally {
    isLoading.value.orders = false
  }
}

function handleOpenDialog(order: Order) {
  dialog.value = {
    isOpened: true,
    order
  }
}

function handleSortChange(sort: Sort) {
  if (sort.order) {
    if (sort.order === 'ascending') sorting.value.sort = 'asc'
    else sorting.value.sort = 'desc'
    sorting.value.sortBy = sort.prop
    pagination.value.page = 1
    getOrders()
  }
}

async function exportData() {
  isLoading.value.export = true
  try {
    let fromDateISO = undefined
    let toDateISO = undefined
    if (exportDetails.value.selectDatesSwicth) {
      fromDateISO = new Date(exportDetails.value.timeRange[0]).toISOString()
      toDateISO = new Date(exportDetails.value.timeRange[1]).toISOString()
    }

    const response = await $axios.get(
      `/order/export?showProducts=${exportDetails.value.showProducts}${exportDetails.value.selectDatesSwicth ? '&fromDate=' + fromDateISO + '&toDate=' + toDateISO : ''}`,
      { responseType: 'blob' }
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'orders-export.xml')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('API Error:', error)
  } finally {
    isLoading.value.export = false
  }
}
</script>

<template>
  <div class="backoffice-page">
    <ElRow justify="center" align="middle" class="w-100">
      <ElCol :span="8" :offset="8" align="center">
        <h3 class="color-primary">Narudžbe</h3>
      </ElCol>
      <ElCol :span="8" align="end">
        <ElInput
          v-model="searchValue"
          type="text"
          placeholder="Pretražite broj narudžbe ili kupca..."
          class="w-300"
          :prefix-icon="Search"
          @input="handleSearch"
        />
      </ElCol>
    </ElRow>

    <ElRow justify="end" align="middle" class="w-100">
      <ElButton type="primary" plain @click="isExportDialogOpen = true">
        <ElIcon size="24">
          <Download />
        </ElIcon>
        <span>Izvezi podatke</span>
      </ElButton>
    </ElRow>

    <ElTable
      :data="orders"
      stripe
      empty-text="Nema dostupnih podataka"
      :default-sort="{ prop: 'orderNumber', order: 'descending' }"
      @sort-change="handleSortChange"
      v-loading="isLoading.orders"
    >
      <ElTableColumn
        label="Broj narudžbe"
        prop="orderNumber"
        sortable="custom"
      />
      <ElTableColumn label="Kupac" prop="buyerFullname" sortable="custom" />
      <ElTableColumn label="Cijena" prop="totalPrice" sortable="custom">
        <template #default="items">
          {{ Number(items.row.totalPrice).toFixed(2) }} €
        </template>
      </ElTableColumn>
      <ElTableColumn label="Vrijeme" prop="createdAt">
        <template #default="items">
          {{ formatISOToDatetime(items.row.createdAt) }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="Više" align="center" width="80">
        <template #default="items">
          <ElButton type="primary" plain @click="handleOpenDialog(items.row)">
            <ElIcon size="24">
              <InfoFilled />
            </ElIcon>
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <Pagination
      v-if="pagination.total > 10"
      v-model="pagination"
      :loading="isLoading.orders"
      scroll-element-id="scroll-element"
      @page-change="getOrders"
      class="mb-24"
    />
  </div>

  <ElDialog
    v-model="dialog.isOpened"
    :close-on-click-modal="false"
    destroy-on-close
    fullscreen
  >
    <template #header>
      <ElRow justify="center">
        <h3 class="color-primary">
          <span>Narudžba: {{ dialog.order?.orderNumber }}</span>
        </h3>
      </ElRow>
    </template>
    <ElRow justify="center">
      <ElDescriptions title="Kupac" border style="min-width: 450px" :column="1">
        <ElDescriptionsItem label="Ime i prezime">
          {{ dialog.order?.buyerFullname }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Email">
          {{ dialog.order?.buyerEmail }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Telefon">
          {{ dialog.order?.buyerNumber || '-' }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Adresa">
          {{ dialog.order?.buyerAddress }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Mjesto">
          {{ dialog.order?.buyerPlace }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Poštansi broj">
          {{ dialog.order?.buyerZipCode }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Država">
          {{ dialog.order?.buyerCountry }}
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElRow>

    <ElRow justify="center" class="mt-24 mb-24">
      <ElDescriptions
        title="Narudžba"
        border
        style="min-width: 450px"
        :column="1"
      >
        <ElDescriptionsItem label="Broj Narudžbe">
          {{ dialog.order?.orderNumber }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Ukupna cijena">
          {{ dialog.order?.totalPrice }} €
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Vrijeme narudžbe">
          {{ formatISOToDatetime(dialog.order?.createdAt) }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Način plaćanja">
          {{ dialog.order?.payment }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Način dostave">
          {{ dialog.order?.shipping }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Opis">
          {{ dialog.order?.description || '-' }}
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElRow>

    <ElRow justify="center" class="mt-24 mb-24">
      <ElDescriptions
        title="Proizvodi"
        border
        style="min-width: 450px"
        :column="1"
      >
        <ElDescriptionsItem v-for="product in dialog.order?.list">
          <template #label>
            {{ product.name }}
          </template>
          <span>Cijena: {{ product.price }} €</span>
          <br />
          <span>Količina: {{ product.quantity }}</span>
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElRow>
  </ElDialog>

  <ElDialog
    v-model="isExportDialogOpen"
    :close-on-click-modal="false"
    destroy-on-close
    fullscreen
  >
    <template #header>
      <ElRow justify="center">
        <h3 class="color-primary">
          <span>Izvezi podatke</span>
        </h3>
      </ElRow>
    </template>
    <ElRow justify="center" align="middle">
      <div class="w-400">
        <ElSwitch
          v-model="exportDetails.showProducts"
          size="large"
          inactive-text="Bez proizvoda"
          active-text="Prikaži proizvode"
        />
      </div>
    </ElRow>
    <ElRow justify="center" align="middle">
      <div class="w-400">
        <ElSwitch
          v-model="exportDetails.selectDatesSwicth"
          size="large"
          inactive-text="Sve narudžbe"
          active-text="Odaberi vremenski period"
          @change="exportDetails.timeRange = []"
        />
      </div>
    </ElRow>
    <ElRow
      v-if="exportDetails.selectDatesSwicth"
      justify="center"
      align="middle"
    >
      <div class="w-400">
        <ElDatePicker
          v-model="exportDetails.timeRange"
          type="daterange"
          :shortcuts="exportDetails.timeRangeShortcuts"
          range-separator="do"
          start-placeholder="Početni datum"
          end-placeholder="Završni datum"
        />
      </div>
    </ElRow>
    <ElRow justify="center" align="middle" class="mt-24">
      <ElButton
        type="primary"
        plain
        :loading="isLoading.export"
        @click="exportData"
      >
        <ElIcon size="24">
          <Download />
        </ElIcon>
        <span>Preuzmi XML</span>
      </ElButton>
    </ElRow>
  </ElDialog>
</template>

<style lang="css" scoped>
.w-300 {
  width: 300px;
}
.w-400 {
  width: 400px;
}
</style>
