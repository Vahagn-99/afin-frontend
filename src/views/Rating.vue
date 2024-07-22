<template>
  <div class="flex items-center justify-center w-full">
    <ul class="flex font-normal ml-0  p-1 rounded-md mb-8 w-[70%]">
      <li class="relative cursor-pointer w-1/5 text-center py-1.5" @click="changeTable('current_month')"
          :class="showTab.current_month?'dct-right-tab-active':''"> Текущий месяц
      </li>
      <li class="relative cursor-pointer w-1/5 text-center py-1.5" @click="changeTable('last_month')"
          :class="showTab.last_month?'dct-right-tab-active':''">
        Прошлый месяц
      </li>
      <li class="relative cursor-pointer w-1/5 text-center py-1.5" @click="changeTable('current_year')"
          :class="showTab.current_year?'dct-right-tab-active':''">
        Текущий год
      </li>
      <li class="relative cursor-pointer w-1/5 text-center py-1.5" @click="changeTable('all_time')"
          :class="showTab.all_time?'dct-right-tab-active':''">
        Все время
      </li>
      <li class="relative cursor-pointer w-1/5 text-center py-1.5" @click="changeTable('history')"
          :class="showTab.history?'dct-right-tab-active':''">
        История рейтинга
      </li>
    </ul>
  </div>
  <div class="px-6 mt-4 mb-6">
    <CurrentMonthTab v-if="showTab.current_month"/>
    <LastMonthTab v-if="showTab.last_month"/>
    <CurrentYearTab v-if="showTab.current_year"/>
    <AllTimeTab v-if="showTab.all_time"/>
    <HistoryTab v-if="showTab.history"/>
  </div>
</template>
<script setup>
import {ref} from "vue";
import HistoryTab from "@/components/rating/HistoryTab.vue";
import CurrentMonthTab from "@/components/rating/CurrentMonthTab.vue";
import LastMonthTab from "@/components/rating/LastMonthTab.vue";
import CurrentYearTab from "@/components/rating/CurrentYearTab.vue";
import AllTimeTab from "@/components/rating/AllTimeTab.vue";
const isOpenFilter=ref(false)
function openFilter(){
  isOpenFilter.value=true
}

function closeFilter(){
  isOpenFilter.value=false
}


const showTab=ref({
  current_month:true,
  last_month:false,
  current_year:false,
  all_time:false,
  history:false
})

function changeTable(name){
  for (const tabName in showTab.value) {
    showTab.value[tabName] = tabName === name;
  }
}

async function filter() {
  await billRequest()
  closeFilter()
}

async function clear() {
  query.value.filters={}
  await billRequest()
  closeFilter()
}


</script>