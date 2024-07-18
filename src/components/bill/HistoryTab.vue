<template>
<!--    <div class="flex mb-4 justify-end items-center">-->
<!--      <div class="flex items-center gap-4">-->
<!--        <Button class="flex items-center gap-2 text-gray-400" @click="openFilter"><Lucide icon="Filter"/> Фильтры</Button>-->
<!--      </div>-->
<!--    </div>-->
    <FullTable :headers="history_labels" :data="historyList" :is-loading="isLoading" :query="query" @order="order">
      <template #header>
        <Table.Th class="w-1/5"></Table.Th>
      </template>
      <template v-slot:body="slotProps">
        <Table.Td class="text-[#2a7cef]"><div @click="openBillTable(slotProps.id,slotProps.item_name)" class="flex items-center justify-end cursor-pointer hover:underline gap-2">
          Открыть счет <Lucide icon="ExternalLink" class="w-4 h-4"/>
        </div ></Table.Td>
      </template>
    </FullTable>
  <Pagination :page="page" :per_page="per_page" :meta="meta" @change-count="changeCount" @change-page="changePage"/>
<!--      <HistoryFilter v-if="isOpenFilter" @close-filter="closeFilter" @filter="filter" @clear="clear"/>-->
</template>
<script setup>
import Table from "./../../base-components/Table";
import {onMounted, ref} from "vue";
import Pagination from "./../Pagination.vue";
import Lucide from "@/base-components/Lucide/index.ts";
import {storeToRefs} from "pinia";
import HistoryFilter from "@/modals/filter/HistoryFilter.vue";
import FullTable from "@/components/FullTable.vue";
import {history_labels} from "@/helper/labels.js";
import {useHistoryState} from "@/stores/history.js";
import {linkTo} from "@/helper/function.js";
const isLoading=ref(false)
const isOpenFilter=ref(false)
const historyStore=useHistoryState()
const {historyList,query,page,per_page,meta,name}=storeToRefs(historyStore)
async function openBillTable(id) {
  linkTo('historyItem',id)
}

function changeCount(p){
  per_page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await historyStore.getHistoryList()
    isLoading.value = false
  },300)
}

function changePage(p){
  page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await historyStore.getHistoryList()
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
  await historyStore.getHistoryList()
  isLoading.value = false
}

onMounted(async () => {
  await historyRequest()
})
</script>