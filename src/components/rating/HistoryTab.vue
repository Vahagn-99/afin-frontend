<template>
  <div v-if="!isOpenRating">
<!--    <div class="flex mb-4 justify-end items-center">-->
<!--      <div class="flex items-center gap-4">-->
<!--        <Button class="flex items-center gap-2 text-gray-400" @click="openFilter"><Lucide icon="Filter"/> Фильтры</Button>-->
<!--      </div>-->
<!--    </div>-->
    <FullTable :headers="rating_history_labels" :data="histories" :is-loading="isLoading" :query="query" @order="order" :with-order="false">
      <template #header>
        <Table.Th class="w-1/5"></Table.Th>
      </template>
      <template  v-slot:body="slotProps">
        <Table.Td class="text-[#2a7cef]"><div @click="openRatingTable(slotProps.item.date,slotProps.item_name)" class="flex items-center justify-end cursor-pointer hover:underline gap-2">
          Открыть месяц <Lucide icon="ExternalLink" class="w-4 h-4"/>
        </div ></Table.Td>
      </template>
    </FullTable>
      <Pagination :page="page" :per_page="per_page" :meta="meta" @change-count="changeCount" @change-page="changePage"/>
    <HistoryFilter v-if="isOpenFilter" @close-filter="closeFilter" @filter="filter" @clear="clear"/>
  </div>
  <div v-else>
    <HistoryItemTable :date="current_date" :name="current_name" @closeTable="closeRatingTable"/>
  </div>
</template>
<script setup>
import Table from "./../../base-components/Table";
import {onMounted, ref} from "vue";
import Pagination from "./../Pagination.vue";
import Button from "./../../base-components/Button/index.ts";
import Lucide from "@/base-components/Lucide/index.ts";
import {storeToRefs} from "pinia";
import HistoryFilter from "@/modals/filter/HistoryFilter.vue";
import FullTable from "@/components/FullTable.vue";
import {bills_labels, history_labels, rating_history_labels, rating_labels} from "@/helper/labels.js";
import {fake_bills, fake_histories, fake_ratings} from "@/helper/fake_data.js";
import {useRatingHistoryStore} from "@/stores/rating_history.js";
import HistoryItemTable from "@/components/rating/HistoryItemTable.vue";
const isLoading=ref(false)
const isOpenFilter=ref(false)
const ratingHistoryStore=useRatingHistoryStore()
const {histories,query,page,per_page,meta}=storeToRefs(ratingHistoryStore)
const isOpenRating=ref(false)
const current_name=ref(null)
const current_date=ref(null)

function openRatingTable(date,name){
  current_date.value=date
  current_name.value=name

  isOpenRating.value=true
}
function closeRatingTable(){
  isOpenRating.value=false
}

function changeCount(p){
  per_page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await ratingHistoryStore.getRatingsHistory()
    isLoading.value = false
  },300)
}

function changePage(p){
  page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await ratingHistoryStore.getRatingsHistory()
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
  await historyRequest()
}

async function filter() {
  await historyRequest()
  closeFilter()
}

async function clear() {
  query.value.filters={}
  await historyRequest()
  closeFilter()
}

async function historyRequest() {
  isLoading.value = true
  await ratingHistoryStore.getRatingsHistory()
  isLoading.value = false
}
onMounted(async () => {
  await historyRequest()
})
</script>