<template>
  <div class="flex mb-4 justify-end items-center">
    <div class="flex items-center gap-4">
      <div class="text-[#2a7cef] hover:underline cursor-pointer" @click="clear" v-if="Object.keys(query.filters).length>0">Сбросить фильтр</div>
      <Button class="flex items-center gap-2 text-gray-400" @click="openFilter"><Lucide icon="Filter"/> Фильтры</Button>
    </div>
  </div>
  <div class="border rounded-lg w-full">
    <Preview class="intro-y box">
      <Preview.Panel>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th v-for="(name, key) in bonus_labels" :key="key" class="whitespace-nowrap">
                <!--                <Order v-if="withOrder" :name="name" @order="order" :index="key" :isDesc="query.sorts[key]==='desc'" :isAsc="query.sorts[key]==='asc'"/>-->
                <!--                <template v-else>-->
                {{name}}
                <!--                </template>/-->
              </Table.Th>
              <slot name="header"></slot>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody class="relative">
            <Table.Tr v-if="bonuses.length === 0">
              <Table.Td colspan="11" class="text-center h-[200px]">Нет данных</Table.Td>
            </Table.Tr>
            <template v-for="(item, i) in bonuses" :key="i">
              <BonusTableItem :item="bonuses[i]"/>
            </template>
          </Table.Tbody>
        </Table>
        <div v-if="isLoading"
             class="absolute h-full flex justify-center  w-full top-0 min-h-[320px] left-0 bg-[#f5f5f5] z-50">
          <div>
            <LoadingIcon icon="bars" class="!w-10 !h-10 block  mt-[120px]" color="#213343"/>
          </div>
        </div>
      </Preview.Panel>
    </Preview>
  </div>
  <BonusFilter v-if="isOpenFilter" @close-filter="closeFilter" @filter="filter" @clear="clear"/>
</template>
<script setup>
import Preview from "@/base-components/Preview/index.ts";
import LoadingIcon from "@/base-components/LoadingIcon/index.ts";
import Table from "@/base-components/Table/index.ts";
import {bonus_labels} from "@/helper/labels.js";
import {onMounted, ref} from "vue";
import Lucide from "@/base-components/Lucide/index.ts";
import BonusTableItem from "@/components/bonus/BonusTableItem.vue";
import {useBonusStore} from "@/stores/bonus.js";
import {storeToRefs} from "pinia";
import Button from "@/base-components/Button/index.ts";
import BonusFilter from "@/modals/filter/BonusFilter.vue";
const isLoading=ref(false)

const bonusStore=useBonusStore()
const {bonuses,query}=storeToRefs(bonusStore)

const isOpenFilter=ref(false)

function openFilter(){
  isOpenFilter.value=true
}

function closeFilter(){
  isOpenFilter.value=false
}

async function filter() {
  isLoading.value=true
  closeFilter()
  await bonusStore.getBonuses()
  isLoading.value=false

}

async function clear() {
  isLoading.value = true
  closeFilter()
  query.value.filters={}
  await bonusStore.getBonuses()
  isLoading.value = false
}

onMounted(async () => {
  isLoading.value=true
  await bonusStore.getBonuses()
  isLoading.value=false
})
</script>