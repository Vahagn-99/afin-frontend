<template>
  <div class="flex items-center justify-between bg-[#213343] pr-6 mb-6 h-[60px]">
    <div class="flex items-center justify-start ">
      <div class="flex items-center justify-start gap-2 rounded-r-[34px] mr-[24px] bg-white  border-b-2">
        <h2 class="text-[22px] text-white"><img src="./../assets/img/logo.png" alt="" class="h-[60px]"></h2>
      </div>
      <ul class="flex items-center gap-[18px] py-5">
        <template v-for="(item,key) in menu" :key="key">
          <li class="flex items-center justify-center py-2 gap-2 text-white px-4"
              :class="{
                  'bg-white rounded-lg !text-[#213343]':isActive(item.url),
                  'cursor-pointer':item.url,
                  'cursor-not-allowed pointer-events-none opacity-40':!item.url,
               }"
              @click="linkTo(item.url)">
            <Lucide :icon="item.icon" />
            <p class="text-[14px] ">{{item.name}}</p>
          </li>
        </template>
      </ul>
    </div>
  <div @click="openLogOutModal" class="flex cursor-pointer items-center justify-center py-2 gap-2 text-white px-4 border rounded-lg border-[#565656]">
    <Lucide icon="LogOut" />
    <p class="text-[14px] ">Выйти</p>
  </div>
  </div>
  <RouterView />

  <LogoutModal v-if="isOpenLogOutModal" @close-modal="closeLogOutModal"/>
</template>
<script setup>

import Lucide from "@/base-components/Lucide/index.ts";
import {linkTo} from "@/helper/function.js";
import {RouterView, useRoute} from "vue-router";
import LogoutModal from "@/modals/LogoutModal.vue";
import {ref} from "vue";
const route=useRoute()

const menu={
  schedule:{
    name:'Счета',
    url:'bill',
    icon:'ReceiptRussianRuble'
  },
  visits:{
    name:'Рейтинг',
    url:'rating',
    icon:'AlignStartVertical'
  },
  chat:{
    name:'Бонус',
    url:'bonus',
    icon:'HandCoins'
  },
}

const isActive = (routeName) => {
  return route.name === routeName
}

const isOpenLogOutModal=ref(false)

function openLogOutModal(){
  isOpenLogOutModal.value=true
}

function closeLogOutModal(){
  isOpenLogOutModal.value=false
}
</script>