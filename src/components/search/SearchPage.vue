<script setup lang="ts">
import ProductWidget from '~/components/shared/ProductWidget.vue'
import Pagination from '~/components/shared/Pagination.vue'
import type { Product } from '~/types/webshop'
import { Search } from '@element-plus/icons-vue'

type SearchResponse = {
  products: Product[]
  totalProducts: number
}

const { $axios } = useNuxtApp()
const route = useRoute()
const searchValue = ref(route.query.value)
const searchInput = ref('')
const isLoading = ref(true)
const emptySearch = ref(false)
const data = ref<SearchResponse>()
const pagination = ref({
  page: 1,
  perPage: 12,
  total: 0
})

watch(
  () => route.query.value,
  newSearchValue => {
    searchValue.value = newSearchValue
    getSearchData()
  }
)

onMounted(() => getSearchData())

async function getSearchData() {
  isLoading.value = true
  emptySearch.value = false
  try {
    const response = await $axios.get(
      `/search?value=${searchValue.value}&perPage=${pagination.value.perPage}&page=${pagination.value.page}`
    )
    data.value = response.data
    pagination.value.total = response.data.totalProducts
    if (!data.value?.totalProducts) emptySearch.value = true
    scrollToPageTop()
  } catch (error) {
    console.error('API Error:', error)
  } finally {
    isLoading.value = false
  }
}

function handleSearch() {
  if (searchInput.value?.trim().length < 3)
    ElNotification({
      type: 'warning',
      message: 'Vrijednost pretraživanja ne smije biti kraća od 3 znaka!',
      duration: 3000
    })
  else if (searchInput.value?.trim().length > 100)
    ElNotification({
      type: 'warning',
      message: 'Vrijednost pretraživanja ne smije biti duža od 100 znakova!',
      duration: 3000
    })
  else {
    navigateTo(`/pretrazivanje?value=${searchInput.value}`)
    searchInput.value = ''
  }
}
</script>

<template>
  <div class="page-container mb-12">
    <ElRow
      justify="center"
      :class="$viewport.isLessThan('tablet') ? 'mb-12' : ''"
    >
      <ElCol :xs="24" :sm="12">
        <h3 class="color-primary">Pretraživanje: {{ searchValue }}</h3>
      </ElCol>
      <ElCol :xs="24" :sm="12" align="right">
        <div class="search-wrapper">
          <ElIcon :size="28">
            <Search />
          </ElIcon>
          <input
            v-model="searchInput"
            placeholder="PRETRAŽI"
            class="search"
            @keyup.enter="handleSearch"
          />
        </div>
      </ElCol>
    </ElRow>
    <template v-if="isLoading">
      <ElSkeleton animated>
        <template #template>
          <ElRow align="middle" :gutter="12">
            <ElCol
              v-for="_ in 12"
              :xs="24"
              :sm="8"
              style="height: 30dvh"
              class="mb-12"
            >
              <ElSkeletonItem
                variant="image"
                style="height: 30dvh; border-radius: 4px"
              />
            </ElCol>
          </ElRow>
        </template>
      </ElSkeleton>
    </template>
    <ElEmpty
      v-else-if="!data || emptySearch"
      description="Ups! Nema dostupnih proizvoda..."
    />
    <template v-else>
      <ElRow align="middle" :gutter="12">
        <ElCol
          v-for="product in data.products"
          :key="String(product.id)"
          :xs="24"
          :sm="8"
          class="mb-12"
        >
          <ProductWidget :product="product" class="product-widget" />
        </ElCol>
      </ElRow>
      <Pagination
        v-if="pagination.total > 12"
        v-model="pagination"
        :loading="isLoading"
        scroll-element-id="scroll-element"
        @page-change="getSearchData"
        class="mb-24"
      />
    </template>
  </div>
</template>

<style lang="css" scoped>
.el-avatar {
  --el-avatar-text-size: 12px;
}
.font-9 {
  font-size: 9px;
}
.bc-primary {
  background-color: var(--el-color-primary);
}
.news-widget {
  height: 30dvh;
}
.job-widget {
  height: 20dvh;
}
.product-widget {
  height: 30dvh;
}
.search-wrapper {
  height: 100%;
  align-content: center;
  text-align: right;
}
.search {
  background-color: #d9d9d9;
  border: none;
  width: 350px;
  height: 50px;
  text-align: end;
  font-family: amatic;
  font-size: larger;
  padding: 0 20px;
  border-radius: 4px;
  margin-left: -36px;
}
@media only screen and (max-width: 1100px) {
  .search {
    width: 260px;
  }
}
@media only screen and (max-width: 810px) {
  .search {
    width: 100%;
  }
}
</style>
