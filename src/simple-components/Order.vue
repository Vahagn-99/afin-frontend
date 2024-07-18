<template>
  <div class="flex items-center justify-start gap-2">
    {{name}}
    <span class="flex flex-col justify-center items-center">
      <Lucide icon="ChevronUp" class="w-3 h-3 cursor-pointer text-[#d0d0d0] hover:text-[#2a7cef]" :class="{'!text-[#2a7cef]  stroke-[3] !w-4 !h-4':isAsc}" @click="order('asc')"/>
      <Lucide icon="ChevronDown" class="w-3 h-3 cursor-pointer text-[#d0d0d0] hover:text-[#2a7cef]" :class="{'!text-[#2a7cef] stroke-[3] !w-4 !h-4':isDesc}" @click="order('desc')"/>
  </span>
  </div>

</template>
<script setup>

import Lucide from "@/base-components/Lucide";
const props=defineProps({
  name:String,
  index:String,
  isDesc:Boolean,
  isAsc:Boolean,
})

const emit=defineEmits(['order'])
function order(direction){
  emit('order',props.index,direction)
}
</script>