<template>
  <div class="border rounded-lg w-full">
    <Preview class="intro-y box">
      <Preview.Panel>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th v-for="(name, key) in headers" :key="key" class="whitespace-nowrap">
                <Order v-if="withOrder" :name="name" @order="order" :index="key" :isDesc="query.sorts[key]==='desc'" :isAsc="query.sorts[key]==='asc'"/>
                <template v-else>
                  {{name}}
                </template>
              </Table.Th>
              <slot name="header"></slot>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody class="relative">
            <Table.Tr v-if="data.length === 0">
              <Table.Td colspan="14" class="text-center h-[200px]">Нет данных</Table.Td>
            </Table.Tr>
            <Table.Tr v-for="(item, index) in data" :key="index">
              <Table.Td v-for="key in Object.keys(headers)" class="whitespace-nowrap" :key="key">
                <div v-if="key==='avatar'" class="w-[60px] h-[60px] rounded-full overflow-hidden">
                  <img :src="item[key]" :alt="key"/>
                </div>
                <div v-if="key==='placeInRanking'">
                  {{index+1}}
                </div>
                <template v-else>
                  {{ item[key] }}
                </template>
              </Table.Td>
              <slot name="body" :id="item.id" :item_name="item.name" :item="item"></slot>
            </Table.Tr>
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
</template>
<script setup >
import Table from "@/base-components/Table";
import Preview from "@/base-components/Preview";
import Order from "@/simple-components/Order.vue";
import LoadingIcon from "@/base-components/LoadingIcon";
import {getMonthText} from "@/helper/function.js";

const props=defineProps({
  headers:Object,
  data:Array,
  query:Object,
  isLoading:Boolean,
  withOrder:{
    type:Boolean,
    default:true
  }
})

const emit=defineEmits(['order'])

function order(name, direction){
  emit('order',name, direction)
}

</script>