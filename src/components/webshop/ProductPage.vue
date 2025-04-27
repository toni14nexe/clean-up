<script setup lang="ts">
import Gallery from '~/components/shared/Gallery.vue'
import FacebookShareButton from '~/components/shared/FacebookShareButton.vue'
import CopyUrlButton from '~/components/shared/CopyUrlButton.vue'
import UnisexIcon from '~/assets/icons/unisex.vue'
import ChildIcon from '~/assets/icons/child.vue'
import type { Product } from '~/types/webshop'
import { ShoppingCart } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'

const props = defineProps<{
  product: Product | null
  isLoading: boolean
}>()

const sizes = ref<String[]>([])
const activeSize = ref()
const blackWhiteOption = ref<'white' | 'black'>('white')
const menWomenOption = ref<'men' | 'women'>('women')
const busLine = ref('1 Pećine')
const busLineOptions = [
  '1 Pećine',
  '1 Bivio',
  '1 Trsat',
  '1a Marčeljeva Draga',
  '2 Pećine',
  '2 Trsat',
  '2 Srdoči',
  '3 Grbci',
  '3a Bezjaki',
  '4 Brašćine',
  '5 Drenova',
  '5 Škurinje',
  '6 Podvežica',
  '6 Turnić',
  '6 D.Vežica',
  '6 Krnjevo',
  '7 Gornja Vežica',
  '7 Pehlin',
  '7a Podmurvice',
  '7a Sveti Križ',
  '7a Hosti',
  '13 Grohovo',
  '10 Kostrena',
  '11 Garići',
  '12 Dražice',
  '12 Kukuljani',
  '12 Jelenje',
  '14 Mavrinci',
  '15 Grad Grobnik',
  '18 Kastav',
  '18b Rešetari',
  '19 Lisac',
  '19 Klana',
  '19 Studena',
  '20 Marčelji',
  '20 Viškovo',
  '21 Brnčići',
  '22 Matulji',
  '23 Veli Brgud',
  '23 Jušići',
  '24 Praputnjak',
  '26 Hreljin',
  '29 Ožlak',
  '31 Bezjaki',
  '32 Opatija',
  '32 Lovran',
  '34 Bregi',
  'RIJEKA'
]

const parsedHtml = computed(() =>
  props.product?.description
    ? props.product.description.replace(/&nbsp;/g, ' ')
    : ''
)

onMounted(() => setSizes())

function setSizes() {
  if (
    props.product?.productCategory.id === 'cmgl4tho100019ydcdd7pgk8x' && // MAJICE NA KRATKE RUKAVE
    props.product.unisex &&
    props.product.sizeOption
  ) {
    sizes.value = ['XS', 'S', 'M', 'L', 'XL', '2XL']
    activeSize.value = 'M'
  } else if (
    props.product?.childClothes &&
    props.product.sizeOption &&
    props.product.childClothesType === 'tshirt'
  ) {
    sizes.value = ['4', '6', '8', '10', '12']
    activeSize.value = '4'
  } else if (
    props.product?.childClothes &&
    props.product.sizeOption &&
    props.product.childClothesType === 'shirt'
  ) {
    sizes.value = ['10', '12']
    activeSize.value = '10'
  } else if (props.product?.sizeOption) {
    sizes.value = ['S', 'M', 'L', 'XL', '2XL']
    activeSize.value = 'M'
  }
}

function handleAddToCart(viewport: any) {
  let cartItem = {
    id: props.product?.id as string,
    name: props.product?.name as string,
    price: props.product?.discountPrice
      ? props.product?.discountPrice
      : Number(props.product?.price),
    images: props.product?.images as string[]
  }
  if (props.product?.sizeOption)
    // @ts-expect-error
    cartItem.size = activeSize.value
  if (props.product?.menWomenOption)
    // @ts-expect-error
    cartItem.menWomenOption = menWomenOption.value
  if (props.product?.blackWhiteOption)
    // @ts-expect-error
    cartItem.blackWhiteOption = blackWhiteOption.value
  if (props.product?.busLines)
    // @ts-expect-error
    cartItem.busLine = busLine.value

  addToCart(cartItem)
  ElNotification({
    message: 'Proizvod dodan u košaricu!',
    type: 'success',
    offset: viewport.isGreaterOrEquals('tablet') ? 100 : 50
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
        <ElCol :xs="24" :sm="12">
          Kategorija:
          {{ product.productCategory.name }}
        </ElCol>
        <ElCol
          :xs="24"
          :sm="12"
          :align="$viewport.isLessThan('tablet') ? 'start' : 'end'"
        >
          <NuxtLink to="/tablice-velicina" class="icon-link">
            Tablice veličina pronađite ovdje
          </NuxtLink>
        </ElCol>
      </ElRow>
      <ElRow
        v-if="product.childClothes"
        class="color-zinc mb-12"
        align="middle"
      >
        <ElIcon :size="28" class="mr-8">
          <ChildIcon />
        </ElIcon>
        Dječji proizvod
      </ElRow>
      <ElRow v-if="product.unisex" class="color-zinc mb-12" align="middle">
        <ElIcon :size="22" class="mr-8">
          <UnisexIcon />
        </ElIcon>
        Unisex proizvod
      </ElRow>
      <div v-html="parsedHtml" class="product-content mb-24" />
      <ElRow align="middle" class="mb-24 product-price">
        Cijena:
        <b class="ml-4" :class="{ 'line-throuht-text': product.discountPrice }"
          >{{ Number(product.price).toFixed(2) }} eura</b
        >
        <b class="ml-12" v-if="product.discountPrice"
          >{{ Number(product.discountPrice).toFixed(2) }} eura</b
        >
      </ElRow>
      <ElRow
        v-if="product.busLines"
        justify="center"
        align="middle"
        class="mb-24"
      >
        <ElSelect
          v-model="busLine"
          placeholder="Odaberite autobusnu liniju"
          class="bus-line-select"
          clearable
          filterable
        >
          <ElOption
            v-for="line in busLineOptions"
            :key="line"
            :label="line"
            :value="line"
          />
        </ElSelect>
      </ElRow>
      <ElRow
        v-if="product.blackWhiteOption"
        justify="center"
        align="middle"
        class="mb-24"
      >
        <div
          class="gender-button"
          :class="{ 'active-size-button': blackWhiteOption === 'white' }"
          @click="blackWhiteOption = 'white'"
        >
          Bijela
        </div>
        <div
          class="gender-button"
          :class="{ 'active-size-button': blackWhiteOption === 'black' }"
          @click="blackWhiteOption = 'black'"
        >
          Crna
        </div>
      </ElRow>
      <ElRow
        v-if="product.menWomenOption"
        justify="center"
        align="middle"
        class="mb-24"
      >
        <div
          class="gender-button"
          :class="{ 'active-size-button': menWomenOption === 'women' }"
          @click="menWomenOption = 'women'"
        >
          Ženska
        </div>
        <div
          class="gender-button"
          :class="{ 'active-size-button': menWomenOption === 'men' }"
          @click="menWomenOption = 'men'"
        >
          Muška
        </div>
      </ElRow>
      <ElRow
        v-if="product.sizeOption"
        justify="center"
        align="middle"
        class="mb-24"
      >
        <div v-for="size in sizes">
          <div
            class="size-button"
            :class="{ 'active-size-button': activeSize === size }"
            @click="activeSize = size as string"
          >
            {{ size }}
          </div>
        </div>
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
.bus-line-select {
  width: 170px;
}
.size-button,
.gender-button {
  border: none;
  height: 40px;
  text-align: center;
  font-family: amatic;
  font-size: larger;
  border-radius: 4px;
  align-content: center;
  transition: 0.2s ease-in-out;
  margin: 0 4px;
}
.size-button {
  width: 30px;
  background-color: #d9d9d9;
}
.gender-button {
  width: 80px;
  background-color: #d9d9d9;
}
.size-button:hover,
.gender-button:hover {
  background-color: #c7c6c6;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.active-size-button {
  background-color: var(--el-color-primary);
}
.active-size-button:hover {
  background-color: var(--el-color-primary);
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
  font-family: amatic;
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
</style>
