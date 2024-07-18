<template>
  <div class="flex mb-4 justify-between items-center">
    <Button class="flex items-center gap-2 text-red-500" @click="openMonthModal"><Lucide icon="X"/> Закрыть месяц</Button>
    <div class="flex items-center gap-4">
      <div class="text-[#2a7cef] hover:underline cursor-pointer" @click="clear" v-if="Object.keys(query.filters).length>0">Сбросить фильтр</div>
      <Button class="flex items-center gap-2 text-blue-500" @click="openImport"><Lucide icon="Import"/> Загрузить файл</Button>
      <Button class="flex items-center gap-2 text-gray-400" @click="openFilter"><Lucide icon="Filter"/> Фильтры</Button>
    </div>
  </div>
  <FullTable :headers="bills_labels" :data="bills" :is-loading="isLoading" :query="query" @order="order">
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
  <BillFilter v-if="isOpenFilter" @close-filter="closeFilter" @filter="filter" @clear="clear"/>
  <BillImport v-if="isOpenImport" @close="closeImport"/>
  <CloseMonthModal v-if="isOpenCloseMonthModal" @close-modal="closeMonthModal" />
</template>
<script setup>
import {onMounted, ref} from "vue";
import Button from "./../../base-components/Button/index.ts";
import Lucide from "@/base-components/Lucide/index.ts";
import BillFilter from "@/modals/filter/BillFilter.vue";
import BillImport from "@/modals/import/BillImport.vue";
import CloseMonthModal from "@/modals/CloseMonthModal.vue";
import {useBillStore} from "@/stores/bill.js";
import {storeToRefs} from "pinia";
import FullTable from "@/components/FullTable.vue";
import {bills_contact_labels, bills_labels} from "@/helper/labels.js";
import Pagination from "@/components/Pagination.vue";
import Table from "./../../base-components/Table";
import Order from "@/simple-components/Order.vue";
import {names} from "@/helper/const.js";

const isLoading=ref(false)
const isOpenFilter=ref(false)
const isOpenImport=ref(false)
const billStore=useBillStore()
const {bills,query,page,per_page,meta}=storeToRefs(billStore)

const isOpenCloseMonthModal=ref(false)

function openMonthModal(){
  isOpenCloseMonthModal.value=true
}

function closeMonthModal(){
  isOpenCloseMonthModal.value=false
  billRequest()
}
function changeCount(p){
  per_page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await billStore.getBills()
    isLoading.value = false
  },300)
}

function changePage(p){
  page.value=p
  isLoading.value = true
  setTimeout(async () => {
    await billStore.getBills()
    isLoading.value =false
  })
}

function openImport(){
  isOpenImport.value=true
}

function closeImport(){
  isOpenImport.value=false
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
  await billRequest()
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

async function billRequest() {
  isLoading.value = true
  await billStore.getBills()
  isLoading.value = false
}

onMounted(async () => {
  await billRequest()
})
</script>