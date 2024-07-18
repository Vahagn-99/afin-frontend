<template>
  <FilterModal @close-filter="closeFilter" @filter="emit('filter')" @clear="emit('clear')">
  <template #default>
    <div>
      <FormLabel>Дата создание отчета</FormLabel>
      <FormInput type="date"  v-model="query.filters.date"/>
    </div>
  </template>
  </FilterModal>
</template>
<script setup>

import FilterModal from "@/slots/FilterModal.vue";
import {FormSelect} from "@/base-components/Form/index.ts";
import {FormLabel} from "@/base-components/Form/index.ts";
import {FormInput} from "@/base-components/Form/index.ts";
import {useBillStore} from "@/stores/bill.js";
import {storeToRefs} from "pinia";
const emit=defineEmits(['close-filter','filter','clear'])
const billStore=useBillStore()
const {query}=storeToRefs(billStore)
function closeFilter(){
  emit('close-filter')
}
</script>