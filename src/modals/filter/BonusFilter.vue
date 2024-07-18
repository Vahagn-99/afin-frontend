<template>
  <FilterModal @close-filter="closeFilter" @filter="emit('filter')" @clear="emit('clear')">
  <template #default>
   <div class="mt-4">
     <FormLabel>Состояние бонуса до</FormLabel>
     <FormSelect class="min-h-[38px] mt-3 !box sm:mt-0" v-model="query.compares">
       <option value=""></option>
       <option v-for="(date,key) in historyList" :value='[{"field":"date",
        "operator":"<=",
        "value":date.from}]' :key="key">{{transformReportTitle(date.name)}}</option>
     </FormSelect>
   </div>
    <div class="mt-4">
      <FormLabel>Менеджер</FormLabel>
      <FormSelect class="min-h-[38px] mt-3 !box sm:mt-0" v-model="query.filters.manager_name">
        <option value=""></option>
        <option :value="manager" v-for="manager in managers">{{manager}}</option>
      </FormSelect>
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
import {onMounted} from "vue";
import {useContactStore} from "@/stores/contacts.js";
import {useBonusStore} from "@/stores/bonus.js";
import {useHistoryState} from "@/stores/history.js";
const emit=defineEmits(['close-filter','filter','clear'])
const bonusStore=useBonusStore()
const {query}=storeToRefs(bonusStore)
function closeFilter(){
  emit('close-filter')
}

const contactStore=useContactStore()
const {managers,branches}=storeToRefs(contactStore)
const historyStore=useHistoryState()
const {historyList}=storeToRefs(historyStore)

function transformReportTitle(title) {
  // Define the pattern to match "Отчет за "
  const prefix = "Отчет за ";
  // Define the replacement prefix
  const replacement = "До ";

  // Check if the title starts with the prefix
  if (title.startsWith(prefix)) {
    // Replace the prefix with the replacement and return the result
    return replacement + title.substring(prefix.length);
  }

  // If the title does not start with the expected prefix, return the original title
  return title;
}

onMounted(async () => {
  await contactStore.getContacts()
  await contactStore.getManagers()
  await historyStore.getHistoryList()
})
</script>