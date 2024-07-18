<template>
  <FilterModal @close-filter="closeFilter" @filter="emit('filter')" @clear="emit('clear')">
  <template #default>
    <div>
      <FormLabel>Поиск по Login</FormLabel>
      <FormInput v-model="item_query.filters.login"/>
    </div>
    <div class="mt-4">
      <FormLabel>Отдел</FormLabel>
      <FormSelect class="min-h-[38px] mt-3 !box sm:mt-0" v-model="item_query.filters.manager_branch">
        <option value=""></option>
        <option :value="branch" v-for="branch in branches">{{branch}}</option>
      </FormSelect>
    </div>
    <div class="mt-4">
      <FormLabel>Постоянный менеджер</FormLabel>
      <FormSelect class="min-h-[38px] mt-3 !box sm:mt-0" v-model="item_query.filters.manager_name">
        <option value=""></option>
        <option :value="manager" v-for="manager in managers">{{manager}}</option>
      </FormSelect>
    </div>
    <div class="mt-4">
      <FormLabel>Аналитик</FormLabel>
      <FormSelect class="min-h-[38px] mt-3 !box sm:mt-0" v-model="item_query.filters.analytic">
        <option value=""></option>
        <option :value="analytic" v-for="analytic in analytics">{{analytic}}</option>
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
import {useHistoryState} from "@/stores/history.js";
import {useContactStore} from "@/stores/contacts.js";
import {onMounted} from "vue";
const emit=defineEmits(['close-filter','filter','clear'])
const historyStore=useHistoryState()
const {item_query}=storeToRefs(historyStore)
function closeFilter(){
  emit('close-filter')
}

const contactStore=useContactStore()
const {managers,branches,analytics}=storeToRefs(contactStore)
onMounted(async () => {
  await contactStore.getContacts()
  await contactStore.getManagers()
})

</script>