<template>
  <div class="flex items-center justify-center w-full">
    <ul class="flex font-normal ml-0  p-1 rounded-md mb-8 w-3/5">
      <li class="relative cursor-pointer w-1/4 text-center py-1.5" v-for="(item,key) in menu" :key=key @click="linkTo(item.url)"
          :class="isActive(item.url)?'dct-right-tab-active':''"> {{item.name}}
      </li>
    </ul>
  </div>
    <div class="px-6 mt-4 mb-6">
      <RouterView />
    </div>
</template>
<script setup>
import {ref} from "vue";
import BillTab from "@/components/bill/BillTab.vue";
import {RouterView, useRoute} from "vue-router";
import {linkTo} from "@/helper/function.js";
const route=useRoute()

const menu={
  schedule:{
    name:'Счета',
    url:'bill',
  },
  opened:{
    name:'Открытие сделки',
    url:'opened',
  },
  closed:{
    name:'Закрытие сделки',
    url:'closed',
  },
  history:{
    name:'История по счетам',
    url:'history',
  },
}

const isActive = (routeName) => {
  return route.name === routeName
}

</script>