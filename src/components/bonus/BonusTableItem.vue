<template>
  <Table.Tr>
    <template v-for="key in Object.keys(bonus_labels)" :key="key">
      <Table.Td v-if="key==='lk'" class="whitespace-nowrap font-bold">
        <div class="flex items-center gap-2 cursor-pointer" @click="toggle">
            <Lucide :icon="!isOpen?'PlusCircle':'MinusCircle'"/>
          {{ item['name']}}
        </div>
      </Table.Td>
      <Table.Td v-else class="whitespace-nowrap">
        {{ item[key]}}
      </Table.Td>
    </template>
  </Table.Tr>
  <template v-if="isOpen">
    <Table.Tr v-for="subItem in item.items" :key="subItem.lk">
      <template v-for="key in Object.keys(bonus_labels)" :key="key">
        <Table.Td class="whitespace-nowrap" :class="{'pl-12':key==='lk'}">
          {{ subItem[key] }}
        </Table.Td>
      </template>
    </Table.Tr>
  </template>
</template>
<script setup>
import {bonus_labels} from "@/helper/labels.js";
import Lucide from "@/base-components/Lucide/index.ts";
import Table from "@/base-components/Table/index.ts";
import {ref} from "vue";
const props=defineProps({
  item:Object
})

const isOpen=ref(true)

function toggle(){
  isOpen.value=!isOpen.value
}
</script>