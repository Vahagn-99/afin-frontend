<template>
  <div class="flex items-center gap-6 mb-4 justify-between">
    <div class="flex items-center gap-6">
      <div @click="closeTable" class="border h-[38px] rounded-lg px-8 py-2 w-[120px] flex items-center gap-2  cursor-pointer">
        <Lucide icon="ArrowLeft" class="text-black"/> Назад
      </div>
      <p class="font-medium text-gray-400">
        {{name}}
      </p>
    </div>
      <div class="flex items-center gap-4">
        <Button class="flex items-center gap-2 text-gray-400" @click="openFilter"><Lucide icon="Filter"/> Фильтры</Button>
      </div>
  </div>
  <div>
    <FullTable :headers="rating_labels" :data="ratings" :is-loading="isLoading" :query="query" @order="order" :with-order="false"/>
    <Pagination :page="page" :per_page="per_page" :meta="meta" @change-count="changeCount" @change-page="changePage"/>
    <RatingMonthlyFilter v-if="isOpenFilter" @close-filter="closeFilter" @filter="filter" @clear="clear"/>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import Pagination from "./../Pagination.vue";
import BillFilter from "@/modals/filter/BillFilter.vue";
import {storeToRefs} from "pinia";
import FullTable from "@/components/FullTable.vue";
import {rating_labels} from "@/helper/labels.js";
import {useMonthlyRatingStore} from "@/stores/rating_monthly.js";
import Button from "@/base-components/Button/index.ts";
import Lucide from "@/base-components/Lucide/index.ts";
import RatingMonthlyFilter from "@/modals/filter/RatingMonthlyFilter.vue";

const props=defineProps({
  date:String,
  name:String
})

const emit=defineEmits(['closeTable'])

function closeTable(){
  emit('closeTable')
}

const isLoading=ref(false)
const isOpenFilter=ref(false)
const ratingMonthlyStore=useMonthlyRatingStore()
const {query,page,per_page,meta,ratings}=storeToRefs(ratingMonthlyStore)


function changeCount(p){
  per_page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await ratingMonthlyStore.getMonthlyRatings(props.date)
    isLoading.value = false
  },300)
}

function changePage(p){
  page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await ratingMonthlyStore.getMonthlyRatings(props.date)
    isLoading.value =false
  })
}

function openFilter(){
  isOpenFilter.value=true
}

function closeFilter(){
  isOpenFilter.value=false
}

async function order(name, direction) {
  if (query?.value?.sorts[name] && query.value.sorts[name] === direction) {
    delete query.value.sorts[name]
  } else {
    query.value.sorts[name] = direction
  }
  await ratingRequest()
}

async function filter() {
  await ratingRequest()
  closeFilter()
}

async function clear() {
  query.value.filters={}
  await ratingRequest()
  closeFilter()
}

async function ratingRequest() {
  isLoading.value = true
  await ratingMonthlyStore.getMonthlyRatings(props.date)
  isLoading.value = false
}

const month=ref('')
onMounted(async () => {
  await ratingRequest()
})
</script>