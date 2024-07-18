<template>
  <div class="flex mb-4 justify-end items-center">
    <div class="flex items-center gap-4">
      <div class="text-[#2a7cef] hover:underline cursor-pointer" @click="clear" v-if="Object.keys(query.filters).length>0">Сбросить фильтр</div>
      <Button class="flex items-center gap-2 text-gray-400" @click="openFilter"><Lucide icon="Filter"/> Фильтры</Button>
    </div>
  </div>
  <FullTable :headers="rating_labels" :data="ratings" :is-loading="isLoading" :query="query" @order="order" :with-order="false"/>
  <Pagination :page="page" :per_page="per_page" :meta="meta" @change-count="changeCount" @change-page="changePage"/>
  <RatingYearlyFilter v-if="isOpenFilter" @close-filter="closeFilter" @filter="filter" @clear="clear"/>
</template>
<script setup>
import {onMounted, ref} from "vue";
import Pagination from "./../Pagination.vue";
import BillFilter from "@/modals/filter/BillFilter.vue";
import {storeToRefs} from "pinia";
import FullTable from "@/components/FullTable.vue";
import {rating_labels} from "@/helper/labels.js";
import {useYearlyRatingStore} from "@/stores/rating_yearly.js";
import RatingYearlyFilter from "@/modals/filter/RatingYearlyFilter.vue";
import Lucide from "@/base-components/Lucide/index.ts";
import Button from "@/base-components/Button/index.ts";

const isLoading=ref(false)
const isOpenFilter=ref(false)
const ratingYearlyStore=useYearlyRatingStore()
const {query,page,per_page,meta,ratings}=storeToRefs(ratingYearlyStore)


function changeCount(p){
  per_page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await ratingYearlyStore.getYearlyRatings()
    isLoading.value = false
  },300)
}

function changePage(p){
  page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await ratingYearlyStore.getYearlyRatings()
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
  await ratingYearlyStore.getYearlyRatings()
  isLoading.value = false
}

const month=ref('')
onMounted(async () => {
  await ratingRequest()
})
</script>