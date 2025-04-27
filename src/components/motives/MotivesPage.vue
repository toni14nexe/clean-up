<script setup lang="ts">
const motives = ref({
  firstRow: Object.values(
    import.meta.glob('@/assets/images/motives/*.{jpg,jpeg,png,webp}', {
      eager: true,
      import: 'default'
    })
  ).slice(0, 13),
  secondRow: Object.values(
    import.meta.glob('@/assets/images/motives/*.{jpg,jpeg,png,webp}', {
      eager: true,
      import: 'default'
    })
  ).slice(13, 31),
  thirdRow: Object.values(
    import.meta.glob('@/assets/images/motives/*.{jpg,jpeg,png,webp}', {
      eager: true,
      import: 'default'
    })
  ).slice(31, 46)
})
</script>

<template>
  <div class="page-container mb-24">
    <ElRow align="middle" justify="center">
      <h1 class="color-primary">Galerija motiva</h1>
    </ElRow>

    <ElRow justify="center" align="middle" :gutter="12">
      <ElCol :xs="24" :sm="8" align="center">
        <img
          v-for="(imageSrc, index) in motives.firstRow"
          :key="index"
          :src="imageSrc as string"
          class="motive-image"
        />
      </ElCol>
      <ElCol :xs="24" :sm="8" align="center">
        <img
          v-for="(imageSrc, index) in motives.secondRow"
          :key="index"
          :src="imageSrc as string"
          class="motive-image"
        />
      </ElCol>
      <ElCol :xs="24" :sm="8" align="center">
        <img
          v-for="(imageSrc, index) in motives.thirdRow"
          :key="index"
          :src="imageSrc as string"
          class="motive-image"
        />
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped>
.motive-image {
  width: 100%;
  height: fit-content;
}
@media (max-width: 767px) {
  .motive-image {
    width: auto;
    max-width: 100%;
    max-height: 60dvh;
  }
}
</style>
