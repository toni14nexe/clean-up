<script setup lang="ts">
import Gallery from '~/components/shared/Gallery.vue'
import FacebookShareButton from '~/components/shared/FacebookShareButton.vue'
import CopyUrlButton from '~/components/shared/CopyUrlButton.vue'
import type { Product } from '~/types/webshop'
import { ShoppingCart } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

const props = defineProps<{
  product: Product | null
  isLoading: boolean
}>()

const parsedHtml = computed(() =>
  props.product?.description
    ? props.product.description.replace(/&nbsp;/g, ' ')
    : ''
)

function handleAddToCart(viewport: any) {
  let cartItem = {
    id: props.product?.id as string,
    name: props.product?.name as string,
    price: props.product?.discountPrice
      ? props.product?.discountPrice
      : Number(props.product?.price),
    images: props.product?.images as string[]
  }

  addToCart(cartItem)
  ElNotification({
    message: 'Proizvod dodan u košaricu!',
    type: 'success',
    offset: viewport.isGreaterOrEquals('tablet') ? 60 : 45
  })
}
</script>

<template>
  <div class="page-container">
    <template v-if="isLoading">
      <ElSkeleton animated>
        <template #template>
          <ElRow justify="center">
            <h3 style="width: 30%">
              <ElSkeletonItem variant="h3" />
            </h3>
          </ElRow>
          <ElRow justify="center">
            <ElSkeletonItem
              variant="image"
              style="
                height: calc(60dvh + 2rem);
                width: 100%;
                border-radius: 8px;
              "
            />
          </ElRow>
          <ElRow
            v-for="(_, index) in 5"
            justify="space-between"
            align="middle"
            :class="{ 'mb-12': index === 1, 'mb-24': index === 4 }"
            style="height: 21px"
          >
            <ElSkeletonItem variant="text" style="width: 30%" />
          </ElRow>
          <ElRow class="mb-24">
            <ElSkeletonItem
              v-for="_ in 5"
              variant="text"
              style="width: 100%; margin-bottom: 12px"
            />
          </ElRow>
          <ElRow class="mb-24">
            <ElSkeletonItem variant="text" style="width: 20%; height: 21.5px" />
          </ElRow>
          <ElRow justify="center" align="middle" class="mb-24">
            <ElButton type="primary" plain size="large" disabled>
              <ElIcon :size="20" class="mr-8">
                <ShoppingCart />
              </ElIcon>
              Dodaj u košaricu
            </ElButton>
          </ElRow>
        </template>
      </ElSkeleton>
    </template>
    <ElEmpty
      v-else-if="!product"
      description="Ups! Nema dostupnih proizvoda..."
    />
    <template v-else>
      <ElRow justify="center" align="middle">
        <h3 class="color-primary">{{ product?.name }}</h3>
      </ElRow>
      <Gallery
        v-if="product.images?.length || product.videos?.length"
        :links="
          [...(product.images ?? []), ...(product.videos ?? [])] as string[]
        "
      />
      <ElRow align="middle" justify="space-between" class="color-zinc mb-12">
        <ElCol :span="24" class="category-text">
          Kategorija:
          {{ product.productCategory.name }}
        </ElCol>
      </ElRow>
      <div v-html="parsedHtml" class="product-content mb-24" />
      <ElRow align="middle" class="mb-24 product-price">
        Cijena:
        <b class="ml-4" :class="{ 'line-throuht-text': product.discountPrice }"
          >{{ Number(product.price).toFixed(2) }} €</b
        >
        <b class="ml-12" v-if="product.discountPrice"
          >{{ Number(product.discountPrice).toFixed(2) }} €</b
        >
      </ElRow>
      <ElRow justify="center" align="middle" class="mb-24">
        <div class="add-button" @click="handleAddToCart($viewport)">
          <ElIcon :size="20" class="mr-8"><ShoppingCart /></ElIcon>
          Dodaj u košaricu
        </div>
      </ElRow>
      <ElRow class="mb-12 social-share-buttons">
        <FacebookShareButton class="mr-4" />
        <CopyUrlButton class="ml-4" />
      </ElRow>
    </template>
  </div>
</template>

<style lang="css" scoped>
h3 {
  font-size: 24px;
}
.page-container {
  font-size: 18px;
}
.category-text {
  font-size: 16px;
}
.product-content {
  line-height: 1.6;
  white-space: normal;
  word-wrap: break-word;
  text-align: justify;
}
.font-weight-500 {
  font-weight: 500;
}
.product-price {
  font-weight: 500;
  font-size: x-large;
}
.line-throuht-text {
  text-decoration: line-through;
  text-decoration-thickness: 3px;
}
.add-button {
  background-color: #d9d9d9;
  border: none;
  height: 50px;
  text-align: center;
  font-family: 'Inclusive Sans';
  font-size: larger;
  padding: 0 20px;
  border-radius: 4px;
  align-content: center;
  transition: 0.2s ease-in-out;
}
.add-button:hover {
  background-color: #c7c6c6;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.icon-link {
  color: var(--el-text-color-secondary);
  transition: 0.3s ease-in-out;
}
.icon-link:hover {
  color: var(--el-color-primary);
}
@media (max-width: 767px) {
  h3 {
    font-size: 20px;
  }
}
</style>
