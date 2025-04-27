<script setup lang="ts">
import type { Product } from '~/types/webshop'
import Pagination from '~/components/shared/Pagination.vue'
import ProductWidget from '~/components/shared/ProductWidget.vue'

const props = defineProps(['title'])

const { $axios } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const isLoading = ref(true)
const sortingOptions = ref([
  { value: 'newest', label: 'Najnoviji' },
  { value: 'lowestPrice', label: 'Cijena ↑' },
  { value: 'highestPrice', label: 'Cijena ↓' }
])
const { pagination, sortBy } = useSortAndPagination(12, 'newest')
const products = ref<Product[]>([])

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

onMounted(() => getProduct())

async function getProduct() {
  isLoading.value = true
  try {
    const response = await $axios.get(
      `/product?page=${pagination.value.page}&perPage=${pagination.value.perPage}&categoryName=${props.title}&sortBy=${sortBy.value}`
    )
    products.value = response.data.products
    pagination.value.total = response.data.total
  } catch (error) {
    console.error('API Error:', error)
  } finally {
    isLoading.value = false
  }
}

function handleSortByChange() {
  pagination.value.page = 1
  getProduct()
}
</script>

<template>
  <div class="page-container">
    <ElRow justify="center" align="middle" id="scroll-element">
      <h3 class="color-primary">Kategorija: {{ title }}</h3>
    </ElRow>
    <ElRow justify="end" align="middle">
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
    </ElRow>
    <template v-if="isLoading">
      <ElSkeleton animated>
        <template #template>
          <ElRow :gutter="12" class="mb-24">
            <ElCol v-for="_ in 12" :xs="24" :sm="8" class="mt-12">
              <ElSkeletonItem variant="image" class="skeleton-image" />
            </ElCol>
          </ElRow>
        </template>
      </ElSkeleton>
    </template>
    <ElEmpty
      v-else-if="!products.length"
      description="Ups! Nema dostupnih proizvoda..."
    />
    <template v-else>
      <ElRow :gutter="12" class="mb-24 mt-12">
        <ElCol
          v-for="product in products"
          :key="String(product.id)"
          :xs="24"
          :sm="8"
          class="mb-12 news"
        >
          <ProductWidget :product="product" class="news" />
        </ElCol>
      </ElRow>
    </template>
    <Pagination
      v-if="pagination.total > 12"
      v-model="pagination"
      :loading="isLoading"
      scroll-element-id="scroll-element"
      @page-change="getProduct"
      class="mb-24"
    />
  </div>
</template>

<style lang="css" scoped>
.news-container {
  height: 30dvh;
}
.skeleton-image {
  height: 30dvh;
  border-radius: 4px;
}
.news {
  width: 100%;
  height: 30dvh;
}
</style>
