<template>
  <div class="flex mb-4 justify-end items-center">
    <div class="flex items-center gap-4">
      <div class="text-[#2a7cef] hover:underline cursor-pointer" @click="clear" v-if="Object.keys(query.filters).length>0">Сбросить фильтр</div>
      <Button class="flex items-center gap-2 text-gray-400" @click="openFilter"><Lucide icon="Filter"/> Фильтры</Button>
    </div>
  </div>
  <FullTable :headers="closed_bills_labels" :data="closed_bills" :is-loading="isLoading" :query="query" @order="order">
    <template #header>
      <Table.Th v-for="(name, key) in bills_contact_labels" :key="key" class="whitespace-nowrap">
        <Order :name="name" @order="order" :index="names[key]" :isDesc="query.sorts[names[key]]==='desc'" :isAsc="query.sorts[names[key]]==='asc'"/>
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
  <Pagination :page="page" :per_page="per_page" :meta="meta" @change-count="changeCount" @change-page="changePage"/>
  <HistoryClosedBillFilter v-if="isOpenFilter" @close-filter="closeFilter" @filter="filter" @clear="clear"/>
</template>
<script setup>

import {onMounted, ref} from "vue";
import Button from "./../../base-components/Button/index.ts";
import Lucide from "@/base-components/Lucide/index.ts";
import {storeToRefs} from "pinia";
import FullTable from "@/components/FullTable.vue";
import {bills_contact_labels, closed_bills_labels} from "@/helper/labels.js";
import Pagination from "@/components/Pagination.vue";
import ClosedBillFilter from "@/modals/filter/ClosedBillFilter.vue";
import Order from "@/simple-components/Order.vue";
import Table from "./../../base-components/Table";
import {useHistoryClosedBillStore} from "@/stores/history_closed_bill.js";
import {useRoute} from "vue-router";
import HistoryClosedBillFilter from "@/modals/filter/HistoryClosedBillFilter.vue";
import {names} from "@/helper/const.js";

const isLoading=ref(false)
const isOpenFilter=ref(false)
const closedBillStore=useHistoryClosedBillStore()
const {closed_bills,query,page,per_page,meta}=storeToRefs(closedBillStore)
const props=defineProps({
  id:Number
})
function changeCount(p){
  per_page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await closedBillStore.getClosedBills(id.value)
    isLoading.value = false
  },300)
}

function changePage(p){
  page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await closedBillStore.getClosedBills(id.value)
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
  await closedBillRequest()
}

async function filter() {
  await closedBillRequest()
  closeFilter()
}

async function clear() {
  query.value.filters={}
  await closedBillRequest()
  closeFilter()
}

async function closedBillRequest() {
  isLoading.value = true
  await closedBillStore.getClosedBills(id.value)
  isLoading.value = false
}
const id=ref()
onMounted(async () => {
  const route = useRoute();
  id.value = route.params.id;
  await closedBillRequest()
})
</script>