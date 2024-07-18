<script setup lang="ts">
import { defineProps, computed, type ComputedRef, onMounted, provide, ref } from "vue";
import Lucide from "../Lucide";

// Import Lucide here if needed
// import Lucide from "../Lucide";

export type ProvidePreview = ComputedRef<boolean>;

const previewCode = ref(true);
provide<ProvidePreview>("preview", computed(() => previewCode.value));

const props = defineProps({
  haveSearch: {
    type: Boolean,
    default: false
  }
});

const table = ref<HTMLElement | null>(null);
const isHaveScrollRight = ref(false);
const isHaveScrollLeft = ref(false);
const scrollLength = ref(0);

// Define Math.easeInOutQuad if needed
const easeInOutQuad = function(t: number, b: number, c: number, d: number): number {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

function goToEnd() {
  let elementToScroll = table.value;
  if (elementToScroll) {
    scrollToSmooth(elementToScroll, scrollLength.value, 500);
    setTimeout(() => {
      checkScroll();
    }, 600);
  }
}

function goToStart() {
  let elementToScroll = table.value;
  if (elementToScroll) {
    scrollToSmooth(elementToScroll, 0, 500);
    setTimeout(() => {
      checkScroll();
    }, 600);
  }
}

function scrollToSmooth(element: HTMLElement, to: number, duration: number) {
  let start = element.scrollLeft,
      change = to - start,
      currentTime = 0,
      increment = 20; // Adjust as needed, lower values make smoother animation

  function animateScroll() {
    currentTime += increment;
    element.scrollLeft = easeInOutQuad(currentTime, start, change, duration);
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  }
  animateScroll();
}

// Usage

function checkScroll() {
  let scrollableDiv = table.value;
  if (scrollableDiv) {
    isHaveScrollRight.value = scrollableDiv.scrollWidth > scrollableDiv.clientWidth && scrollableDiv.scrollLeft == 0;
    isHaveScrollLeft.value = scrollableDiv.scrollWidth > scrollableDiv.clientWidth && scrollableDiv.scrollLeft > 0;
  }
}

onMounted(() => {
  let scrollableDiv = table.value;
  if (scrollableDiv) {
    setTimeout(() => {
      scrollLength.value = scrollableDiv.scrollWidth - scrollableDiv.clientWidth;
      checkScroll();
    }, 1000);

    window.addEventListener('resize', function() {
      console.log('Window resized!');
      scrollLength.value = scrollableDiv.scrollWidth - scrollableDiv.clientWidth;
      checkScroll();
    });
  }
});
</script>



<template>
  <div style="position: relative;">
    <div v-if="isHaveScrollRight" @click="goToEnd" :class="haveSearch?'top-[71px]':'top-[9px]'" class=" cursor-pointer absolute right-1  rounded-full bg-white h-[27px] border w-[27px] border-[#2a7cef] flex items-center justify-center">
      <Lucide  icon="ArrowRight" color="#2a7cef" class="w-[14px] h-[14px]"/>
    </div>
    <div v-if="isHaveScrollLeft" @click="goToStart" :class="haveSearch?'top-[71px]':'top-[9px]'"  class=" cursor-pointer absolute right-1 top-[53px] rounded-full bg-white h-[27px] border w-[27px] border-[#2a7cef] flex items-center justify-center">
      <Lucide icon="ArrowLeft" color="#2a7cef" class="w-[14px] h-[14px]"/>
    </div>
    <div class="overflow-x-auto custom-scroll dct-table" ref="table" >

      <slot
          :toggle="
        () => {
          previewCode = !previewCode;
        }
      "
      ></slot>
    </div>
  </div>

</template>
