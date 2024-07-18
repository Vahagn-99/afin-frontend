<template>
  <div class="flex mb-4 justify-end items-center">
    <div class="flex items-center gap-4">
      <div class="text-[#2a7cef] hover:underline cursor-pointer" @click="clear" v-if="Object.keys(item_query.filters).length>0">Сбросить фильтр</div>
      <Button class="flex items-center gap-2 text-gray-400" @click="openFilter"><Lucide icon="Filter"/> Фильтры</Button>
    </div>
  </div>
  <FullTable :headers="bills_labels" :data="historyItem" :is-loading="isLoading" :query="item_query" @order="order">
    <template #header>
      <Table.Th v-for="(name, key) in bills_contact_labels" :key="key" class="whitespace-nowrap">
        <Order :name="name" @order="order" :index="names[key]" :isDesc="item_query.sorts[names[key]]==='desc'" :isAsc="item_query.sorts[names[key]]==='asc'"/>
      </Table.Th>
    </template>
    <template v-slot:body="slotProps">
      <Table.Td class="whitespace-nowrap">
        <a v-if="slotProps.item['contact']&&slotProps.item['contact']['url']" :href="slotProps.item['contact']['url']" class="text-[#2a7cef] hover:underline" target="_blank" >{{ slotProps.item['contact']['name'] }}</a>
        <p v-else class="text-gray-400" >
          отсутствует
        </p>
      </Table.Td>
      <Table.Td class="whitespace-nowrap">
        <p v-if="slotProps.item['contact']&&slotProps.item['contact']['manager']&&slotProps.item['contact']['manager']['name']">
          {{ slotProps.item['contact']['manager']['name']}}
        </p>
        <p v-else class="text-gray-400" >
          отсутствует
        </p>
      </Table.Td>
      <Table.Td class="whitespace-nowrap">
        <p v-if="slotProps.item['contact']&&slotProps.item['contact']['manager']&&slotProps.item['contact']['manager']['branch']">
          {{ slotProps.item['contact']['manager']['branch']}}
        </p>
        <p v-else class="text-gray-400" >
          отсутствует
        </p>
      </Table.Td>
      <Table.Td class="whitespace-nowrap">
        <p v-if="slotProps.item['contact']&&slotProps.item['contact']['analytic']&&slotProps.item['contact']['analytic']">
          {{ slotProps.item['contact']['analytic']}}
        </p>
        <p v-else class="text-gray-400" >
          отсутствует
        </p>
      </Table.Td>
    </template>
  </FullTable>
  <Pagination :page="item_page" :per_page="item_per_page" :meta="item_meta" @change-count="changeCount" @change-page="changePage"/>
  <HistoryItemFilter v-if="isOpenFilter" @close="closeFilter" @filter="filter" @clear="clear"/>
</template>
<script setup>
import {bills_contact_labels, bills_labels} from "@/helper/labels.js";
import Pagination from "@/components/Pagination.vue";
import HistoryItemFilter from "@/modals/filter/HistoryItemFilter.vue";
import FullTable from "@/components/FullTable.vue";
import Order from "@/simple-components/Order.vue";
import Table from "./../../base-components/Table";
import {storeToRefs} from "pinia";
import {useHistoryState} from "@/stores/history.js";
import {onMounted, ref} from "vue";
import router from "@/router/index.ts";
import {useRoute} from "vue-router";
import Lucide from "@/base-components/Lucide/index.ts";
import Button from "@/base-components/Button/index.ts";
import {names} from "@/helper/const.js";
const historyStore=useHistoryState()
const isLoading=ref(false)

const {historyItem,item_query,item_meta,item_page,item_per_page}=storeToRefs(historyStore)
const isOpenFilter=ref(false)

function openFilter(){
  isOpenFilter.value=true
}

function closeFilter(){
  isOpenFilter.value=false
}

async function filter() {
  await historyRequest()
  closeFilter()
}

async function clear() {
  item_query.value.filters={}
  await historyRequest()
  closeFilter()
}


async function order(name, direction) {
  if (query?.value?.sorts[name] && query.value.sorts[name] === direction) {
    delete query.value.sorts[name]
  } else {
    query.value.sorts[name] = direction
  }
  await historyRequest()
}


async function historyRequest() {
  isLoading.value = true
  await historyStore.getHistoryItem(id.value)
  isLoading.value = false
}

function changeCount(p){
  item_per_page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await historyStore.getHistoryItem(id.value)
    isLoading.value = false
  },300)
}

function changePage(p){
  item_page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await historyStore.getHistoryItem(id.value)
    isLoading.value =false
  })
}
const id=ref()
onMounted(()=>{
  const route = useRoute();
  id.value = route.params.id;
  historyRequest()
})
</script>