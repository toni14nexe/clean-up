<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowRightBold,
  ArrowLeftBold,
  CloseBold
} from '@element-plus/icons-vue'

const props = defineProps<{
  links: string[]
}>()

const currentIndex = ref(0)
const sliderRef = ref<HTMLDivElement | null>(null)
const isFullscreen = ref(false)

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)

  props.links[2] = props.links[0]
  props.links[3] = props.links[0]
  props.links[4] = props.links[0]
  props.links[5] = props.links[0]
  props.links[6] = props.links[0]
  props.links[7] = props.links[0]
  props.links[8] = props.links[0]
  props.links[9] = props.links[0]
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.links.length
}
function prev() {
  currentIndex.value =
    (currentIndex.value - 1 + props.links.length) % props.links.length
}
function enterFullscreen() {
  if (sliderRef.value?.requestFullscreen) sliderRef.value.requestFullscreen()
}

function exitFullscreen() {
  if (document.fullscreenElement && document.exitFullscreen)
    document.exitFullscreen()
}

function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
}
</script>

<template>
  <div ref="sliderRef" class="slider-container">
    <ElRow justify="end" v-if="isFullscreen">
      <ElButton @click="exitFullscreen" size="large" class="exit-button">
        <ElIcon><CloseBold /></ElIcon>
      </ElButton>
    </ElRow>
    <div class="media-display">
      <img
        v-if="links[currentIndex].includes('/image/')"
        :src="links[currentIndex]"
        class="media-item"
        @click="enterFullscreen"
      />
      <video v-else :src="links[currentIndex]" controls class="media-item" />
      <div
        class="controls"
        :class="links.length > 1 ? 'space-between' : 'center'"
      >
        <ElButton v-if="links.length > 1" @click="prev" size="large">
          <ElIcon><ArrowLeftBold /></ElIcon>
        </ElButton>
        <ElButton v-if="!isFullscreen" @click="enterFullscreen" size="large">
          ⛶
        </ElButton>
        <ElButton v-if="links.length > 1" @click="next" size="large">
          <ElIcon><ArrowRightBold /></ElIcon>
        </ElButton>
      </div>
    </div>

    <ElRow justify="center">
      <img
        v-for="(link, index) in links"
        :key="links.length"
        :src="link"
        class="small-image"
        :class="{ 'small-image-active': index === currentIndex }"
        @click="currentIndex = index"
      />
    </ElRow>
  </div>
</template>

<style scoped>
.slider-skeleton {
  height: 60dvh;
}
.slider-container {
  position: relative;
  max-width: 100%;
  height: fit-content !important;
  background: var(--el-color-primary-light-9);
  padding: 1rem;
  border-radius: 10px;
  overflow: hidden;
}
.media-display {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.media-item {
  max-width: 100%;
  max-height: 60dvh;
  object-fit: contain;
  border-radius: 8px;
  cursor: pointer;
}
.small-image {
  width: 80px;
  height: 80px;
  margin: 12px 6px;
  opacity: 0.75;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: 0.2s ease-in-out;
}
.small-image:hover {
  opacity: 1;
  border: 1px solid black;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.small-image-active {
  border: 1px solid black;
}
.controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  padding: 0 1rem;
  transform: translateY(-50%);
}
.space-between {
  justify-content: space-between;
}
.center {
  justify-content: center;
}
.controls button,
.exit-button {
  background: rgba(0, 0, 0, 0.75);
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 20px;
}
.controls button:hover,
.exit-button:hover {
  background: rgba(0, 0, 0, 0.3);
}
@media (min-width: 767px) {
  .slider-container {
    height: 60dvh;
  }
}
@media (max-width: 767px) {
  .slider-container {
    height: 60dvh;
  }
  .controls button,
  .exit-button {
    background: rgba(0, 0, 0, 0.25);
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 20px;
    padding: 10px;
  }
}
</style>
