<script setup lang="ts">
import ProductWidget from '~/components/shared/ProductWidget.vue'
import Pagination from '~/components/shared/Pagination.vue'
import Categories from '~/components/shared/Categories.vue'
import type { Product } from '~/types/webshop'
import { Search, ArrowRight } from '@element-plus/icons-vue'

const { $viewport, $axios } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const categorySearch = ref<string[]>([])
const isLoading = ref(true)
const sortingOptions = ref([
  { value: 'newest', label: 'Najnoviji' },
  { value: 'lowestPrice', label: 'Cijena ↑' },
  { value: 'highestPrice', label: 'Cijena ↓' }
])
const { pagination, sortBy } = useSortAndPagination(12, 'newest')
const products = ref<Product[]>([])
const searchValue = ref('')

watch(
  () => route.path,
  () => {
    if (route.name !== 'pretrazivanje') searchValue.value = ''
  }
)

watch(
  () => [sortBy.value],
  ([sort]) => {
    router.replace({
      query: {
        ...route.query,
        page: 1,
        sortBy: sort
      }
    })
  }
)

onMounted(() => getProducts())

async function getProducts() {
  isLoading.value = true
  try {
    const response = await $axios.get(
      `/product?page=${pagination.value.page}&perPage=${pagination.value.perPage}&categoryIds=${categorySearch.value}&sortBy=${sortBy.value}`
    )
    pagination.value.total = response.data.total
    products.value = response.data.products
  } catch (error) {
    console.error('API Error:', error)
  } finally {
    isLoading.value = false
  }
}

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
  }
}

function handleSortByChange() {
  pagination.value.page = 1
  getProducts()
}
</script>

<template>
  <div class="page-container">
    <template v-if="isLoading">
      <ElSkeleton animated>
        <template #template>
          <ElRow justify="center">
            <ElCol :xs="0" :sm="8" />
            <ElCol :xs="24" :sm="8" align="center">
              <h3 class="color-primary">USLUGE</h3>
            </ElCol>
            <ElCol :xs="24" :sm="8">
              <div class="search-wrapper">
                <ElIcon :size="18">
                  <Search />
                </ElIcon>
                <input
                  v-model="searchValue"
                  placeholder="Pretraži..."
                  class="search"
                  @keyup.enter="handleSearch"
                />
              </div>
            </ElCol>
          </ElRow>
          <Categories />
          <ElDivider />
          <ElRow justify="center" align="middle">
            <ElCol :xs="0" :sm="8" />
            <ElCol
              :xs="12"
              :sm="8"
              :align="$viewport.isLessThan('tablet') ? 'start' : 'center'"
            >
              <h3>USLUGE</h3>
            </ElCol>
            <ElCol :xs="12" :sm="8" align="end">
              <ElSelect
                v-model="sortBy"
                style="width: 120px"
                @change="handleSortByChange"
              >
                <ElOption
                  v-for="option in sortingOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </ElSelect>
            </ElCol>
          </ElRow>
          <ElRow :gutter="12" class="mb-24">
            <ElCol
              v-for="(_, index) in 12"
              :xs="24"
              :sm="8"
              :class="{
                'mt-12':
                  (index > 0 && $viewport.isLessThan('tablet')) ||
                  (index > 2 && $viewport.isGreaterOrEquals('tablet'))
              }"
            >
              <ElSkeletonItem variant="image" class="skeleton-image" />
            </ElCol>
          </ElRow>
        </template>
      </ElSkeleton>
    </template>
    <template v-else-if="!products.length">
      <ElRow justify="center">
        <ElCol :xs="0" :sm="8" />
        <ElCol :xs="24" :sm="8" align="center">
          <h3 class="color-primary">USLUGE</h3>
        </ElCol>
        <ElCol :xs="24" :sm="8">
          <div class="search-wrapper">
            <ElIcon :size="18">
              <Search />
            </ElIcon>
            <input
              v-model="searchValue"
              placeholder="Pretraži..."
              class="search"
              @keyup.enter="handleSearch"
            />
          </div>
        </ElCol>
      </ElRow>
      <Categories />
      <ElDivider />
      <ElRow justify="center">
        <ElCol :xs="0" :sm="8" />
        <ElCol
          :xs="12"
          :sm="8"
          :align="$viewport.isLessThan('tablet') ? 'start' : 'center'"
        >
          <h3>USLUGE</h3>
        </ElCol>
        <ElCol :xs="12" :sm="8" align="end" />
      </ElRow>
      <ElEmpty description="Ups! Ovdje nema dostupnih proizvoda..." />
    </template>
    <template v-else>
      <ElRow justify="center">
        <ElCol :xs="0" :sm="8" />
        <ElCol :xs="24" :sm="8" align="center">
          <h3 class="color-primary">USLUGE</h3>
        </ElCol>
        <ElCol :xs="24" :sm="8">
          <div class="search-wrapper">
            <ElIcon :size="18">
              <Search />
            </ElIcon>
            <input
              v-model="searchValue"
              placeholder="Pretraži..."
              class="search"
              @keyup.enter="handleSearch"
            />
          </div>
        </ElCol>
      </ElRow>
      <Categories />

      <ElDivider />

      <ElDivider id="scroll-element" />

      <ElRow justify="center" align="middle">
        <ElCol :xs="0" :sm="8" />
        <ElCol
          :xs="12"
          :sm="8"
          :align="$viewport.isLessThan('tablet') ? 'start' : 'center'"
        >
          <h3>USLUGE</h3>
        </ElCol>
        <ElCol :xs="12" :sm="8" align="end">
          <ElSelect
            v-model="sortBy"
            style="width: 120px"
            @change="handleSortByChange"
          >
            <ElOption
              v-for="option in sortingOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </ElSelect>
        </ElCol>
      </ElRow>

      <ElRow :gutter="12" class="mb-24">
        <ElCol
          v-for="product in products"
          :key="String(product.id)"
          :xs="24"
          :sm="8"
          class="mb-12 product"
        >
          <ProductWidget :product="product" class="product" />
        </ElCol>
      </ElRow>
    </template>
    <Pagination
      v-if="pagination.total > 12"
      v-model="pagination"
      :loading="isLoading"
      scroll-element-id="scroll-element"
      @page-change="getProducts"
      class="mb-24"
    />
  </div>
</template>

<style lang="css" scoped>
.search-wrapper {
  height: 100%;
  align-content: center;
  text-align: center;
}
.search {
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: -36px;
  background-color: white;
  border: none;
  width: 350px;
  height: 50px;
  text-align: end;
  font-family: 'Inclusive Sans';
  font-size: 18px;
  padding: 0 20px;
  border-radius: 4px;
  border: 2px solid #409eff;
}
.product-container {
  height: 30dvh;
}
.skeleton-image {
  height: 30dvh;
  border-radius: 4px;
}
.product {
  width: 100%;
  height: 30dvh;
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
